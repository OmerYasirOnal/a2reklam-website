<?php
/**
 * Quote Form API Endpoint
 *
 * Handles quote/teklif form submissions via HTML form POST
 * Redirects to success or error page
 *
 * @package A2Reklam\API
 */

declare(strict_types=1);

// Disable error display to client
ini_set('display_errors', '0');
error_reporting(E_ALL);

// Include dependencies
require_once __DIR__ . '/_lib/MailerFactory.php';

// Constants
define('CONFIG_PATH', __DIR__ . '/../../smtp_config.php');
define('RATE_LIMIT_FILE', __DIR__ . '/_data/quote_rate_limit.json');
define('LOG_FILE', __DIR__ . '/quote_error.log');
define('SUCCESS_URL', '/teklif-al/?success=1');
define('ERROR_URL', '/teklif-al/?error=send');

// Initialize logger
$logger = new SimpleLogger(LOG_FILE);

/**
 * Redirect to URL and exit
 *
 * @param string $url
 * @return void
 */
function redirectAndExit(string $url): void
{
    header('Location: ' . $url, true, 303);
    exit;
}

/**
 * Get client IP address
 *
 * @return string
 */
function getClientIp(): string
{
    $headers = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'];

    foreach ($headers as $header) {
        if (!empty($_SERVER[$header])) {
            $ip = $_SERVER[$header];
            if (strpos($ip, ',') !== false) {
                $ip = trim(explode(',', $ip)[0]);
            }
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }

    return '0.0.0.0';
}

// =============================================================================
// Request Validation
// =============================================================================

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirectAndExit(ERROR_URL);
}

// =============================================================================
// Load Configuration
// =============================================================================

if (!file_exists(CONFIG_PATH)) {
    $logger->error('Configuration file not found', ['path' => CONFIG_PATH]);
    redirectAndExit(ERROR_URL);
}

$factory = MailerFactory::fromConfigFile(CONFIG_PATH);
if ($factory === null) {
    $logger->error('Failed to load configuration');
    redirectAndExit(ERROR_URL);
}

if (!$factory->validateConfig()) {
    $logger->error('Invalid configuration', ['error' => $factory->getLastError()]);
    redirectAndExit(ERROR_URL);
}

// =============================================================================
// Rate Limiting
// =============================================================================

$rateLimitSettings = $factory->getRateLimitSettings();
$rateLimiter = new RateLimiter(
    RATE_LIMIT_FILE,
    $rateLimitSettings['max_requests'],
    $rateLimitSettings['window']
);

$clientIp = getClientIp();

if (!$rateLimiter->checkAndRecord($clientIp)) {
    $logger->info('Rate limit exceeded', ['ip' => $clientIp]);
    redirectAndExit('/teklif-al/?error=rate_limit');
}

// =============================================================================
// Parse and Validate Input
// =============================================================================

// Honeypot check
if (isset($_POST['website']) && InputSanitizer::isHoneypotFilled($_POST['website'])) {
    $logger->info('Honeypot triggered', ['ip' => $clientIp]);
    // Pretend success to not reveal detection
    redirectAndExit(SUCCESS_URL);
}

// Sanitize inputs - support multiple field naming conventions
$fullName = InputSanitizer::sanitizeString($_POST['fullName'] ?? $_POST['name'] ?? $_POST['ad_soyad'] ?? '');
$email = InputSanitizer::sanitizeEmail($_POST['email'] ?? $_POST['eposta'] ?? '');
$phone = InputSanitizer::sanitizePhone($_POST['phone'] ?? $_POST['telefon'] ?? '');
$company = InputSanitizer::sanitizeString($_POST['company'] ?? $_POST['firma'] ?? '');
$serviceType = InputSanitizer::sanitizeString($_POST['serviceType'] ?? $_POST['service'] ?? $_POST['hizmet'] ?? '');
$projectDetails = InputSanitizer::sanitizeString($_POST['projectDetails'] ?? $_POST['message'] ?? $_POST['mesaj'] ?? $_POST['detaylar'] ?? '');
$budget = InputSanitizer::sanitizeString($_POST['budget'] ?? $_POST['butce'] ?? '');
$deadline = InputSanitizer::sanitizeString($_POST['deadline'] ?? $_POST['sure'] ?? '');

// Validation
$isValid = true;
$validationErrors = [];

if (empty($fullName) || mb_strlen($fullName) < 2) {
    $isValid = false;
    $validationErrors[] = 'name';
}

if ($email === null) {
    $isValid = false;
    $validationErrors[] = 'email';
}

if (empty($phone) || strlen(preg_replace('/[^0-9]/', '', $phone)) < 10) {
    $isValid = false;
    $validationErrors[] = 'phone';
}

