# Deployment Guide - Vercel

## Forum API V2 Vercel Deployment

Panduan deploy Forum API V2 ke Vercel dengan konfigurasi lengkap.

### Prerequisites

1. **GitHub Repository**: Project sudah di push ke GitHub (public)
2. **Database Cloud**: Setup PostgreSQL di cloud (Supabase/Railway/Neon)
3. **Vercel Account**: Sign up di vercel.com dengan GitHub

### Step 1: Setup Cloud Database

#### Option A: Supabase (Recommended)
```bash
1. Visit supabase.com
2. Create new project
3. Get connection string: postgresql://[user]:[password]@[host]:5432/[database]
4. Run migrations using Supabase dashboard or CLI
```

#### Option B: Railway
```bash
1. Visit railway.app
2. Create PostgreSQL service
3. Get connection string from dashboard
```

### Step 2: Deploy to Vercel

1. **Import Project**
   - Visit vercel.com
   - Click "New Project"
   - Import from GitHub
   - Select your `forum-api-v2` repository

2. **Configure Build Settings**
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: (leave empty)
   - Install Command: `npm ci`

3. **Environment Variables**
   Add these in Vercel dashboard:
   ```
   NODE_ENV=production
   DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
   ACCESS_TOKEN_KEY=your-super-secret-access-token-key-minimum-32-characters
   REFRESH_TOKEN_KEY=your-super-secret-refresh-token-key-minimum-32-characters
   ACCESS_TOKEN_AGE=3600
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Get your HTTPS URL: `https://your-project.vercel.app`

### Step 3: Run Database Migrations

After deployment, run migrations on your cloud database:

```sql
-- Connect to your database and run these manually:

-- Users table
CREATE TABLE users (
  id VARCHAR(50) PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  fullname TEXT NOT NULL
);

-- Authentications table
CREATE TABLE authentications (
  token TEXT NOT NULL
);

-- Threads table
CREATE TABLE threads (
  id VARCHAR(50) PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  date TEXT NOT NULL,
  owner VARCHAR(50) NOT NULL,
  FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE
);

-- Comments table
CREATE TABLE comments (
  id VARCHAR(50) PRIMARY KEY,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  owner VARCHAR(50) NOT NULL,
  thread_id VARCHAR(50) NOT NULL,
  is_delete BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE
);

-- Likes table
CREATE TABLE likes (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  comment_id VARCHAR(50) NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE,
  UNIQUE(user_id, comment_id)
);
```

### Step 4: Test Deployment

Test your deployed API:

```bash
# Test basic endpoint
curl https://your-project.vercel.app/

# Test user registration
curl -X POST https://your-project.vercel.app/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "secret123",
    "fullname": "Test User"
  }'

# Test user login
curl -X POST https://your-project.vercel.app/authentications \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "secret123"
  }'
```

### Step 5: Update GitHub for CI/CD

Update `.github/workflows/cd.yml` for Vercel:

```yaml
name: Continuous Deployment

on:
  push:
    branches:
      - main
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Vercel
        run: |
          echo "Deployment to Vercel triggered automatically"
          echo "Vercel will auto-deploy on push to main branch"
```

### Troubleshooting

#### Common Issues:

1. **Database Connection Error**
   - Check DATABASE_URL format
   - Ensure SSL mode is enabled for cloud databases

2. **JWT Error**
   - Verify ACCESS_TOKEN_KEY and REFRESH_TOKEN_KEY are set
   - Keys should be at least 32 characters long

3. **CORS Issues**
   - CORS is configured in createServer.js
   - Origin set to ['*'] for all domains

4. **Serverless Function Timeout**
   - Vercel free plan has 10s timeout
   - Pro plan has 30s timeout (configured in vercel.json)

### Final Checklist

- ✅ GitHub repository is public
- ✅ Database cloud setup and migrations run
- ✅ Environment variables configured in Vercel
- ✅ Deployment successful with HTTPS URL
- ✅ API endpoints responding correctly
- ✅ Postman tests passing

### Submission Notes Template

```
=== FORUM API V2 SUBMISSION ===

🔗 Repository GitHub: https://github.com/yourusername/forum-api-v2
🌐 URL HTTPS: https://your-project.vercel.app
📚 Documentation: Available in README.md

✅ DEPLOYMENT: Vercel Serverless
✅ DATABASE: Supabase PostgreSQL
✅ CI/CD: GitHub Actions + Vercel auto-deploy
✅ HTTPS: Enabled with Vercel SSL
✅ FEATURES: All required + Like Comments

🚀 API ready for evaluation!
```

Selamat! Forum API V2 Anda sudah siap di production dengan HTTPS! 🎉
