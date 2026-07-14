CREATE DATABASE IF NOT EXISTS alquds_institute CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE alquds_institute;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('super_admin','admin','editor') DEFAULT 'editor',
  is_active TINYINT(1) DEFAULT 1,
  refresh_token VARCHAR(500) DEFAULT NULL,
  last_login DATETIME DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title_en VARCHAR(500) NOT NULL,
  title_ar VARCHAR(500) NOT NULL,
  title_tr VARCHAR(500) NOT NULL,
  slug_en VARCHAR(500) NOT NULL UNIQUE,
  slug_ar VARCHAR(500) NOT NULL,
  slug_tr VARCHAR(500) NOT NULL,
  content_en LONGTEXT DEFAULT '',
  content_ar LONGTEXT DEFAULT '',
  content_tr LONGTEXT DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  excerpt_ar TEXT DEFAULT '',
  excerpt_tr TEXT DEFAULT '',
  category_en VARCHAR(255) DEFAULT '',
  category_ar VARCHAR(255) DEFAULT '',
  category_tr VARCHAR(255) DEFAULT '',
  featured_image VARCHAR(500) DEFAULT NULL,
  images JSON DEFAULT NULL,
  tags JSON DEFAULT NULL,
  status ENUM('draft','published','archived') DEFAULT 'draft',
  is_breaking TINYINT(1) DEFAULT 0,
  author_id INT DEFAULT NULL,
  published_at DATETIME DEFAULT NULL,
  meta_title_en VARCHAR(255) DEFAULT '',
  meta_title_ar VARCHAR(255) DEFAULT '',
  meta_title_tr VARCHAR(255) DEFAULT '',
  meta_description_en TEXT DEFAULT '',
  meta_description_ar TEXT DEFAULT '',
  meta_description_tr TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title_en VARCHAR(500) NOT NULL,
  title_ar VARCHAR(500) NOT NULL,
  title_tr VARCHAR(500) NOT NULL,
  slug_en VARCHAR(500) NOT NULL UNIQUE,
  slug_ar VARCHAR(500) NOT NULL,
  slug_tr VARCHAR(500) NOT NULL,
  content_en LONGTEXT DEFAULT '',
  content_ar LONGTEXT DEFAULT '',
  content_tr LONGTEXT DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  excerpt_ar TEXT DEFAULT '',
  excerpt_tr TEXT DEFAULT '',
  start_date DATETIME DEFAULT NULL,
  end_date DATETIME DEFAULT NULL,
  location_en VARCHAR(500) DEFAULT '',
  location_ar VARCHAR(500) DEFAULT '',
  location_tr VARCHAR(500) DEFAULT '',
  is_virtual TINYINT(1) DEFAULT 0,
  registration_url VARCHAR(500) DEFAULT NULL,
  featured_image VARCHAR(500) DEFAULT NULL,
  images JSON DEFAULT NULL,
  tags JSON DEFAULT NULL,
  status ENUM('draft','published','archived') DEFAULT 'draft',
  event_type VARCHAR(100) DEFAULT '',
  author_id INT DEFAULT NULL,
  published_at DATETIME DEFAULT NULL,
  meta_title_en VARCHAR(255) DEFAULT '',
  meta_title_ar VARCHAR(255) DEFAULT '',
  meta_title_tr VARCHAR(255) DEFAULT '',
  meta_description_en TEXT DEFAULT '',
  meta_description_ar TEXT DEFAULT '',
  meta_description_tr TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title_en VARCHAR(500) NOT NULL,
  title_ar VARCHAR(500) NOT NULL,
  title_tr VARCHAR(500) NOT NULL,
  slug_en VARCHAR(500) NOT NULL UNIQUE,
  slug_ar VARCHAR(500) NOT NULL,
  slug_tr VARCHAR(500) NOT NULL,
  content_en LONGTEXT DEFAULT '',
  content_ar LONGTEXT DEFAULT '',
  content_tr LONGTEXT DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  excerpt_ar TEXT DEFAULT '',
  excerpt_tr TEXT DEFAULT '',
  icon VARCHAR(255) DEFAULT NULL,
  sort_order INT DEFAULT 0,
  featured_image VARCHAR(500) DEFAULT NULL,
  images JSON DEFAULT NULL,
  tags JSON DEFAULT NULL,
  status ENUM('draft','published','archived') DEFAULT 'draft',
  author_id INT DEFAULT NULL,
  published_at DATETIME DEFAULT NULL,
  meta_title_en VARCHAR(255) DEFAULT '',
  meta_title_ar VARCHAR(255) DEFAULT '',
  meta_title_tr VARCHAR(255) DEFAULT '',
  meta_description_en TEXT DEFAULT '',
  meta_description_ar TEXT DEFAULT '',
  meta_description_tr TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE publications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title_en VARCHAR(500) NOT NULL,
  title_ar VARCHAR(500) NOT NULL,
  title_tr VARCHAR(500) NOT NULL,
  slug_en VARCHAR(500) NOT NULL UNIQUE,
  slug_ar VARCHAR(500) NOT NULL,
  slug_tr VARCHAR(500) NOT NULL,
  content_en LONGTEXT DEFAULT '',
  content_ar LONGTEXT DEFAULT '',
  content_tr LONGTEXT DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  excerpt_ar TEXT DEFAULT '',
  excerpt_tr TEXT DEFAULT '',
  publication_type VARCHAR(100) DEFAULT '',
  file_url VARCHAR(500) DEFAULT NULL,
  file_size INT DEFAULT NULL,
  is_downloadable TINYINT(1) DEFAULT 0,
  featured_image VARCHAR(500) DEFAULT NULL,
  images JSON DEFAULT NULL,
  tags JSON DEFAULT NULL,
  status ENUM('draft','published','archived') DEFAULT 'draft',
  author_id INT DEFAULT NULL,
  published_at DATETIME DEFAULT NULL,
  meta_title_en VARCHAR(255) DEFAULT '',
  meta_title_ar VARCHAR(255) DEFAULT '',
  meta_title_tr VARCHAR(255) DEFAULT '',
  meta_description_en TEXT DEFAULT '',
  meta_description_ar TEXT DEFAULT '',
  meta_description_tr TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title_en VARCHAR(500) NOT NULL,
  title_ar VARCHAR(500) NOT NULL,
  title_tr VARCHAR(500) NOT NULL,
  slug_en VARCHAR(500) NOT NULL UNIQUE,
  slug_ar VARCHAR(500) NOT NULL,
  slug_tr VARCHAR(500) NOT NULL,
  content_en LONGTEXT DEFAULT '',
  content_ar LONGTEXT DEFAULT '',
  content_tr LONGTEXT DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  excerpt_ar TEXT DEFAULT '',
  excerpt_tr TEXT DEFAULT '',
  project_status VARCHAR(100) DEFAULT 'ongoing',
  start_year INT DEFAULT NULL,
  end_year INT DEFAULT NULL,
  client VARCHAR(255) DEFAULT '',
  featured_image VARCHAR(500) DEFAULT NULL,
  images JSON DEFAULT NULL,
  tags JSON DEFAULT NULL,
  status ENUM('draft','published','archived') DEFAULT 'draft',
  author_id INT DEFAULT NULL,
  published_at DATETIME DEFAULT NULL,
  meta_title_en VARCHAR(255) DEFAULT '',
  meta_title_ar VARCHAR(255) DEFAULT '',
  meta_title_tr VARCHAR(255) DEFAULT '',
  meta_description_en TEXT DEFAULT '',
  meta_description_ar TEXT DEFAULT '',
  meta_description_tr TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE team (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_en VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  name_tr VARCHAR(255) NOT NULL,
  position_en VARCHAR(255) NOT NULL,
  position_ar VARCHAR(255) NOT NULL,
  position_tr VARCHAR(255) NOT NULL,
  bio_en TEXT DEFAULT '',
  bio_ar TEXT DEFAULT '',
  bio_tr TEXT DEFAULT '',
  photo VARCHAR(500) DEFAULT NULL,
  social_links JSON DEFAULT NULL,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE partners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_en VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  name_tr VARCHAR(255) NOT NULL,
  description_en TEXT DEFAULT '',
  description_ar TEXT DEFAULT '',
  description_tr TEXT DEFAULT '',
  logo VARCHAR(500) DEFAULT NULL,
  website VARCHAR(500) DEFAULT NULL,
  category VARCHAR(100) DEFAULT '',
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE faq (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_en TEXT NOT NULL,
  question_ar TEXT NOT NULL,
  question_tr TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  answer_ar TEXT NOT NULL,
  answer_tr TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_en VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  name_tr VARCHAR(255) NOT NULL,
  position_en VARCHAR(255) DEFAULT '',
  position_ar VARCHAR(255) DEFAULT '',
  position_tr VARCHAR(255) DEFAULT '',
  organization_en VARCHAR(255) DEFAULT '',
  organization_ar VARCHAR(255) DEFAULT '',
  organization_tr VARCHAR(255) DEFAULT '',
  quote_en TEXT NOT NULL,
  quote_ar TEXT NOT NULL,
  quote_tr TEXT NOT NULL,
  photo VARCHAR(500) DEFAULT NULL,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE page_content (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_key VARCHAR(255) NOT NULL UNIQUE,
  title_en VARCHAR(500) DEFAULT '',
  title_ar VARCHAR(500) DEFAULT '',
  title_tr VARCHAR(500) DEFAULT '',
  content_en LONGTEXT DEFAULT '',
  content_ar LONGTEXT DEFAULT '',
  content_tr LONGTEXT DEFAULT '',
  status ENUM('draft','published','archived') DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  phone VARCHAR(50) DEFAULT NULL,
  is_read TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE newsletter_subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  is_active TINYINT(1) DEFAULT 1,
  subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at DATETIME DEFAULT NULL
);

CREATE TABLE media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(500) NOT NULL,
  original_name VARCHAR(500) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size BIGINT NOT NULL,
  url VARCHAR(1000) NOT NULL,
  thumbnail_url VARCHAR(1000) DEFAULT NULL,
  alt_en VARCHAR(500) DEFAULT '',
  alt_ar VARCHAR(500) DEFAULT '',
  alt_tr VARCHAR(500) DEFAULT '',
  caption_en TEXT DEFAULT '',
  caption_ar TEXT DEFAULT '',
  caption_tr TEXT DEFAULT '',
  folder VARCHAR(255) DEFAULT 'general',
  uploaded_by INT DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE settings (
  `key` VARCHAR(255) PRIMARY KEY,
  `value` LONGTEXT,
  `group` VARCHAR(100) DEFAULT 'general',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed default admin user (password: Admin@123456)
INSERT INTO users (name, email, password, role) VALUES
('Super Admin', 'admin@alqudsinstitute.org', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'super_admin');
