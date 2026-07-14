<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/includes/response.php';
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/validator.php';

$path = trim($_SERVER['PATH_INFO'] ?? parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '', '/');
$path = preg_replace('#^api/#', '', $path);
$segments = array_values(array_filter(explode('/', $path)));
$route = $segments[0] ?? '';
$id = $segments[1] ?? null;
$action = $segments[2] ?? null;
$method = $_SERVER['REQUEST_METHOD'];
$input = getJsonInput();

try {
  switch ($route) {
    case 'health':
      jsonSuccess(['message' => 'API is running', 'timestamp' => date('c')]);
      break;

    case 'auth':
      handleAuth($method, $id, $action, $input);
      break;

    case 'news':
    case 'events':
    case 'services':
    case 'publications':
    case 'projects':
    case 'team':
    case 'partners':
    case 'faq':
    case 'testimonials':
    case 'pages':
      handleCrud($route, $method, $id, $action, $input);
      break;

    case 'public':
      handlePublic($method, $id, $action, $input);
      break;

    case 'upload':
    case 'media':
    case 'settings':
    case 'dashboard':
      handleAdmin($route, $method, $id, $action, $input);
      break;

    case 'sitemap':
      handleSitemap();
      break;

    default:
      jsonError('Not found', 404);
  }
} catch (Exception $e) {
  jsonError($e->getMessage(), 500);
}

function handleAuth($method, $id, $action, $input) {
  $db = getDB();

  if ($method === 'POST' && $id === 'register') {
    $input = validateRequired(['name', 'email', 'password']);
    validateEmail($input['email']);
    if (strlen($input['password']) < 8) jsonError('Password must be at least 8 characters');

    $existing = $db->prepare("SELECT id FROM users WHERE email = ?");
    $existing->execute([$input['email']]);
    if ($existing->fetch()) jsonError('User already exists');

    $hash = password_hash($input['password'], PASSWORD_BCRYPT);
    $role = in_array($input['role'] ?? '', ['super_admin', 'admin', 'editor']) ? $input['role'] : 'editor';

    $db->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)")
       ->execute([$input['name'], $input['email'], $hash, $role]);
    $userId = $db->lastInsertId();

    $accessToken = generateJWT($userId, $role);
    $refreshToken = generateRefreshToken();
    $db->prepare("UPDATE users SET refresh_token = ?, last_login = NOW() WHERE id = ?")
       ->execute([$refreshToken, $userId]);

    $user = $db->prepare("SELECT id, name, email, role, is_active, created_at FROM users WHERE id = ?");
    $user->execute([$userId]);
    jsonResponse(['success' => true, 'data' => [
      'user' => $user->fetch(),
      'accessToken' => $accessToken,
      'refreshToken' => $refreshToken
    ]], 201);
  }

  if ($method === 'POST' && $id === 'login') {
    $input = validateRequired(['email', 'password']);
    validateEmail($input['email']);

    $stmt = $db->prepare("SELECT * FROM users WHERE email = ? AND is_active = 1");
    $stmt->execute([$input['email']]);
    $user = $stmt->fetch();
    if (!$user || !password_verify($input['password'], $user['password'])) {
      jsonError('Invalid credentials', 401);
    }

    $accessToken = generateJWT($user['id'], $user['role']);
    $refreshToken = generateRefreshToken();
    $db->prepare("UPDATE users SET refresh_token = ?, last_login = NOW() WHERE id = ?")
       ->execute([$refreshToken, $user['id']]);

    unset($user['password'], $user['refresh_token']);
    jsonResponse(['success' => true, 'data' => [
      'user' => $user,
      'accessToken' => $accessToken,
      'refreshToken' => $refreshToken
    ]]);
  }

  if ($method === 'POST' && $id === 'logout') {
    $user = requireAuth();
    $db->prepare("UPDATE users SET refresh_token = NULL WHERE id = ?")->execute([$user['id']]);
    jsonSuccess(['message' => 'Logged out successfully']);
  }

  if ($method === 'GET' && $id === 'me') {
    $user = requireAuth();
    jsonSuccess(['user' => $user]);
  }

  if ($method === 'GET' && $id === 'users') {
    requireRole('super_admin', 'admin');
    $users = $db->query("SELECT id, name, email, role, is_active, last_login, created_at FROM users ORDER BY created_at DESC")->fetchAll();
    jsonResponse(['success' => true, 'count' => count($users), 'data' => $users]);
  }

  if ($method === 'PUT' && $id === 'users' && $action) {
    requireRole('super_admin', 'admin');
    $input = getJsonInput();
    $userId = $action;

    $user = $db->prepare("SELECT * FROM users WHERE id = ?");
    $user->execute([$userId]);
    if (!$user->fetch()) jsonError('User not found', 404);

    $fields = [];
    $values = [];
    foreach (['name', 'email', 'role'] as $f) {
      if (isset($input[$f])) { $fields[] = "$f = ?"; $values[] = $input[$f]; }
    }
    if (isset($input['isActive'])) { $fields[] = "is_active = ?"; $values[] = $input['isActive'] ? 1 : 0; }
    if (isset($input['password'])) {
      $fields[] = "password = ?";
      $values[] = password_hash($input['password'], PASSWORD_BCRYPT);
    }

    if ($fields) {
      $values[] = $userId;
      $db->prepare("UPDATE users SET " . implode(', ', $fields) . " WHERE id = ?")->execute($values);
    }

    $updated = $db->prepare("SELECT id, name, email, role, is_active, last_login, created_at FROM users WHERE id = ?");
    $updated->execute([$userId]);
    jsonSuccess($updated->fetch());
  }

  jsonError('Route not found', 404);
}

