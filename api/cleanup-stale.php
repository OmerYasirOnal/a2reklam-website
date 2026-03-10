<?php
/**
 * Cleanup stale root-level .html files that conflict with directory/index.html structure.
 * e.g. removes galeri.html when galeri/index.html exists.
 */

header('Content-Type: application/json; charset=utf-8');

$secret = $_GET['secret'] ?? '';
$extractFile = __DIR__ . '/deploy-extract.php';
$validSecret = '';

if (file_exists($extractFile)) {
    $content = file_get_contents($extractFile);
    if (preg_match("/\\$(?:valid_?)?secret\s*=\s*['\"]([^'\"]+)['\"]/i", $content, $m)) {
        $validSecret = $m[1];
    }
}

if (empty($secret) || empty($validSecret) || !hash_equals($validSecret, $secret)) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'Unauthorized']);
    exit;
}

$docRoot = dirname(__DIR__);
$deleted = [];
$skipped = [];

// Find all root-level .html files that have a matching directory with index.html
$htmlFiles = glob($docRoot . '/*.html');

foreach ($htmlFiles as $htmlFile) {
    $basename = basename($htmlFile, '.html');
    $dirIndex = $docRoot . '/' . $basename . '/index.html';

    // Skip special files
    if (in_array($basename, ['index', '404'])) {
        continue;
    }

    if (is_file($dirIndex)) {
        unlink($htmlFile);
        $deleted[] = $basename . '.html (dir/index.html exists)';
    }
}

// Also check subdirectories
$subdirs = ['blog', 'hizmetler', 'hizmet-bolgeleri', 'tabela-rehberi', 'videolar', 'en'];
foreach ($subdirs as $subdir) {
    $subPath = $docRoot . '/' . $subdir;
    if (!is_dir($subPath)) continue;

    $subHtmlFiles = glob($subPath . '/*.html');
    foreach ($subHtmlFiles as $htmlFile) {
        $basename = basename($htmlFile, '.html');
        if ($basename === 'index') continue;

        $dirIndex = $subPath . '/' . $basename . '/index.html';
        if (is_file($dirIndex)) {
            unlink($htmlFile);
            $deleted[] = $subdir . '/' . $basename . '.html';
        }
    }
}

echo json_encode([
    'ok' => true,
    'message' => 'Stale file cleanup completed',
    'deleted' => $deleted,
    'deleted_count' => count($deleted),
    'timestamp' => date('Y-m-d H:i:s'),
], JSON_UNESCAPED_UNICODE);
