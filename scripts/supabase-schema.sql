-- Supabase Database Schema for Session Tracking System
-- Execute this to set up the database structure

-- Create coaches table
CREATE TABLE IF NOT EXISTS coaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  branch VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  qr_code VARCHAR(255) UNIQUE NOT NULL,
  package_type VARCHAR(50) NOT NULL CHECK (package_type IN ('Full 48', 'Full 24', 'Staggered 48', 'Staggered 24')),
  remaining_balance INTEGER NOT NULL DEFAULT 0,
  starting_balance INTEGER,
  coach_id UUID NOT NULL REFERENCES coaches(id) ON DELETE CASCADE,
  branch VARCHAR(100) NOT NULL,
  payment_status VARCHAR(255),
  is_inactive BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create payment_records table
CREATE TABLE IF NOT EXISTS payment_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  date TIMESTAMP NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'paid', 'overdue')),
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create session_records table
CREATE TABLE IF NOT EXISTS session_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  session_type VARCHAR(50) NOT NULL CHECK (session_type IN ('Cardio', 'Weights', 'Pilates')),
  session_date TIMESTAMP NOT NULL,
  coach_id UUID NOT NULL REFERENCES coaches(id),
  branch VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_clients_coach_id ON clients(coach_id);
CREATE INDEX idx_clients_branch ON clients(branch);
CREATE INDEX idx_clients_is_inactive ON clients(is_inactive);
CREATE INDEX idx_payment_records_client_id ON payment_records(client_id);
CREATE INDEX idx_session_records_client_id ON session_records(client_id);
CREATE INDEX idx_session_records_coach_id ON session_records(coach_id);
CREATE INDEX idx_session_records_date ON session_records(session_date);
