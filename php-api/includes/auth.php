<?php
function generateJWT($userId, $role) {
  $header = base64url(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
  $payload = base64url(json_encode([
    'id' => (string)$userId,
    'role' => $role,
    'iat' => time(),
    'exp' => time() + JWT_EXPIRE
  ]));
  $signature = base64url(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
  return "$header.$payload.$signature";
}

function generateRefreshToken() {
  return bin2hex(random_bytes(40));
}

function verifyJWT($token) {
  $parts = explode('.', $token);
  if (count($parts) !== 3) return null;
  [$header, $payload, $signature] = $parts;

  $validSig = base64url(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true));
  if (!hash_equals($validSig, $signature)) return null;

  $data = json_decode(base64url_decode($payload), true);
  if (!$data || ($data['exp'] ?? 0) < time()) return null;
  return $data;
}

function base64url($data) {
  return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode($data) {
  return base64_decode(strtr($data, '-_', '+/'));
}

function requireAuth() {
  $token = getBearerToken();
  if (!$token) jsonError('Not authorized, no token', 401);
  $payload = verifyJWT($token);
  if (!$payload) jsonError('Not authorized, token failed', 401);

  $db = getDB();
  $stmt = $db->prepare("SELECT id, name, email, role, is_active FROM users WHERE id = ?");
  $stmt->execute([$payload['id']]);
  $user = $stmt->fetch();
  if (!$user || !$user['is_active']) jsonError('User not found or deactivated', 401);

  $GLOBALS['auth_user'] = $user;
  return $user;
}

function requireRole(...$roles) {
  $user = $GLOBALS['auth_user'] ?? requireAuth();
  if (!in_array($user['role'], $roles)) {
    jsonError("Role '{$user['role']}' is not authorized", 403);
  }
  return $user;
}
