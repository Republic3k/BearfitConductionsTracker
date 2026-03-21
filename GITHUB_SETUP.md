# GitHub Setup Guide

## Connecting to GitHub

### Step 1: Create a GitHub Repository
1. Go to https://github.com/new
2. Repository name: `bearfit-conduction-tracker`
3. Description: `Coach dashboard for managing client sessions and payments`
4. Make it Public or Private (your preference)
5. Click "Create repository"

### Step 2: Connect to v0
1. In v0, click the **Settings** button (top right)
2. Go to the **Git** section
3. Click "Connect GitHub Repository"
4. Authorize v0 to access your GitHub account
5. Select your new repository
6. Choose the branch (typically "main")

### Step 3: Initial Commit
After connecting, v0 will automatically push all your code to GitHub. You'll see a notification confirming the connection.

## Pushing Updates
- All changes made in v0 are automatically committed and pushed to your connected GitHub branch
- You can view commit history in the v0 Settings > Git menu
- Use GitHub to manage pull requests, code reviews, and team collaboration

## Team Collaboration
Once connected, your team can:
1. Clone the repository locally
2. Make changes and push to different branches
3. Create pull requests for review
4. Merge changes back to main

## Environment Variables
Store sensitive data (API keys, database passwords) in GitHub Secrets:
1. Go to repository Settings > Secrets and variables > Actions
2. Click "New repository secret"
3. Add secrets like `SUPABASE_URL`, `SUPABASE_KEY`, etc.

## Deployment
This project can be easily deployed to Vercel:
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure environment variables
4. Click Deploy

Your app will automatically redeploy when you push to your main branch.
