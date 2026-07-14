<?php
define('DB_DRIVER', getenv('DB_DRIVER') ?: 'sqlite');
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'alquds_institute');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');
define('SQLITE_PATH', __DIR__ . '/database.sqlite');

define('JWT_SECRET', getenv('JWT_SECRET') ?: 'your-super-secret-jwt-key-change-in-production');
define('JWT_EXPIRE', 60 * 60 * 24 * 30);
define('CORS_ORIGIN', getenv('CORS_ORIGIN') ?: 'http://localhost:3000');

define('UPLOAD_DIR', __DIR__ . '/../uploads');

function getDB() {
  static $pdo = null;
  if (!$pdo) {
    if (DB_DRIVER === 'sqlite') {
      $dbExists = file_exists(SQLITE_PATH);
      $pdo = new PDO("sqlite:" . SQLITE_PATH, null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
      ]);
      $pdo->exec("PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;");
      if (!$dbExists) {
        $schema = file_get_contents(__DIR__ . '/schema.sqlite.sql');
        $pdo->exec($schema);
      }
    } else {
      $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
      );
    }
  }
  return $pdo;
}

function now() {
  return DB_DRIVER === 'sqlite' ? "datetime('now')" : 'NOW()';
}
