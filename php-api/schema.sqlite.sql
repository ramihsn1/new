-- SQLite schema for local testing
-- Run: sqlite3 database.sqlite < schema.sqlite.sql

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'editor',
  is_active INTEGER DEFAULT 1,
  refresh_token TEXT,
  last_login DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  title_tr TEXT NOT NULL,
  slug_en TEXT NOT NULL UNIQUE,
  slug_ar TEXT NOT NULL,
  slug_tr TEXT NOT NULL,
  content_en TEXT DEFAULT '',
  content_ar TEXT DEFAULT '',
  content_tr TEXT DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  excerpt_ar TEXT DEFAULT '',
  excerpt_tr TEXT DEFAULT '',
  category_en TEXT DEFAULT '',
  category_ar TEXT DEFAULT '',
  category_tr TEXT DEFAULT '',
  featured_image TEXT,
  images TEXT DEFAULT '[]',
  tags TEXT DEFAULT '[]',
  status TEXT DEFAULT 'draft',
  is_breaking INTEGER DEFAULT 0,
  author_id INTEGER,
  published_at DATETIME,
  meta_title_en TEXT DEFAULT '',
  meta_title_ar TEXT DEFAULT '',
  meta_title_tr TEXT DEFAULT '',
  meta_description_en TEXT DEFAULT '',
  meta_description_ar TEXT DEFAULT '',
  meta_description_tr TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  title_tr TEXT NOT NULL,
  slug_en TEXT NOT NULL UNIQUE,
  slug_ar TEXT NOT NULL,
  slug_tr TEXT NOT NULL,
  content_en TEXT DEFAULT '',
  content_ar TEXT DEFAULT '',
  content_tr TEXT DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  excerpt_ar TEXT DEFAULT '',
  excerpt_tr TEXT DEFAULT '',
  start_date DATETIME,
  end_date DATETIME,
  location_en TEXT DEFAULT '',
  location_ar TEXT DEFAULT '',
  location_tr TEXT DEFAULT '',
  is_virtual INTEGER DEFAULT 0,
  registration_url TEXT,
  featured_image TEXT,
  images TEXT DEFAULT '[]',
  tags TEXT DEFAULT '[]',
  status TEXT DEFAULT 'draft',
  event_type TEXT DEFAULT '',
  author_id INTEGER,
  published_at DATETIME,
  meta_title_en TEXT DEFAULT '',
  meta_title_ar TEXT DEFAULT '',
  meta_title_tr TEXT DEFAULT '',
  meta_description_en TEXT DEFAULT '',
  meta_description_ar TEXT DEFAULT '',
  meta_description_tr TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  title_tr TEXT NOT NULL,
  slug_en TEXT NOT NULL UNIQUE,
  slug_ar TEXT NOT NULL,
  slug_tr TEXT NOT NULL,
  content_en TEXT DEFAULT '',
  content_ar TEXT DEFAULT '',
  content_tr TEXT DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  excerpt_ar TEXT DEFAULT '',
  excerpt_tr TEXT DEFAULT '',
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  featured_image TEXT,
  images TEXT DEFAULT '[]',
  tags TEXT DEFAULT '[]',
  status TEXT DEFAULT 'draft',
  author_id INTEGER,
  published_at DATETIME,
  meta_title_en TEXT DEFAULT '',
  meta_title_ar TEXT DEFAULT '',
  meta_title_tr TEXT DEFAULT '',
  meta_description_en TEXT DEFAULT '',
  meta_description_ar TEXT DEFAULT '',
  meta_description_tr TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE publications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  title_tr TEXT NOT NULL,
  slug_en TEXT NOT NULL UNIQUE,
  slug_ar TEXT NOT NULL,
  slug_tr TEXT NOT NULL,
  content_en TEXT DEFAULT '',
  content_ar TEXT DEFAULT '',
  content_tr TEXT DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  excerpt_ar TEXT DEFAULT '',
  excerpt_tr TEXT DEFAULT '',
  publication_type TEXT DEFAULT '',
  file_url TEXT,
  file_size INTEGER,
  is_downloadable INTEGER DEFAULT 0,
  featured_image TEXT,
  images TEXT DEFAULT '[]',
  tags TEXT DEFAULT '[]',
  status TEXT DEFAULT 'draft',
  author_id INTEGER,
  published_at DATETIME,
  meta_title_en TEXT DEFAULT '',
  meta_title_ar TEXT DEFAULT '',
  meta_title_tr TEXT DEFAULT '',
  meta_description_en TEXT DEFAULT '',
  meta_description_ar TEXT DEFAULT '',
  meta_description_tr TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  title_tr TEXT NOT NULL,
  slug_en TEXT NOT NULL UNIQUE,
  slug_ar TEXT NOT NULL,
  slug_tr TEXT NOT NULL,
  content_en TEXT DEFAULT '',
  content_ar TEXT DEFAULT '',
  content_tr TEXT DEFAULT '',
  excerpt_en TEXT DEFAULT '',
  excerpt_ar TEXT DEFAULT '',
  excerpt_tr TEXT DEFAULT '',
  project_status TEXT DEFAULT 'ongoing',
  start_year INTEGER,
  end_year INTEGER,
  client TEXT DEFAULT '',
  featured_image TEXT,
  images TEXT DEFAULT '[]',
  tags TEXT DEFAULT '[]',
  status TEXT DEFAULT 'draft',
  author_id INTEGER,
  published_at DATETIME,
  meta_title_en TEXT DEFAULT '',
  meta_title_ar TEXT DEFAULT '',
  meta_title_tr TEXT DEFAULT '',
  meta_description_en TEXT DEFAULT '',
  meta_description_ar TEXT DEFAULT '',
  meta_description_tr TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE team (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  name_tr TEXT NOT NULL,
  position_en TEXT NOT NULL,
  position_ar TEXT NOT NULL,
  position_tr TEXT NOT NULL,
  bio_en TEXT DEFAULT '',
  bio_ar TEXT DEFAULT '',
  bio_tr TEXT DEFAULT '',
  photo TEXT,
  social_links TEXT DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE partners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  name_tr TEXT NOT NULL,
  description_en TEXT DEFAULT '',
  description_ar TEXT DEFAULT '',
  description_tr TEXT DEFAULT '',
  logo TEXT,
  website TEXT,
  category TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE faq (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_en TEXT NOT NULL,
  question_ar TEXT NOT NULL,
  question_tr TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  answer_ar TEXT NOT NULL,
  answer_tr TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  name_tr TEXT NOT NULL,
  position_en TEXT DEFAULT '',
  position_ar TEXT DEFAULT '',
  position_tr TEXT DEFAULT '',
  organization_en TEXT DEFAULT '',
  organization_ar TEXT DEFAULT '',
  organization_tr TEXT DEFAULT '',
  quote_en TEXT NOT NULL,
  quote_ar TEXT NOT NULL,
  quote_tr TEXT NOT NULL,
  photo TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE page_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_key TEXT NOT NULL UNIQUE,
  title_en TEXT DEFAULT '',
  title_ar TEXT DEFAULT '',
  title_tr TEXT DEFAULT '',
  content_en TEXT DEFAULT '',
  content_ar TEXT DEFAULT '',
  content_tr TEXT DEFAULT '',
  status TEXT DEFAULT 'draft',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  phone TEXT,
  is_read INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE newsletter_subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  is_active INTEGER DEFAULT 1,
  subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at DATETIME
);

CREATE TABLE media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  alt_en TEXT DEFAULT '',
  alt_ar TEXT DEFAULT '',
  alt_tr TEXT DEFAULT '',
  caption_en TEXT DEFAULT '',
  caption_ar TEXT DEFAULT '',
  caption_tr TEXT DEFAULT '',
  folder TEXT DEFAULT 'general',
  uploaded_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE settings (
  setting_key TEXT PRIMARY KEY,
  value TEXT,
  grp TEXT DEFAULT 'general',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, role) VALUES
('Super Admin', 'admin@alqudsinstitute.org', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'super_admin');
