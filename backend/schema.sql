-- ==========================================
-- DIGITAL CREATORS HUB DATABASE SCHEMA
-- ==========================================

DROP TABLE IF EXISTS admin_users;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS portfolio;
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS contact_messages;

-- ==========================================
-- ADMIN USERS
-- ==========================================

CREATE TABLE admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- ==========================================
-- SERVICES
-- ==========================================

DROP TABLE IF EXISTS services;

CREATE TABLE services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    image TEXT,
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- PORTFOLIO
-- ==========================================

DROP TABLE IF EXISTS portfolio;

CREATE TABLE portfolio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT,
    project_url TEXT,
    featured TEXT DEFAULT 'No',
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- TESTIMONIALS
-- ==========================================

DROP TABLE IF EXISTS testimonials;

CREATE TABLE testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_name TEXT NOT NULL,
    company TEXT NOT NULL,
    designation TEXT,
    review TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    image TEXT,
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- CONTACT MESSAGES
-- ==========================================

DROP TABLE IF EXISTS contact_messages;

CREATE TABLE contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'New',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 