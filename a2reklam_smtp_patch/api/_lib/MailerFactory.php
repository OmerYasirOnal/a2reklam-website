<?php
/**
 * MailerFactory - Creates configured PHPMailer instances
 *
 * @package A2Reklam\Mail
 */

declare(strict_types=1);

// Include PHPMailer (no Composer autoload)
require_once __DIR__ . '/../vendor/PHPMailer/src/Exception.php';
require_once __DIR__ . '/../vendor/PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/../vendor/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/**
 * Factory class for creating configured PHPMailer instances
 */
class MailerFactory
{
    /** @var array Configuration array */
    private $config;

    /** @var string|null Last error message */
    private $lastError = null;

    /**
     * Constructor
     *
     * @param array $config SMTP configuration array
     */
    public function __construct(array $config)
    {
        $this->config = $config;
    }

    /**
     * Load configuration from file
     *
     * @param string $configPath Path to config file
     * @return self|null Returns instance or null on failure
     */
    public static function fromConfigFile(string $configPath): ?self
    {
        if (!file_exists($configPath)) {
            return null;
        }

        $config = require $configPath;

        if (!is_array($config)) {
            return null;
        }

        return new self($config);
    }

    /**
     * Get last error message
     *
     * @return string|null
     */
    public function getLastError(): ?string
    {
        return $this->lastError;
    }

    /**
     * Validate that configuration is complete
     *
     * @return bool
     */
    public function validateConfig(): bool
    {
        if (empty($this->config['smtp']['password'])) {
            $this->lastError = 'SMTP password is not configured';
            return false;
        }

        if (empty($this->config['smtp']['host'])) {
            $this->lastError = 'SMTP host is not configured';
            return false;
        }

        if (empty($this->config['from']['email'])) {
            $this->lastError = 'From email is not configured';
            return false;
        }

        if (empty($this->config['to']['email'])) {
            $this->lastError = 'To email is not configured';
            return false;
        }

        return true;
    }

    /**
     * Create a configured PHPMailer instance
     *
     * @param string|null $replyToEmail Optional reply-to email
     * @param string|null $replyToName Optional reply-to name
     * @return PHPMailer|null Returns configured mailer or null on failure
     */
    public function create(?string $replyToEmail = null, ?string $replyToName = null): ?PHPMailer
    {
        if (!$this->validateConfig()) {
            return null;
        }

        try {
            $mail = new PHPMailer(true);

            // Server settings
            $mail->isSMTP();
            $mail->Host       = $this->config['smtp']['host'];
            $mail->SMTPAuth   = true;
            $mail->Username   = $this->config['smtp']['username'];
            $mail->Password   = $this->config['smtp']['password'];
            $mail->Port       = (int)$this->config['smtp']['port'];

            // Set encryption based on config
            if ($this->config['smtp']['secure'] === 'ssl') {
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            } else {
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            }

            // Character encoding
            $mail->CharSet = 'UTF-8';
            $mail->Encoding = 'base64';

            // From address (must match authenticated user for SPF/DMARC)
            $mail->setFrom(
                $this->config['from']['email'],
                $this->config['from']['name']
            );

            // To address
            $mail->addAddress(
                $this->config['to']['email'],
                $this->config['to']['name']
            );

            // Set Reply-To if provided
            if ($replyToEmail !== null && filter_var($replyToEmail, FILTER_VALIDATE_EMAIL)) {
                $mail->addReplyTo($replyToEmail, $replyToName ?? '');
            }

            // Email format
            $mail->isHTML(true);

            return $mail;

        } catch (Exception $e) {
            $this->lastError = 'PHPMailer Exception: ' . $e->getMessage();
            return null;
        }
    }

    /**
     * Get rate limit settings from config
     *
     * @return array ['max_requests' => int, 'window' => int]
     */
    public function getRateLimitSettings(): array
    {
        return [
            'max_requests' => $this->config['rate_limit']['max_requests'] ?? 5,
            'window'       => $this->config['rate_limit']['window'] ?? 3600,
        ];
    }
}

/**
 * Simple file-based rate limiter
 */
class RateLimiter
{
    /** @var string Path to rate limit data file */
    private $dataFile;

    /** @var int Maximum requests allowed */
    private $maxRequests;

    /** @var int Time window in seconds */
    private $window;

    /**
     * Constructor
     *
     * @param string $dataFile Path to JSON data file
     * @param int $maxRequests Max requests per window
     * @param int $window Time window in seconds
     */
    public function __construct(string $dataFile, int $maxRequests = 5, int $window = 3600)
    {
        $this->dataFile = $dataFile;
        $this->maxRequests = $maxRequests;
        $this->window = $window;
    }

