# Supabase Setup Guide

## Creating a Supabase Project

### Step 1: Create Account
1. Go to https://supabase.com
2. Sign up with your email or GitHub account
3. Create a new organization (or use existing)

### Step 2: Create Database
1. Click "Create a new project"
2. Project name: `bearfit-conduction-tracker`
3. Database password: Create a strong password (save it securely)
4. Region: Choose closest to your users
5. Click "Create new project" and wait for it to initialize

### Step 3: Run the Schema Migration
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the content from `scripts/01-create-schema.sql`
4. Paste into the SQL editor
5. Click "Run"

The schema is now created with all necessary tables and indexes.

### Step 4: Seed Initial Data (Optional)
1. Go back to SQL Editor
2. Run individual INSERT statements to add coaches and clients:

```sql
INSERT INTO coaches (name, password, branch) VALUES
  ('Coach Jaoquin', 'Jaoquin123', 'Malingap'),
  ('Coach Amiel', 'Amiel123', 'Malingap'),
  ('Coach Hunejin', 'Hunejin123', 'Erod'),
  ('Coach Andrei', 'Andrei123', 'Erod'),
  ('Coach Isaac', 'Isaac123', 'Cainta');
```

### Step 5: Get Connection Details
1. Click **Settings** (bottom left)
2. Go to **Database**
3. Note these values (you'll need them for environment variables):
   - Host
   - Database name
   - User
   - Password

### Step 6: Get API Keys
1. Click **Settings** (bottom left)
2. Go to **API**
3. Copy:
   - Project URL (this is your SUPABASE_URL)
   - anon public key (this is your SUPABASE_ANON_KEY)
   - service_role key (keep this secret!)

## Environment Variables for v0

Add these to your v0 project settings > Vars:
```
SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key
```

## Updating the Context to Use Supabase

In `context/client-context.tsx`, you'll need to:

1. Install Supabase client:
```bash
npm install @supabase/supabase-js
```

2. Replace mock data with database queries:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Load clients from database instead of MOCK_CLIENTS
const loadClients = async () => {
  const { data } = await supabase
    .from('clients')
    .select('*');
  return data;
};
```

## Row Level Security (RLS)

To secure your data, enable RLS policies:

1. In Supabase, go to **Authentication > Policies**
2. For `clients` table, create policies:
   - Allow coaches to see only their clients
   - Allow admins to see all data

Example policy:
```sql
CREATE POLICY "Coaches can view their clients"
ON clients FOR SELECT
USING (coach_id = auth.uid());
```

## Backup & Recovery

Supabase automatically backs up your data. To manually back up:

1. Go to **Settings > Backups**
2. Click "Request backup now"
3. Backups are retained for 7 days

## Monitoring

Check database health:
1. Go to **Statistics** to monitor usage
2. Go to **Database Health** for performance insights
3. Use **Query Performance** to optimize slow queries

## Migrating Data

When ready to migrate from mock data to production:

1. Export your current data as JSON from your v0 app
2. Create SQL INSERT statements or use Supabase's import tool
3. Test thoroughly before going live
