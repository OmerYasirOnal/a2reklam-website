<?php
/**
 * LiteSpeed Cache Purge Endpoint
 * Called automatically after deploy to clear server-side cache.
 *
 * Usage: GET /api/cache-purge.php?secret=YOUR_SECRET
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache, no-store, must-revalidate');

$secret = $_GET['secret'] ?? '';
$actions = [];

// Read deploy secret - try multiple sources
$validSecret = '';

// Source 1: Same config as deploy-extract.php
$configPaths = [
    __DIR__ . '/_config.php',
    __DIR__ . '/config.php',
    dirname(__DIR__) . '/_config.php',
    dirname(__DIR__, 2) . '/smtp_config.php',
];

foreach ($configPaths as $path) {
    if (file_exists($path)) {
        include_once $path;
        if (defined('DEPLOY_SECRET')) {
            $validSecret = DEPLOY_SECRET;
            $actions[] = "Secret loaded from: " . basename($path);
            break;
        }
    }
}

// Source 2: Read from deploy-extract.php (extract the constant)
if (empty($validSecret)) {
    $extractFile = __DIR__ . '/deploy-extract.php';
    if (file_exists($extractFile)) {
        $content = file_get_contents($extractFile);
        // Look for patterns like: $secret = 'xxx' or define('DEPLOY_SECRET', 'xxx')
        if (preg_match("/define\s*\(\s*['\"]DEPLOY_SECRET['\"]\s*,\s*['\"]([^'\"]+)['\"]/", $content, $m)) {
            $validSecret = $m[1];
            $actions[] = "Secret extracted from deploy-extract.php (define)";
        } elseif (preg_match("/\\$(?:valid_?)?secret\s*=\s*['\"]([^'\"]+)['\"]/i", $content, $m)) {
            $validSecret = $m[1];
            $actions[] = "Secret extracted from deploy-extract.php (variable)";
        }
    }
}

// Source 3: Environment
if (empty($validSecret)) {
    $envSecret = getenv('DEPLOY_SECRET');
    if ($envSecret) {
        $validSecret = $envSecret;
        $actions[] = "Secret loaded from environment";
    }
}

if (empty($secret) || empty($validSecret) || !hash_equals($validSecret, $secret)) {
    http_response_code(403);
    echo json_encode([
        'ok' => false,
        'error' => 'Unauthorized',
        'debug' => empty($validSecret) ? 'No valid secret found on server' : 'Secret mismatch',
    ]);
    exit;
}

// === PURGE ACTIONS ===

// 1. Send LiteSpeed Purge headers
header('X-LiteSpeed-Purge: *');
$actions[] = 'X-LiteSpeed-Purge: * header sent';

// 2. Try to clear LiteSpeed cache directories
$cacheDirs = [
    '/home/areklamc/.lscache/',
    '/home/areklamc/public_html/.lscache/',
    '/tmp/lshttpd/',
];

foreach ($cacheDirs as $dir) {
    if (is_dir($dir)) {
        $count = 0;
        $iter = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::CHILD_FIRST
        );
        foreach ($iter as $file) {
            if ($file->isFile()) {
                @unlink($file->getRealPath());
                $count++;
            }
        }
        $actions[] = "Cleared $count files from $dir";
    }
}

// 3. Touch .htaccess to invalidate LiteSpeed config cache
$htaccess = dirname(__DIR__) . '/.htaccess';
if (file_exists($htaccess)) {
    touch($htaccess);
    clearstatcache(true, $htaccess);
    $actions[] = '.htaccess touched';
}

// 4. Create a purge marker file (some LSCache plugins check this)
$purgeMarker = dirname(__DIR__) . '/.lscache_purge';
file_put_contents($purgeMarker, date('Y-m-d H:i:s'));
$actions[] = 'Purge marker created';

echo json_encode([
    'ok' => true,
    'message' => 'Cache purge completed',
    'actions' => $actions,
    'timestamp' => date('Y-m-d H:i:s'),
], JSON_UNESCAPED_UNICODE);
