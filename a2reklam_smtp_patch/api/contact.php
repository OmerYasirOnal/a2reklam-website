<?php
/**
 * Contact Form API Endpoint
 *
 * Handles contact form submissions via JSON or form-urlencoded/multipart
 * Returns JSON response with proper CORS headers
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
define('RATE_LIMIT_FILE', __DIR__ . '/_data/contact_rate_limit.json');
define('LOG_FILE', __DIR__ . '/contact_error.log');

// Initialize logger
$logger = new SimpleLogger(LOG_FILE);

/**
 * Send JSON response and exit
 *
 * @param bool $ok Success status
 * @param string $message Success message or error
 * @param int $httpCode HTTP status code
 * @return void
 */
function sendJsonResponse(bool $ok, string $message, int $httpCode = 200): void
{
    http_response_code($httpCode);
    header('Content-Type: application/json; charset=utf-8');

    if ($ok) {
        echo json_encode(['ok' => true, 'message' => $message], JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(['ok' => false, 'error' => $message], JSON_UNESCAPED_UNICODE);
    }
    exit;
}

/**
 * Get client IP address
 *
 * @return string
 */
function getClientIp(): string
{
    // Check for proxied IP (common on shared hosting)
    $headers = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'];

    foreach ($headers as $header) {
        if (!empty($_SERVER[$header])) {
            $ip = $_SERVER[$header];
            // Handle comma-separated list (X-Forwarded-For)
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

/**
 * Parse request body based on content type
 *
 * @return array
 */
function parseRequestBody(): array
{
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

    // JSON
    if (stripos($contentType, 'application/json') !== false) {
        $rawBody = file_get_contents('php://input');
        $data = json_decode($rawBody, true);
        return is_array($data) ? $data : [];
    }

    // Form-urlencoded or multipart
    if (stripos($contentType, 'application/x-www-form-urlencoded') !== false ||
        stripos($contentType, 'multipart/form-data') !== false) {
        return $_POST;
    }

    // Fallback: try JSON first, then POST
    $rawBody = file_get_contents('php://input');
    $data = json_decode($rawBody, true);
    if (is_array($data) && !empty($data)) {
        return $data;
    }

    return $_POST;
}

// =============================================================================
// CORS Headers
// =============================================================================

// Allow same-origin requests
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = [
    'https://a2reklam.com',
    'https://www.a2reklam.com',
    'http://localhost:4321',  // Astro dev server
    'http://localhost:3000',
];

if (in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    // Allow same-origin (no CORS header needed for same-origin)
    // For strict same-origin only, we don't set the header
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Access-Control-Max-Age: 86400');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, 'Method not allowed', 405);
}

// =============================================================================
// Load Configuration
// =============================================================================

if (!file_exists(CONFIG_PATH)) {
    $logger->error('Configuration file not found', ['path' => CONFIG_PATH]);
    sendJsonResponse(false, 'Server configuration error', 500);
}

$factory = MailerFactory::fromConfigFile(CONFIG_PATH);
if ($factory === null) {
    $logger->error('Failed to load configuration');
    sendJsonResponse(false, 'Server configuration error', 500);
}

if (!$factory->validateConfig()) {
    $logger->error('Invalid configuration', ['error' => $factory->getLastError()]);
    sendJsonResponse(false, 'Server configuration error', 500);
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
    sendJsonResponse(false, 'Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.', 429);
}

// =============================================================================
// Parse and Validate Input
// =============================================================================

$input = parseRequestBody();

// Honeypot check (hidden field that should be empty)
if (isset($input['website']) && InputSanitizer::isHoneypotFilled($input['website'])) {
    $logger->info('Honeypot triggered', ['ip' => $clientIp]);
    // Return success to not reveal detection
    sendJsonResponse(true, 'Mesajınız alındı. En kısa sürede size dönüş yapacağız.');
}

// Sanitize inputs
$fullName = InputSanitizer::sanitizeString($input['fullName'] ?? $input['name'] ?? '');
$email = InputSanitizer::sanitizeEmail($input['email'] ?? '');
$phone = InputSanitizer::sanitizePhone($input['phone'] ?? '');
$serviceType = InputSanitizer::sanitizeString($input['serviceType'] ?? $input['service'] ?? '');
$message = InputSanitizer::sanitizeString($input['message'] ?? '');

// Validation
$errors = [];

if (empty($fullName) || mb_strlen($fullName) < 2) {
    $errors[] = 'Geçerli bir isim giriniz';
}

if ($email === null) {
    $errors[] = 'Geçerli bir e-posta adresi giriniz';
}

if (empty($phone) || strlen(preg_replace('/[^0-9]/', '', $phone)) < 10) {
    $errors[] = 'Geçerli bir telefon numarası giriniz';
}

if (empty($serviceType)) {
    $errors[] = 'Hizmet türü seçiniz';
}

if (empty($message) || mb_strlen($message) < 10) {
    $errors[] = 'Mesajınız en az 10 karakter olmalıdır';
}

if (!empty($errors)) {
    sendJsonResponse(false, implode(', ', $errors), 400);
}

// =============================================================================
// Build and Send Email
// =============================================================================

$mail = $factory->create($email, $fullName);

if ($mail === null) {
    $logger->error('Failed to create mailer', ['error' => $factory->getLastError()]);
    sendJsonResponse(false, 'Mail sunucusu hatası', 500);
}

try {
    // Subject
    $mail->Subject = 'İletişim Formu: ' . mb_substr($fullName, 0, 50);

    // HTML body
    $htmlBody = '
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <title>İletişim Formu</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #B8860B; border-bottom: 2px solid #B8860B; padding-bottom: 10px;">
                Yeni İletişim Formu Mesajı
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
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
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Hizmet Türü:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">' . InputSanitizer::escapeHtml($serviceType) . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold; vertical-align: top;">Mesaj:</td>
                    <td style="padding: 10px;">' . nl2br(InputSanitizer::escapeHtml($message)) . '</td>
                </tr>
            </table>
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #888;">
                Bu mesaj a2reklam.com iletişim formundan gönderilmiştir.<br>
                IP: ' . InputSanitizer::escapeHtml($clientIp) . '<br>
                Tarih: ' . date('d.m.Y H:i:s') . '
            </p>
        </div>
    </body>
    </html>';

    $mail->Body = $htmlBody;

    // Plain text alternative
    $mail->AltBody = "Yeni İletişim Formu Mesajı\n" .
        "==========================\n\n" .
        "Ad Soyad: {$fullName}\n" .
        "E-posta: {$email}\n" .
        "Telefon: {$phone}\n" .
        "Hizmet Türü: {$serviceType}\n" .
        "Mesaj:\n{$message}\n\n" .
        "---\n" .
        "IP: {$clientIp}\n" .
        "Tarih: " . date('d.m.Y H:i:s');

    $mail->send();

    $logger->info('Email sent successfully', [
        'from' => $email,
        'name' => $fullName,
        'service' => $serviceType,
    ]);

    sendJsonResponse(true, 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.');

} catch (\PHPMailer\PHPMailer\Exception $e) {
    $logger->error('PHPMailer Exception', [
        'message' => $e->getMessage(),
        'error_info' => $mail->ErrorInfo,
        'from' => $email,
    ]);
    sendJsonResponse(false, 'Mail gönderilemedi. Lütfen daha sonra tekrar deneyin.', 500);

} catch (\Exception $e) {
    $logger->error('General Exception', [
        'message' => $e->getMessage(),
        'from' => $email,
    ]);
    sendJsonResponse(false, 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.', 500);
}
