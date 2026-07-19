CREATE DATABASE volunteer_connect;
USE volunteer_connect;

-- =========================
-- ENUMS
-- =========================
CREATE TYPE user_role AS ENUM ('VOLUNTEER', 'NGO', 'ADMIN');
CREATE TYPE ngo_verification_status AS ENUM ('PENDING', 'VERIFIED', 'REJECTED', 'SUSPENDED');
CREATE TYPE event_status AS ENUM ('PUBLISHED', 'CLOSED', 'COMPLETED', 'CANCELLED');
CREATE TYPE application_status AS ENUM ('SUBMITTED', 'SHORTLISTED', 'APPROVED', 'REJECTED', 'WITHDRAWN');
CREATE TYPE attendance_status AS ENUM ('PENDING', 'PRESENT', 'ABSENT', 'EXCUSED');
CREATE TYPE notification_status AS ENUM ('QUEUED', 'SENT', 'FAILED', 'READ');
CREATE TYPE category_name AS ENUM ('ENVIRONMENT','EDUCATION','HEALTH','FOOD','ANIMAL WELFARE','COMMUNITY');

-- =========================
-- USER / IDENTITY
-- =========================
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE volunteer_profiles (
  volunteer_profile_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
  phone VARCHAR(20),
  city VARCHAR(120),
  bio TEXT,
  skills TEXT,
  interests TEXT,
  profile_image_url VARCHAR(500),                           
  total_verified_hours NUMERIC(8,2) NOT NULL DEFAULT 0 CHECK (total_verified_hours >= 0),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE ngo_profiles (
  ngo_profile_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
  organization_name VARCHAR(180) NOT NULL,
  mission TEXT,
  description TEXT, 
  city VARCHAR(120),
  contact_email VARCHAR(190),
  contact_phone VARCHAR(20),
  logo_url VARCHAR(500),
  verification_status ngo_verification_status NOT NULL DEFAULT 'PENDING',
  verified_at TIMESTAMP NULL,
  verified_by UUID NULL REFERENCES users(user_id),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE admin_profiles (
  admin_profile_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- =========================
-- EVENT MODULE
-- =========================
CREATE TABLE event_categories (
  event_category_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category category_name NOT NULL, 
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE events (
  event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_profile_id UUID NOT NULL REFERENCES ngo_profiles(ngo_profile_id) ON DELETE RESTRICT,
  event_category_id UUID REFERENCES event_categories(event_category_id),
  event_name VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  city VARCHAR(120) NOT NULL,
  address TEXT,
  start_at TIMESTAMP NOT NULL,
  end_at TIMESTAMP NOT NULL,
  capacity INT NOT NULL CHECK (capacity > 0),
  required_skills TEXT,
  banner_url VARCHAR(500),
  status event_status,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now(),
  CHECK (end_at > start_at)
);

-- =========================
-- APPLICATIONS
-- =========================
CREATE TABLE applications (
  application_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(event_id) ON DELETE CASCADE,
  volunteer_user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  status application_status NOT NULL DEFAULT 'SUBMITTED',
  cover_note TEXT,
  submitted_at TIMESTAMP NOT NULL DEFAULT now(),
  decided_at TIMESTAMP NULL,
  decided_by UUID NULL REFERENCES users(user_id),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- =========================
-- NOTIFICATIONS
-- =========================

CREATE TABLE notifications (
  notification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  title VARCHAR(180) NOT NULL,
  message TEXT NOT NULL,
  channel VARCHAR(30) NOT NULL DEFAULT 'IN_APP',
  status notification_status NOT NULL DEFAULT 'QUEUED',
  sent_at TIMESTAMP NULL,
  read_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- =========================
-- INDEXES
-- =========================
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_events_name ON events(event_name);
CREATE INDEX idx_events_city ON events(city);
CREATE INDEX idx_events_category ON events(event_category_id);
CREATE INDEX idx_ngo_verification_status ON ngo_profiles(verification_status);
CREATE INDEX idx_apps_status ON applications(status);
CREATE INDEX idx_apps_event_status ON applications(event_id, status);
CREATE INDEX idx_attendance_event_status ON attendance(event_id, status);
CREATE INDEX idx_notifications_user_created ON notifications(user_id, created_at DESC);
CREATE INDEX idx_audit_resource_created ON audit_logs(target_resource, created_at DESC);