function handleCrud($route, $method, $id, $action, $input) {
  $db = getDB();
  $table = $route;
  $contentTable = in_array($route, ['news', 'events', 'services', 'publications', 'projects']);
  $activeTable = in_array($route, ['team', 'partners', 'faq', 'testimonials']);

  if ($method === 'GET' && !$id) {
    $lang = getQuery('lang', 'en');
    $page = max(1, (int)getQuery('page', 1));
    $limit = max(1, min(50, (int)getQuery('limit', 10)));
    $offset = ($page - 1) * $limit;

    if ($contentTable) {
      $filterQuery = "WHERE status = 'published'";
      $sort = $route === 'events' ? 'start_date ASC' : 'created_at DESC';
    } else {
      $filterQuery = "WHERE is_active = 1";
      $sort = 'sort_order ASC';
    }

    $count = $db->query("SELECT COUNT(*) FROM $table $filterQuery")->fetchColumn();
    $items = $db->query("SELECT * FROM $table $filterQuery ORDER BY $sort LIMIT $limit OFFSET $offset")->fetchAll();

    jsonPaginated(array_map(fn($r) => formatRow($r, $route), $items), $count, $page, $limit);
  }

  if ($method === 'GET' && $id) {
    $stmt = $db->prepare("SELECT * FROM $table WHERE id = ?");
    $stmt->execute([$id]);
    $item = $stmt->fetch();
    if (!$item) jsonError("$route not found", 404);
    jsonSuccess(formatRow($item, $route));
  }

  requireRole('super_admin', 'admin', 'editor');

  if ($method === 'GET' && !$id) {
    $page = max(1, (int)getQuery('page', 1));
    $limit = max(1, min(50, (int)getQuery('limit', 20)));
    $offset = ($page - 1) * $limit;

    $filterQuery = '';
    $params = [];
    if ($status = getQuery('status')) {
      $filterQuery = "WHERE status = ?";
      $params[] = $status;
    }

    $count = $db->prepare("SELECT COUNT(*) FROM $table $filterQuery");
    $count->execute($params);
    $total = $count->fetchColumn();

    $stmt = $db->prepare("SELECT * FROM $table $filterQuery ORDER BY created_at DESC LIMIT $limit OFFSET $offset");
    $stmt->execute($params);
    $items = $stmt->fetchAll();

    jsonPaginated(array_map(fn($r) => formatRow($r, $route), $items), $total, $page, $limit);
  }

  if ($method === 'POST') {
    $cols = [];
    $vals = [];
    $placeholders = [];

    if ($contentTable) {
      $input['author_id'] = $GLOBALS['auth_user']['id'];
      if (($input['status'] ?? '') === 'published') $input['published_at'] = date('Y-m-d H:i:s');
    }

    foreach ($input as $k => $v) {
      if (is_array($v)) $v = json_encode($v, JSON_UNESCAPED_UNICODE);
      $cols[] = $k;
      $placeholders[] = '?';
      $vals[] = $v;
    }

    if (empty($cols)) jsonError('No data provided');
    $db->prepare("INSERT INTO $table (" . implode(',', $cols) . ") VALUES (" . implode(',', $placeholders) . ")")
       ->execute($vals);
    $newId = $db->lastInsertId();
    $item = $db->prepare("SELECT * FROM $table WHERE id = ?");
    $item->execute([$newId]);
    jsonSuccess(formatRow($item->fetch(), $route), 201);
  }

  if ($method === 'PUT' && $id) {
    $sets = [];
    $vals = [];
    foreach ($input as $k => $v) {
      if (is_array($v)) $v = json_encode($v, JSON_UNESCAPED_UNICODE);
      $sets[] = "$k = ?";
      $vals[] = $v;
    }
    if (empty($sets)) jsonError('No data provided');
    $vals[] = $id;
    $db->prepare("UPDATE $table SET " . implode(', ', $sets) . " WHERE id = ?")->execute($vals);
    $item = $db->prepare("SELECT * FROM $table WHERE id = ?");
    $item->execute([$id]);
    if (!$item->fetch()) jsonError("$route not found", 404);
    jsonSuccess(formatRow($item->fetch(), $route));
  }

  if ($method === 'DELETE' && $id) {
    requireRole('super_admin', 'admin');
    $stmt = $db->prepare("DELETE FROM $table WHERE id = ?");
    $stmt->execute([$id]);
    if ($stmt->rowCount() === 0) jsonError("$route not found", 404);
    jsonSuccess((object)[]);
  }

  jsonError('Route not found', 404);
}

