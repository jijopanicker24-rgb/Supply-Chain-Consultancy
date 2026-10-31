-- Insights Consultancy database schema (PostgreSQL).
-- Safe to run repeatedly: every object is created only if it does not exist yet.

CREATE TABLE IF NOT EXISTS admin_users (
  id            SERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name     TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services (
  id                SERIAL PRIMARY KEY,
  slug              TEXT NOT NULL UNIQUE,
  title             TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description  TEXT NOT NULL,
  icon              TEXT,
  benefits          TEXT[] NOT NULL DEFAULT '{}',
  display_order     INTEGER NOT NULL DEFAULT 0,
  is_active         BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS industries (
  id             SERIAL PRIMARY KEY,
  slug           TEXT NOT NULL UNIQUE,
  name           TEXT NOT NULL,
  description    TEXT NOT NULL,
  key_challenges TEXT[] NOT NULL DEFAULT '{}',
  icon           TEXT,
  display_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS case_studies (
  id              SERIAL PRIMARY KEY,
  slug            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  client_name     TEXT NOT NULL,
  industry_id     INTEGER REFERENCES industries (id) ON DELETE SET NULL,
  challenge       TEXT NOT NULL,
  solution        TEXT NOT NULL,
  results         TEXT NOT NULL,
  metric_label    TEXT,
  metric_value    TEXT,
  cover_image_url TEXT,
  published_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_featured     BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS insights (
  id              SERIAL PRIMARY KEY,
  slug            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  excerpt         TEXT NOT NULL,
  content         TEXT NOT NULL,
  category        TEXT NOT NULL CHECK (category IN ('Demand Planning', 'Inventory', 'Logistics', 'Procurement', 'Technology', 'Sustainability')),
  author_name     TEXT NOT NULL,
  read_minutes    INTEGER NOT NULL DEFAULT 5 CHECK (read_minutes > 0),
  cover_image_url TEXT,
  published_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_published    BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS testimonials (
  id          SERIAL PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_role TEXT,
  company     TEXT,
  quote       TEXT NOT NULL UNIQUE,
  rating      INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  is_active   BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS consultation_bookings (
  id             SERIAL PRIMARY KEY,
  full_name      TEXT NOT NULL,
  email          TEXT NOT NULL,
  phone          TEXT NOT NULL,
  company        TEXT NOT NULL,
  industry_id    INTEGER REFERENCES industries (id) ON DELETE SET NULL,
  service_id     INTEGER REFERENCES services (id) ON DELETE SET NULL,
  company_size   TEXT,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  message        TEXT,
  status         TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'cancelled')),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id         SERIAL PRIMARY KEY,
  full_name  TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  company    TEXT,
  subject    TEXT,
  message    TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS job_openings (
  id              SERIAL PRIMARY KEY,
  slug            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  department      TEXT NOT NULL,
  location        TEXT NOT NULL,
  employment_type TEXT NOT NULL CHECK (employment_type IN ('Full-time', 'Part-time', 'Contract')),
  description     TEXT NOT NULL,
  requirements    TEXT[] NOT NULL DEFAULT '{}',
  is_open         BOOLEAN NOT NULL DEFAULT true,
  posted_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS job_applications (
  id             SERIAL PRIMARY KEY,
  job_opening_id INTEGER NOT NULL REFERENCES job_openings (id) ON DELETE CASCADE,
  full_name      TEXT NOT NULL,
  email          TEXT NOT NULL,
  phone          TEXT,
  linkedin_url   TEXT,
  cover_letter   TEXT,
  status         TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'shortlisted', 'rejected')),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id            SERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_active     BOOLEAN NOT NULL DEFAULT true
);

-- Slug columns are already indexed by their UNIQUE constraints.
CREATE INDEX IF NOT EXISTS case_studies_industry_idx      ON case_studies (industry_id);
CREATE INDEX IF NOT EXISTS case_studies_featured_idx      ON case_studies (is_featured, published_at DESC);
CREATE INDEX IF NOT EXISTS insights_published_idx         ON insights (is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS insights_category_idx          ON insights (category);
CREATE INDEX IF NOT EXISTS bookings_status_idx            ON consultation_bookings (status);
CREATE INDEX IF NOT EXISTS bookings_created_idx           ON consultation_bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS contact_status_idx             ON contact_messages (status);
CREATE INDEX IF NOT EXISTS contact_created_idx            ON contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS job_openings_open_idx          ON job_openings (is_open, posted_at DESC);
CREATE INDEX IF NOT EXISTS job_applications_job_idx       ON job_applications (job_opening_id);
CREATE INDEX IF NOT EXISTS job_applications_status_idx    ON job_applications (status);
CREATE INDEX IF NOT EXISTS job_applications_created_idx   ON job_applications (created_at DESC);
CREATE INDEX IF NOT EXISTS newsletter_subscribed_idx      ON newsletter_subscribers (subscribed_at DESC);
