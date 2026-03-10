<?php
/**
 * Force LiteSpeed Cache Refresh
 * Reads each HTML file directly and serves it with no-cache headers
 * to force LiteSpeed to regenerate its cache.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('X-LiteSpeed-Purge: *');
header('X-LiteSpeed-Tag: *');

// Secret check
$secret = $_GET['secret'] ?? '';
$extractFile = __DIR__ . '/deploy-extract.php';
$validSecret = '';

if (file_exists($extractFile)) {
    $content = file_get_contents($extractFile);
    if (preg_match("/define\s*\(\s*['\"]DEPLOY_SECRET['\"]\s*,\s*['\"]([^'\"]+)['\"]/", $content, $m)) {
        $validSecret = $m[1];
    } elseif (preg_match("/\\$(?:valid_?)?secret\s*=\s*['\"]([^'\"]+)['\"]/i", $content, $m)) {
        $validSecret = $m[1];
    }
}

if (empty($secret) || empty($validSecret) || !hash_equals($validSecret, $secret)) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'Unauthorized']);
    exit;
}

$docRoot = dirname(__DIR__);
$actions = [];

// 1. Delete LiteSpeed cache files if accessible
$lsCacheDirs = glob($docRoot . '/.lscache*', GLOB_ONLYDIR);
$lsCacheDirs = array_merge($lsCacheDirs, glob('/home/areklamc/.lscache*', GLOB_ONLYDIR));
$lsCacheDirs = array_merge($lsCacheDirs, glob('/tmp/lshttpd*', GLOB_ONLYDIR));

foreach ($lsCacheDirs as $dir) {
    if (is_dir($dir) && is_writable($dir)) {
        $count = 0;
        $iter = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::CHILD_FIRST
        );
        foreach ($iter as $f) {
            if ($f->isFile()) { @unlink($f->getRealPath()); $count++; }
            elseif ($f->isDir()) { @rmdir($f->getRealPath()); }
        }
        $actions[] = "Deleted $count cache files from $dir";
    }
}

// 2. Touch all HTML files to update mtime (some cache systems use mtime)
$htmlFiles = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($docRoot, RecursiveDirectoryIterator::SKIP_DOTS)
);

$touched = 0;
foreach ($htmlFiles as $file) {
    if ($file->isFile() && $file->getExtension() === 'html') {
        touch($file->getRealPath());
        $touched++;
    }
}
$actions[] = "Touched $touched HTML files";

// 3. Touch .htaccess
$htaccess = $docRoot . '/.htaccess';
if (file_exists($htaccess)) {
    // Read, modify slightly (add/remove trailing newline), write back
    $content = file_get_contents($htaccess);
    $content = rtrim($content) . "\n# Cache bust: " . date('Y-m-d H:i:s') . "\n";
    file_put_contents($htaccess, $content);
    $actions[] = '.htaccess modified to force LiteSpeed reload';
}

echo json_encode([
    'ok' => true,
    'message' => 'Force refresh completed',
    'html_files_touched' => $touched,
    'actions' => $actions,
    'timestamp' => date('Y-m-d H:i:s'),
], JSON_UNESCAPED_UNICODE);
