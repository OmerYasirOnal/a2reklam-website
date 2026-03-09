<?php
/**
 * Server-side deploy extraction endpoint
 * Called by scripts/deploy.sh after FTP upload
 *
 * Extracts dist.zip, fixes permissions, cleans up.
 * Protected by a secret token.
 */
header('Content-Type: application/json; charset=utf-8');
error_reporting(0);
ini_set('display_errors', 0);

// Secret validation
$secret = $_GET['secret'] ?? '';
$validSecret = 'a2deploy_s3cr3t_2026';

if (empty($secret) || $secret !== $validSecret) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'Unauthorized']);
    exit;
}

$baseDir = dirname(__DIR__); // /home/areklamc/public_html
$zipPath = $baseDir . '/dist.zip';
$log = [];

// Step 1: Check zip exists
if (!file_exists($zipPath)) {
    echo json_encode(['ok' => false, 'error' => 'dist.zip not found']);
    exit;
}

$zipSize = round(filesize($zipPath) / 1024 / 1024, 2);
$log[] = "Found dist.zip ({$zipSize} MB)";

// Step 2: Extract
$zip = new ZipArchive;
if ($zip->open($zipPath) !== TRUE) {
    echo json_encode(['ok' => false, 'error' => 'Failed to open zip']);
    exit;
}

$fileCount = $zip->numFiles;
$zip->extractTo($baseDir);
$zip->close();
$log[] = "Extracted {$fileCount} files";

// Step 3: Fix permissions
$fixed = 0;
$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($baseDir, RecursiveDirectoryIterator::SKIP_DOTS),
    RecursiveIteratorIterator::SELF_FIRST
);

foreach ($iterator as $item) {
    $path = $item->getPathname();
    // Skip hidden dirs, node_modules, etc.
    if (strpos($path, '/.') !== false) continue;

    if ($item->isDir()) {
        @chmod($path, 0755);
    } else {
        @chmod($path, 0644);
    }
    $fixed++;
}
$log[] = "Fixed permissions for {$fixed} items";

// Step 4: Delete zip
unlink($zipPath);
$log[] = "Cleaned up dist.zip";

// Done
echo json_encode([
    'ok' => true,
    'message' => 'Deploy successful',
    'details' => $log,
    'timestamp' => date('Y-m-d H:i:s'),
]);
