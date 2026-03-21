# Bearfit Conduction Tracker

Professional coach dashboard for managing client sessions, payments, and fitness tracking.

## Features

✅ Secure coach login with passwords
✅ Color-coded client cards by package type
✅ Session tracking with automatic balance deduction
✅ Payment management with smart reminders
✅ QR code scanner for quick client lookup
✅ Daily/Weekly/Monthly session reports
✅ Package type filtering (Staggered 24, Full 24, Full 48, Staggered 48)
✅ Session type filtering (Cardio, Weights, Pilates)
✅ Responsive design for all devices

## Quick Start

### Test Login
- **Coach:** Coach Jaoquin
- **Password:** Jaoquin123

Other coaches: Coach Amiel, Coach Hunejin, Coach Andrei, Coach Isaac (same format: CoachName123)

### Local Development
```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Project Structure

- `/app` - Next.js app directory
- `/components` - React components (login, dashboard, cards, modals)
- `/context` - React Context for state management
- `/scripts` - Database migration SQL
- `/public` - Static assets

## Key Components

- **coach-login.tsx** - Authentication
- **staff-dashboard.tsx** - Main dashboard
- **client-card-minimized.tsx** - Expandable client cards
- **session-modal.tsx** - Log session dialog
- **payment-editor.tsx** - Edit payment status
- **report-generator.tsx** - Generate reports
- **client-filters.tsx** - Color-coded toggles

## Setup Guides

1. **GitHub** - See GITHUB_SETUP.md
2. **Supabase** - See SUPABASE_SETUP.md
3. **Implementation** - See IMPLEMENTATION_CHECKLIST.md

## Production Ready

Database schema ready in `/scripts/01-create-schema.sql`
Environment variables needed for Supabase integration
Deploy to Vercel from GitHub

## Color Coding

- 🟠 Staggered 24 (Orange)
- 🔵 Full 24 (Blue)
- 🟣 Full 48 (Purple)
- 🟢 Staggered 48 (Green)

## Data Included

36 clients for Coach Jaoquin with:
- Full session history from March 2-21
- Payment records
- Payment status tracking
- Package types and balances

Ready for Supabase migration!
