<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . CORS_ORIGIN);
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

function jsonResponse($data, $code = 200) {
  http_response_code($code);
  echo json_encode($data, JSON_UNESCAPED_UNICODE);
  exit;
}

function jsonError($message, $code = 400) {
  jsonResponse(['success' => false, 'error' => $message], $code);
}

function jsonSuccess($data, $code = 200) {
  jsonResponse(['success' => true, 'data' => $data], $code);
}

function jsonPaginated($items, $total, $page, $limit) {
  jsonResponse([
    'success' => true,
    'count' => count($items),
    'total' => (int)$total,
    'totalPages' => (int)ceil($total / $limit),
    'currentPage' => (int)$page,
    'data' => $items
  ]);
}

function getJsonInput() {
  return json_decode(file_get_contents('php://input'), true) ?: [];
}

function getQuery($key, $default = null) {
  return $_GET[$key] ?? $default;
}

function getBearerToken() {
  $headers = getallheaders();
  $auth = $headers['Authorization'] ?? $headers['authorization'] ?? '';
  if (preg_match('/Bearer\s+(.+)/i', $auth, $m)) return $m[1];
  return null;
}