// Service type and project details - at least one should be provided
if (empty($serviceType) && empty($projectDetails)) {
    $isValid = false;
    $validationErrors[] = 'details';
}

if (!$isValid) {
    $logger->info('Validation failed', [
        'ip' => $clientIp,
        'errors' => $validationErrors,
    ]);
    redirectAndExit('/teklif-al/?error=validation');
}

// =============================================================================
// Build and Send Email
// =============================================================================

$mail = $factory->create($email, $fullName);

if ($mail === null) {
    $logger->error('Failed to create mailer', ['error' => $factory->getLastError()]);
    redirectAndExit(ERROR_URL);
}

try {
    // Subject
    $subjectPrefix = !empty($company) ? $company : $fullName;
    $mail->Subject = 'Teklif Talebi: ' . mb_substr($subjectPrefix, 0, 50);

    // Build HTML body
    $htmlRows = '';

    // Required fields
    $htmlRows .= '
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Ad Soyad:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">' . InputSanitizer::escapeHtml($fullName) . '</td>
        </tr>
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">E-posta:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="mailto:' . InputSanitizer::escapeHtml($email) . '">' . InputSanitizer::escapeHtml($email) . '</a>
            </td>
        </tr>
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Telefon:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="tel:' . InputSanitizer::escapeHtml($phone) . '">' . InputSanitizer::escapeHtml($phone) . '</a>
            </td>
        </tr>';

    // Optional fields
    if (!empty($company)) {
        $htmlRows .= '
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Firma:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">' . InputSanitizer::escapeHtml($company) . '</td>
        </tr>';
    }

    if (!empty($serviceType)) {
        $htmlRows .= '
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Hizmet Türü:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">' . InputSanitizer::escapeHtml($serviceType) . '</td>
        </tr>';
    }

    if (!empty($budget)) {
        $htmlRows .= '
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Bütçe:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">' . InputSanitizer::escapeHtml($budget) . '</td>
        </tr>';
    }

    if (!empty($deadline)) {
        $htmlRows .= '
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Süre/Teslim:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">' . InputSanitizer::escapeHtml($deadline) . '</td>
        </tr>';
    }

    if (!empty($projectDetails)) {
        $htmlRows .= '
        <tr>
            <td style="padding: 10px; font-weight: bold; vertical-align: top;">Proje Detayları:</td>
            <td style="padding: 10px;">' . nl2br(InputSanitizer::escapeHtml($projectDetails)) . '</td>
        </tr>';
    }

    $htmlBody = '
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <title>Teklif Talebi</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #B8860B; border-bottom: 2px solid #B8860B; padding-bottom: 10px;">
                Yeni Teklif Talebi
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
                ' . $htmlRows . '
            </table>
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #888;">
                Bu mesaj a2reklam.com teklif formundan gönderilmiştir.<br>
                IP: ' . InputSanitizer::escapeHtml($clientIp) . '<br>
                Tarih: ' . date('d.m.Y H:i:s') . '
            </p>
        </div>
    </body>
    </html>';

    $mail->Body = $htmlBody;

    // Plain text alternative
    $plainText = "Yeni Teklif Talebi\n" .
        "==================\n\n" .
        "Ad Soyad: {$fullName}\n" .
        "E-posta: {$email}\n" .
        "Telefon: {$phone}\n";

    if (!empty($company)) {
        $plainText .= "Firma: {$company}\n";
    }
    if (!empty($serviceType)) {
        $plainText .= "Hizmet Türü: {$serviceType}\n";
    }
    if (!empty($budget)) {
        $plainText .= "Bütçe: {$budget}\n";
    }
    if (!empty($deadline)) {
        $plainText .= "Süre/Teslim: {$deadline}\n";
    }
    if (!empty($projectDetails)) {
        $plainText .= "\nProje Detayları:\n{$projectDetails}\n";
    }

    $plainText .= "\n---\n" .
        "IP: {$clientIp}\n" .
        "Tarih: " . date('d.m.Y H:i:s');

    $mail->AltBody = $plainText;

    $mail->send();

    $logger->info('Quote email sent successfully', [
        'from' => $email,
        'name' => $fullName,
        'company' => $company,
        'service' => $serviceType,
    ]);

    redirectAndExit(SUCCESS_URL);

} catch (\PHPMailer\PHPMailer\Exception $e) {
    $logger->error('PHPMailer Exception', [
        'message' => $e->getMessage(),
        'error_info' => $mail->ErrorInfo,
        'from' => $email,
    ]);
    redirectAndExit(ERROR_URL);

} catch (\Exception $e) {
    $logger->error('General Exception', [
        'message' => $e->getMessage(),
        'from' => $email,
    ]);
    redirectAndExit(ERROR_URL);
}