function handlePublic($method, $id, $action, $input) {
  $db = getDB();

  if ($method === 'POST' && $id === 'contact') {
    $input = validateRequired(['name', 'email', 'subject', 'message']);
    $db->prepare("INSERT INTO contact_messages (name, email, subject, message, phone) VALUES (?, ?, ?, ?, ?)")
       ->execute([$input['name'], $input['email'], $input['subject'], $input['message'], $input['phone'] ?? null]);
    jsonSuccess(['message' => 'Message sent successfully'], 201);
  }

  if ($method === 'GET' && $id === 'contacts') {
    requireRole('super_admin', 'admin');
    $page = max(1, (int)getQuery('page', 1));
    $limit = max(1, (int)getQuery('limit', 20));
    $offset = ($page - 1) * $limit;

    $filter = '';
    if (getQuery('isRead') !== null) $filter = "WHERE is_read = " . (getQuery('isRead') === 'true' ? 1 : 0);

    $total = $db->query("SELECT COUNT(*) FROM contact_messages $filter")->fetchColumn();
    $items = $db->query("SELECT * FROM contact_messages $filter ORDER BY created_at DESC LIMIT $limit OFFSET $offset")->fetchAll();
    jsonPaginated($items, $total, $page, $limit);
  }

  if ($method === 'PUT' && $id === 'contacts' && $action) {
    requireRole('super_admin', 'admin');
    $db->prepare("UPDATE contact_messages SET is_read = 1 WHERE id = ?")->execute([$action]);
    $item = $db->prepare("SELECT * FROM contact_messages WHERE id = ?");
    $item->execute([$action]);
    if (!$item->fetch()) jsonError('Message not found', 404);
    jsonSuccess($item->fetch());
  }

  if ($method === 'POST' && $id === 'newsletter') {
    $input = validateRequired(['email']);
    validateEmail($input['email']);
    $existing = $db->prepare("SELECT * FROM newsletter_subscribers WHERE email = ?");
    $existing->execute([$input['email']]);
    $sub = $existing->fetch();
    if ($sub) {
      if (!$sub['is_active']) {
        $db->prepare("UPDATE newsletter_subscribers SET is_active = 1, subscribed_at = NOW() WHERE id = ?")
           ->execute([$sub['id']]);
        jsonSuccess(['message' => 'Resubscribed successfully']);
      }
      jsonSuccess(['message' => 'Already subscribed']);
    }
    $db->prepare("INSERT INTO newsletter_subscribers (email) VALUES (?)")->execute([$input['email']]);
    jsonSuccess(['message' => 'Subscribed successfully'], 201);
  }

  if ($method === 'GET' && $id === 'subscribers') {
    requireRole('super_admin', 'admin');
    $items = $db->query("SELECT * FROM newsletter_subscribers WHERE is_active = 1 ORDER BY subscribed_at DESC")->fetchAll();
    jsonResponse(['success' => true, 'count' => count($items), 'data' => $items]);
  }

  jsonError('Route not found', 404);
}

