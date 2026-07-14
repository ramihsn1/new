<?php
// Router for PHP built-in server: php -S localhost:8080 router.php
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Serve api requests through index.php
if (str_starts_with($uri, '/api/') || $uri === '/api') {
  $_SERVER['PATH_INFO'] = $uri;
  require __DIR__ . '/index.php';
  return true;
}

// Serve static files
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
  return false;
}

// Everything else 404
http_response_code(404);
echo json_encode(['success' => false, 'error' => 'Not found']);
return true;
