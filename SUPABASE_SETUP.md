# 🚀 Supabase Database Setup Guide

## 📋 Overview
This guide will help you configure your anime community platform to use Supabase as the database instead of local SQLite.

## 🔧 Step 1: Get Your Supabase Credentials

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Create or Select a Project**
3. **Get Required Credentials**:

   ### From Settings > API:
   - **Project URL**: `https://your-project-ref.supabase.co`
   - **Service Role Key**: `eyJ...` (long secret key)

   ### From Settings > Database:
   - **Connection String**: `postgresql://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres`

## 🔧 Step 2: Configure Environment Variables

Edit your `backend/SUPABASE_CONFIG.txt` file and replace the placeholders:

```bash
# Database Configuration - Supabase PostgreSQL
DATABASE_URL="postgresql://postgres:YOUR-ACTUAL-PASSWORD@db.YOUR-PROJECT-REF.supabase.co:5432/postgres"

# Supabase Configuration
SUPABASE_URL="https://YOUR-PROJECT-REF.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="YOUR-ACTUAL-SERVICE-ROLE-KEY"

# JWT Secret (generate a secure random string)
JWT_SECRET="your-secure-jwt-secret-here"
JWT_EXPIRES_IN="7d"

# Bcrypt Configuration
BCRYPT_SALT_ROUNDS="12"

# Server Configuration
PORT=5000
NODE_ENV=development
```

## 🔧 Step 3: Setup Database

After configuring your environment variables, run these commands:

```bash
# Navigate to backend directory
cd backend

# Generate Prisma client for PostgreSQL
npm run db:generate

# Push schema to Supabase
npm run db:push

# (Optional) Create admin user
npm run db:seed
```

## 🔧 Step 4: Verify Setup

Run the setup helper to verify everything is configured:

```bash
node configure-supabase.js
```

## 🎯 What This Does

- ✅ Converts database from SQLite to PostgreSQL (Supabase)
- ✅ Updates Prisma schema for PostgreSQL compatibility
- ✅ Installs required PostgreSQL provider
- ✅ Configures environment variables
- ✅ Pushes complete schema including:
  - Users with role-based permissions
  - Posts and comments with moderation
  - Watchlist and favorites
  - Ratings and reviews
  - Reports and warnings system
  - Notifications
  - Audit logs

## 🚨 Important Notes

1. **Security**: Never commit your `.env` file to version control
2. **Service Role Key**: Has admin privileges - keep it secure
3. **Database URL**: Contains your database password
4. **JWT Secret**: Use a strong, random string

## 🛠️ Troubleshooting

### Connection Issues
```bash
# Test Supabase connection
node -e "require('./supabaseClient.js').testConnection()"
```

### Schema Issues
```bash
# Reset and push schema again
npx prisma db push --force-reset
```

### Regenerate Client
```bash
# Regenerate Prisma client
npm run db:generate
```

## 📊 Database Schema Summary

Your Supabase database will include these tables:
- `users` - User accounts with roles
- `posts` - Community posts and discussions
- `comments` - Comments and replies
- `watchlist_items` - User watchlists
- `favourites` - User favorites
- `watch_history` - Episode viewing history
- `ratings` - Anime ratings and reviews
- `post_likes` - Post engagement
- `comment_likes` - Comment engagement
- `moderation_logs` - Audit trail
- `reports` - User reports
- `user_warnings` - Warning system
- `notifications` - User notifications

## 🎉 Next Steps

Once setup is complete:
1. Start your backend server: `npm run dev`
2. Test the API endpoints
3. Create your admin account
4. Start using the enhanced moderation system!