<?php
/**
 * A2 Reklam - Contact Form Endpoint
 *
 * This PHP script handles contact form submissions from the static Astro site.
 * It validates input, performs anti-spam checks, and sends email to info@a2reklam.com.
 *
 * Security Features:
 * - Same-origin CORS policy
 * - Honeypot field for spam prevention
 * - Simple rate limiting by IP
 * - Input validation and sanitization
 * - Header validation (Referer check)
 *
 * DEPLOYMENT NOTE:
 * This file is served from the public/ directory and will be deployed to /api/contact.php
 */

// Error reporting (disable in production for security)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);
error_reporting(0);
ini_set('display_errors', 0);

// Configuration
define('RECIPIENT_EMAIL', 'info@a2reklam.com');
define('RATE_LIMIT_FILE', __DIR__ . '/.rate_limit.json');
define('RATE_LIMIT_REQUESTS', 5); // Max requests per IP
define('RATE_LIMIT_WINDOW', 3600); // Time window in seconds (1 hour)

// Set JSON response header
header('Content-Type: application/json; charset=utf-8');

// CORS: Only allow same-origin requests
$allowedOrigins = [
    'https://a2reklam.com',
    'https://www.a2reklam.com',
    'http://localhost:4321', // Dev server
    'http://localhost:3000',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Credentials: true');
}

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Referer check (basic anti-CSRF)
$referer = $_SERVER['HTTP_REFERER'] ?? '';
if (!empty($referer)) {
    $refererHost = parse_url($referer, PHP_URL_HOST);
    $allowedHosts = ['a2reklam.com', 'www.a2reklam.com', 'localhost'];
    if (!in_array($refererHost, $allowedHosts, true)) {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Invalid referer']);
        exit;
    }
}

// Rate limiting by IP
function checkRateLimit($ip) {
    if (!file_exists(RATE_LIMIT_FILE)) {
        file_put_contents(RATE_LIMIT_FILE, json_encode([]));
    }

    $data = json_decode(file_get_contents(RATE_LIMIT_FILE), true) ?: [];
    $now = time();

    // Clean old entries
    foreach ($data as $storedIp => $timestamps) {
        $data[$storedIp] = array_filter($timestamps, function($ts) use ($now) {
            return ($now - $ts) < RATE_LIMIT_WINDOW;
        });
        if (empty($data[$storedIp])) {
            unset($data[$storedIp]);
        }
    }

    // Check current IP
    $ipData = $data[$ip] ?? [];
    if (count($ipData) >= RATE_LIMIT_REQUESTS) {
        return false;
    }

    // Add current request
    $ipData[] = $now;
    $data[$ip] = $ipData;
    file_put_contents(RATE_LIMIT_FILE, json_encode($data));

    return true;
}

$clientIp = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if (!checkRateLimit($clientIp)) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Too many requests. Please try again later.']);
    exit;
}

// Get JSON body
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
    exit;
}

// Honeypot check (if present, it's a bot)
if (!empty($data['website'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Spam detected']);
    exit;
}

// Validate required fields
$requiredFields = ['fullName', 'email', 'phone', 'serviceType'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => "Missing required field: $field"]);
        exit;
    }
}

// Sanitize inputs
$fullName = htmlspecialchars(trim($data['fullName']), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($data['email']), FILTER_VALIDATE_EMAIL);
$phone = htmlspecialchars(trim($data['phone']), ENT_QUOTES, 'UTF-8');
$serviceType = htmlspecialchars(trim($data['serviceType']), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($data['message'] ?? ''), ENT_QUOTES, 'UTF-8');

// Validate email
if (!$email) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid email address']);
    exit;
}

// Validate name (at least 3 characters)
if (strlen($fullName) < 3) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Name too short']);
    exit;
}

// Validate phone (basic check)
if (strlen($phone) < 10) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid phone number']);
    exit;
}

// Build email content
$emailSubject = "[A2 Reklam] Yeni İletişim Formu - $serviceType";
$emailBody = "
Yeni İletişim Formu Mesajı

Ad Soyad: $fullName
E-posta: $email
Telefon: $phone
Hizmet Türü: $serviceType

Mesaj:
$message

---
IP: $clientIp
Zaman: " . date('Y-m-d H:i:s') . "
";

// Email headers
$headers = [
    'From: noreply@a2reklam.com',
    "Reply-To: $email",
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8',
];

// Send email using PHP mail() function
// Note: This works on most cPanel hosts. For SMTP, use PHPMailer (see documentation).
$mailSent = mail(RECIPIENT_EMAIL, $emailSubject, $emailBody, implode("\r\n", $headers));

if ($mailSent) {
    http_response_code(200);
    echo json_encode(['ok' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed to send email. Please try again later.']);
}