    /**
     * Check if request is allowed and record it
     *
     * @param string $ip Client IP address
     * @return bool True if allowed, false if rate limited
     */
    public function checkAndRecord(string $ip): bool
    {
        $data = $this->loadData();
        $now = time();
        $ipHash = md5($ip); // Hash IP for privacy

        // Clean up expired entries
        $data = array_filter($data, function ($entry) use ($now) {
            return ($entry['expires'] ?? 0) > $now;
        });

        // Check current IP
        if (isset($data[$ipHash])) {
            $entry = $data[$ipHash];

            if ($entry['expires'] > $now && $entry['count'] >= $this->maxRequests) {
                // Rate limited
                $this->saveData($data);
                return false;
            }

            if ($entry['expires'] > $now) {
                // Increment counter
                $data[$ipHash]['count']++;
            } else {
                // Start new window
                $data[$ipHash] = [
                    'count'   => 1,
                    'expires' => $now + $this->window,
                ];
            }
        } else {
            // New IP
            $data[$ipHash] = [
                'count'   => 1,
                'expires' => $now + $this->window,
            ];
        }

        $this->saveData($data);
        return true;
    }

    /**
     * Load rate limit data from file
     *
     * @return array
     */
    private function loadData(): array
    {
        if (!file_exists($this->dataFile)) {
            return [];
        }

        $content = @file_get_contents($this->dataFile);
        if ($content === false) {
            return [];
        }

        $data = json_decode($content, true);
        return is_array($data) ? $data : [];
    }

    /**
     * Save rate limit data to file
     *
     * @param array $data
     * @return bool
     */
    private function saveData(array $data): bool
    {
        $dir = dirname($this->dataFile);
        if (!is_dir($dir)) {
            @mkdir($dir, 0755, true);
        }

        return @file_put_contents(
            $this->dataFile,
            json_encode($data, JSON_PRETTY_PRINT),
            LOCK_EX
        ) !== false;
    }
}

/**
 * Input sanitizer utility
 */
class InputSanitizer
{
    /**
     * Sanitize a string for safe output
     *
     * @param mixed $input
     * @return string
     */
    public static function sanitizeString($input): string
    {
        if (!is_string($input)) {
            return '';
        }

        // Remove null bytes
        $input = str_replace("\0", '', $input);

        // Trim whitespace
        $input = trim($input);

        // Convert to UTF-8 if needed and strip invalid sequences
        if (function_exists('mb_convert_encoding')) {
            $input = mb_convert_encoding($input, 'UTF-8', 'UTF-8');
        }

        return $input;
    }

    /**
     * Sanitize email address
     *
     * @param mixed $input
     * @return string|null Returns sanitized email or null if invalid
     */
    public static function sanitizeEmail($input): ?string
    {
        $email = self::sanitizeString($input);
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);

        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return strtolower($email);
        }

        return null;
    }

    /**
     * Sanitize phone number (keep only digits, +, spaces, dashes, parens)
     *
     * @param mixed $input
     * @return string
     */
    public static function sanitizePhone($input): string
    {
        $phone = self::sanitizeString($input);
        // Keep only digits, +, spaces, dashes, parentheses
        return preg_replace('/[^0-9+\s\-()]/', '', $phone);
    }

    /**
     * Sanitize for HTML output (escape special chars)
     *
     * @param string $input
     * @return string
     */
    public static function escapeHtml(string $input): string
    {
        return htmlspecialchars($input, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    }

    /**
     * Check if honeypot field is filled (indicates spam)
     *
     * @param mixed $value
     * @return bool True if spam detected
     */
    public static function isHoneypotFilled($value): bool
    {
        if ($value === null) {
            return false;
        }

        $value = self::sanitizeString($value);
        return $value !== '';
    }
}

/**
 * Simple logger utility
 */
class SimpleLogger
{
    /** @var string Path to log file */
    private $logFile;

    /**
     * Constructor
     *
     * @param string $logFile Path to log file
     */
    public function __construct(string $logFile)
    {
        $this->logFile = $logFile;
    }

    /**
     * Log an error message
     *
     * @param string $message
     * @param array $context Additional context data
     * @return void
     */
    public function error(string $message, array $context = []): void
    {
        $this->log('ERROR', $message, $context);
    }

    /**
     * Log an info message
     *
     * @param string $message
     * @param array $context
     * @return void
     */
    public function info(string $message, array $context = []): void
    {
        $this->log('INFO', $message, $context);
    }

    /**
     * Write log entry
     *
     * @param string $level
     * @param string $message
     * @param array $context
     * @return void
     */
    private function log(string $level, string $message, array $context): void
    {
        $timestamp = date('Y-m-d H:i:s');
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

        $entry = sprintf(
            "[%s] [%s] [IP: %s] %s",
            $timestamp,
            $level,
            $ip,
            $message
        );

        if (!empty($context)) {
            $entry .= ' | Context: ' . json_encode($context, JSON_UNESCAPED_UNICODE);
        }

        $entry .= PHP_EOL;

        $dir = dirname($this->logFile);
        if (!is_dir($dir)) {
            @mkdir($dir, 0755, true);
        }

        @file_put_contents($this->logFile, $entry, FILE_APPEND | LOCK_EX);
    }
}