function handleAdmin($route, $method, $id, $action, $input) {
  $db = getDB();

  if ($route === 'upload' && $method === 'POST') {
    requireRole('super_admin', 'admin', 'editor');
    $file = $_FILES['file'] ?? null;
    if (!$file || $file['error'] !== UPLOAD_ERR_OK) jsonError('No file uploaded');

    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = bin2hex(random_bytes(16)) . '.' . $ext;
    $dest = UPLOAD_DIR . '/' . $filename;
    if (!is_dir(UPLOAD_DIR)) mkdir(UPLOAD_DIR, 0755, true);
    move_uploaded_file($file['tmp_name'], $dest);

    $db->prepare("INSERT INTO media (filename, original_name, mime_type, size, url, folder, alt_en, alt_ar, alt_tr, uploaded_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")->execute([
      $filename, $file['name'], $file['type'], $file['size'],
      '/uploads/' . $filename, $input['folder'] ?? 'general',
      $input['alt'] ?? '', $input['alt'] ?? '', $input['alt'] ?? '',
      $GLOBALS['auth_user']['id']
    ]);

    $item = $db->prepare("SELECT * FROM media WHERE id = ?");
    $item->execute([$db->lastInsertId()]);
    jsonSuccess($item->fetch(), 201);
  }

  if ($route === 'media' && $method === 'GET') {
    requireRole('super_admin', 'admin', 'editor');
    $page = max(1, (int)getQuery('page', 1));
    $limit = max(1, (int)getQuery('limit', 50));
    $offset = ($page - 1) * $limit;

    $filter = '';
    $params = [];
    if ($folder = getQuery('folder')) {
      $filter = "WHERE folder = ?";
      $params[] = $folder;
    }

    $count = $db->prepare("SELECT COUNT(*) FROM media $filter");
    $count->execute($params);
    $total = $count->fetchColumn();

    $stmt = $db->prepare("SELECT * FROM media $filter ORDER BY created_at DESC LIMIT $limit OFFSET $offset");
    $stmt->execute($params);
    jsonPaginated($stmt->fetchAll(), $total, $page, $limit);
  }

  if ($route === 'media' && $method === 'DELETE' && $id) {
    requireRole('super_admin', 'admin');
    $item = $db->prepare("SELECT * FROM media WHERE id = ?");
    $item->execute([$id]);
    $media = $item->fetch();
    if (!$media) jsonError('Media not found', 404);

    $filepath = UPLOAD_DIR . '/' . $media['filename'];
    if (file_exists($filepath)) unlink($filepath);
    $db->prepare("DELETE FROM media WHERE id = ?")->execute([$id]);
    jsonSuccess((object)[]);
  }

  if ($route === 'settings' && $method === 'GET') {
    $settings = $db->query("SELECT `key`, `value` FROM settings")->fetchAll();
    $obj = [];
    foreach ($settings as $s) $obj[$s['key']] = json_decode($s['value'], true) ?: $s['value'];
    jsonSuccess($obj);
  }

  if ($route === 'settings' && $method === 'PUT') {
    requireRole('super_admin', 'admin');
    $input = getJsonInput();
    foreach ($input as $key => $value) {
      $db->prepare("INSERT INTO settings (`key`, `value`, `group`) VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `group` = VALUES(`group`)")
        ->execute([$key, is_scalar($value) ? $value : json_encode($value, JSON_UNESCAPED_UNICODE),
        (is_array($value) ? ($value['group'] ?? 'general') : 'general')]);
    }
    jsonSuccess(['message' => 'Settings updated']);
  }

  if ($route === 'dashboard' && $id === 'stats' && $method === 'GET') {
    requireRole('super_admin', 'admin');
    $tables = ['news', 'events', 'services', 'publications', 'projects', 'team', 'partners', 'contact_messages', 'newsletter_subscribers', 'media'];
    $stats = [];
    foreach ($tables as $t) {
      $total = $db->query("SELECT COUNT(*) FROM $t")->fetchColumn();
      $published = 0;
      if (in_array($t, ['news', 'events', 'services', 'publications', 'projects'])) {
        $published = $db->query("SELECT COUNT(*) FROM $t WHERE status = 'published'")->fetchColumn();
      }
      $name = str_replace(['_', '-'], '', $t);
      $stats[$name] = ['total' => (int)$total, 'published' => (int)$published];
    }
    $unread = $db->query("SELECT COUNT(*) FROM contact_messages WHERE is_read = 0")->fetchColumn();
    $stats['unreadMessages'] = (int)$unread;
    jsonSuccess($stats);
  }

  jsonError('Route not found', 404);
}

