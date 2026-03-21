# Supabase Integration Guide

This guide explains how to set up the database for the Session Tracking System in Supabase.

## Setup Steps

### 1. Create Database Tables
Run the SQL from `supabase-schema.sql` in your Supabase SQL Editor:
- Creates `coaches` table
- Creates `clients` table
- Creates `payment_records` table
- Creates `session_records` table
- Creates necessary indexes for performance

### 2. Insert Base Data
Run the SQL from `supabase-data.sql` to populate the coaches and client data.

### 3. Import JSON Data (Alternative)
Use the JSON files in Supabase's dashboard to import data:
- `coaches_hunejin_data.json` - Coach Hunejin's complete client data

## Database Schema

### Coaches Table
- `id`: UUID (Primary Key)
- `name`: String (Unique)
- `password_hash`: String (bcrypt hashed passwords)
- `branch`: String (Malingap, Erod, Cainta)
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Clients Table
- `id`: UUID (Primary Key)
- `name`: String
- `qr_code`: String (Unique)
- `package_type`: String (Full 48, Full 24, Staggered 48, Staggered 24)
- `remaining_balance`: Integer
- `starting_balance`: Integer (nullable)
- `coach_id`: UUID (Foreign Key to coaches)
- `branch`: String
- `payment_status`: String
- `is_inactive`: Boolean
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Payment Records Table
- `id`: UUID (Primary Key)
- `client_id`: UUID (Foreign Key to clients)
- `date`: Timestamp
- `amount`: Decimal
- `status`: String (pending, paid, overdue)
- `note`: Text (optional)
- `created_at`: Timestamp

### Session Records Table
- `id`: UUID (Primary Key)
- `client_id`: UUID (Foreign Key to clients)
- `session_type`: String (Cardio, Weights, Pilates)
- `session_date`: Timestamp
- `coach_id`: UUID (Foreign Key to coaches)
- `branch`: String
- `created_at`: Timestamp

## Coach Statistics

### Coach Hunejin (Erod Branch)
- **Total Clients**: 14
- **Active Clients**: 12
- **Inactive Clients**: 2 (Bel, Julie)
- **Total Sessions Recorded**: 31
  - Cardio: 11 sessions
  - Weights: 11 sessions
  - Pilates: 9 sessions

### Coach Joaquin (Malingap Branch)
- **Total Clients**: 36+ (from previous data)
- Multiple package types (Staggered 24, Full 24, Full 48)

## Session Summary Data

### Coach Hunejin - Sessions by Day (Week of Mar 2-21, 2024)
- **Mar 2**: Jensine, Steph = 2 sessions
- **Mar 3**: Victor, Starsky = 2 sessions
- **Mar 4**: Dulce, Christine = 2 sessions
- **Mar 5**: Victor = 1 session
- **Mar 6**: Jensine, Bea = 2 sessions
- **Mar 7**: Dulce, Christine = 2 sessions
- **Mar 9**: Steph, Starsky = 2 sessions
- **Mar 10**: Jensine, Lexi = 2 sessions
- **Mar 11**: Pat, Dulce, Christine, Lexi, Starsky = 5 sessions
- **Mar 12**: Jensine, Victor, Pat = 3 sessions
- **Mar 17**: Victor, Pat = 2 sessions
- **Mar 18**: Dulce, Dianne = 2 sessions
- **Mar 19**: Jensine, Pat = 2 sessions

**Total Week Sessions (Mar 2-21)**: 31 sessions
**Average per day**: ~2.4 sessions

## Implementation Notes

1. **Authentication**: The admin password is "AdminPassword123" (store securely in environment variables)
2. **Password Hashing**: Store coach passwords as bcrypt hashes, not plain text
3. **Session Tracking**: Each session deducts 1 from client's remaining balance
4. **Inactive Clients**: Set `is_inactive = true` for completed/paused clients
5. **Branch Organization**: Filter coaches and clients by branch for multi-location support

## API Queries Example

```sql
-- Get sessions by coach for a specific day
SELECT sr.*, c.name as client_name 
FROM session_records sr
JOIN clients c ON sr.client_id = c.id
JOIN coaches co ON sr.coach_id = co.id
WHERE co.name = 'Coach Hunejin' 
AND DATE(sr.session_date) = '2024-03-02'
ORDER BY sr.session_date;

-- Get coach statistics for the week
SELECT 
  co.name,
  COUNT(DISTINCT sr.id) as session_count,
  DATE_TRUNC('week', sr.session_date) as week
FROM session_records sr
JOIN coaches co ON sr.coach_id = co.id
WHERE sr.session_date >= NOW() - INTERVAL '7 days'
GROUP BY co.id, DATE_TRUNC('week', sr.session_date);

-- Get client payment status
SELECT 
  c.name,
  c.package_type,
  c.remaining_balance,
  c.payment_status,
  COUNT(sr.id) as sessions_completed
FROM clients c
LEFT JOIN session_records sr ON c.id = sr.client_id
WHERE c.coach_id = (SELECT id FROM coaches WHERE name = 'Coach Hunejin')
GROUP BY c.id;
```
