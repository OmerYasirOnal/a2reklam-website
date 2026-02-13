<?php
/**
 * SMTP Configuration File
 *
 * IMPORTANT: This file should be placed OUTSIDE public_html at:
 * /home/areklamc/smtp_config.php
 *
 * It is loaded by the API scripts via:
 * require __DIR__ . '/../../smtp_config.php';
 */

return [
    // SMTP Server Settings
    'smtp' => [
        'host'     => 'a2reklam.com',           // Primary: a2reklam.com | Fallback: mail.a2reklam.com
        'port'     => 465,                       // Primary: 465 (SMTPS) | Fallback: 587 (STARTTLS)
        'secure'   => 'ssl',                     // 'ssl' for port 465 | 'tls' for port 587
        'username' => 'info@a2reklam.com',
        'password' => 'OsmanEsra3458',                        // ← ENTER YOUR SMTP PASSWORD HERE
    ],

    // Email Addresses
    'from' => [
        'email' => 'info@a2reklam.com',
        'name'  => 'A2 Reklam',
    ],
    'to' => [
        'email' => 'info@a2reklam.com',
        'name'  => 'A2 Reklam',
    ],

    // Rate Limiting
    'rate_limit' => [
        'max_requests' => 5,                     // Max requests per IP
        'window'       => 3600,                  // Time window in seconds (1 hour)
    ],
];
