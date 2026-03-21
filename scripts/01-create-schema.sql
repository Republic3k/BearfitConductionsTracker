-- Create enum types
CREATE TYPE package_type AS ENUM ('Full 48', 'Full 24', 'Staggered 48', 'Staggered 24');
CREATE TYPE session_type AS ENUM ('Cardio', 'Weights', 'Pilates');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'overdue');

-- Create coaches table
CREATE TABLE coaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  branch VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(name)
);

-- Create clients table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  qr_code VARCHAR(255) NOT NULL,
  package_type package_type NOT NULL,
  remaining_balance INTEGER NOT NULL,
  starting_balance INTEGER,
  coach_id UUID REFERENCES coaches(id) ON DELETE SET NULL,
  branch VARCHAR(255) NOT NULL,
  payment_status VARCHAR(255),
  is_inactive BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(qr_code)
);

-- Create sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  type session_type NOT NULL,
  date TIMESTAMPTZ DEFAULT NOW(),
  coach_id UUID REFERENCES coaches(id) ON DELETE SET NULL,
  branch VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create payment_records table
CREATE TABLE payment_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  date TIMESTAMPTZ DEFAULT NOW(),
  amount INTEGER NOT NULL,
  status payment_status DEFAULT 'pending',
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_clients_coach_id ON clients(coach_id);
CREATE INDEX idx_clients_branch ON clients(branch);
CREATE INDEX idx_sessions_client_id ON sessions(client_id);
CREATE INDEX idx_sessions_coach_id ON sessions(coach_id);
CREATE INDEX idx_sessions_date ON sessions(date);
CREATE INDEX idx_payment_records_client_id ON payment_records(client_id);
CREATE INDEX idx_payment_records_date ON payment_records(date);