function handleSitemap() {
  ob_clean();
  header('Content-Type: application/xml');
  $baseUrl = CORS_ORIGIN;
  $db = getDB();
  $locales = ['en', 'ar', 'tr'];
  $staticPages = ['', '/about', '/services', '/publications', '/news', '/events', '/projects', '/team', '/partners', '/media-center', '/faq', '/contact', '/privacy', '/terms'];

  $urls = '';
  foreach ($locales as $locale) {
    foreach ($staticPages as $page) {
      $priority = $page === '' ? '1' : '0.8';
      $urls .= "<url><loc>$baseUrl/$locale$page</loc><lastmod>" . date('c') . "</lastmod><changefreq>weekly</changefreq><priority>$priority</priority></url>";
    }
  }

  $tables = [
    'news' => ['slug' => 'slug_en', 'path' => '/news/', 'changefreq' => 'daily'],
    'events' => ['slug' => 'slug_en', 'path' => '/events/', 'changefreq' => 'daily'],
    'services' => ['slug' => 'slug_en', 'path' => '/services/', 'changefreq' => 'monthly'],
    'publications' => ['slug' => 'slug_en', 'path' => '/publications/', 'changefreq' => 'monthly'],
  ];

  foreach ($tables as $table => $config) {
    $items = $db->query("SELECT {$config['slug']}, updated_at FROM $table WHERE status = 'published'")->fetchAll();
    foreach ($locales as $locale) {
      foreach ($items as $item) {
        $lastmod = $item['updated_at'] ?? date('c');
        $urls .= "<url><loc>$baseUrl/$locale{$config['path']}{$item[$config['slug']]}</loc><lastmod>$lastmod</lastmod><changefreq>{$config['changefreq']}</changefreq><priority>0.7</priority></url>";
      }
    }
  }

  echo '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . $urls . '</urlset>';
  exit;
}

function formatRow($row, $route) {
  unset($row['password'], $row['refresh_token']);

  if (isset($row['tags']) && is_string($row['tags'])) {
    $decoded = json_decode($row['tags'], true);
    $row['tags'] = is_array($decoded) ? $decoded : [];
  }
  if (isset($row['images']) && is_string($row['images'])) {
    $decoded = json_decode($row['images'], true);
    $row['images'] = is_array($decoded) ? $decoded : [];
  }
  if (isset($row['social_links']) && is_string($row['social_links'])) {
    $decoded = json_decode($row['social_links'], true);
    $row['social_links'] = is_array($decoded) ? $decoded : [];
  }

  $localizedFields = ['title', 'slug', 'content', 'excerpt', 'name', 'position', 'bio', 'description', 'question', 'answer', 'quote', 'organization', 'location', 'alt', 'caption', 'category'];
  foreach ($localizedFields as $f) {
    if (isset($row["{$f}_en"])) {
      $row[$f] = [
        'en' => $row["{$f}_en"] ?? '',
        'ar' => $row["{$f}_ar"] ?? '',
        'tr' => $row["{$f}_tr"] ?? '',
      ];
      unset($row["{$f}_en"], $row["{$f}_ar"], $row["{$f}_tr"]);
    }
  }

  foreach (['meta_title', 'meta_description'] as $f) {
    if (isset($row["{$f}_en"])) {
      $row[$f] = [
        'en' => $row["{$f}_en"] ?? '',
        'ar' => $row["{$f}_ar"] ?? '',
        'tr' => $row["{$f}_tr"] ?? '',
      ];
      unset($row["{$f}_en"], $row["{$f}_ar"], $row["{$f}_tr"]);
    }
  }

  $row['_id'] = (string)($row['id'] ?? '');
  return $row;
}
