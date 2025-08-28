# Continuous Deployment Setup Guide

## Overview

Forum API V2 menggunakan GitHub Actions untuk Continuous Deployment (CD) ke lingkungan produksi. Tersedia dua opsi deployment:

1. **Vercel Deployment** (Primary) - `cd.yml`
2. **Traditional Server Deployment** (Alternative) - `cd-server.yml`

## Option 1: Vercel Deployment (Recommended)

### Prerequisites

1. **Vercel Account**: Sign up di [vercel.com](https://vercel.com)
2. **Database Cloud**: Setup PostgreSQL di Supabase/Railway/Neon
3. **GitHub Repository**: Project sudah di push ke GitHub

### Setup Steps

1. **Deploy ke Vercel Manual (First Time)**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Login ke Vercel
   vercel login

   # Deploy project
   vercel --prod
   ```

2. **Setup GitHub Secrets**
   
   Di GitHub repository settings > Secrets and variables > Actions, tambahkan:
   
   - `VERCEL_TOKEN`: Personal Access Token dari Vercel
   - `VERCEL_ORG_ID`: Organization ID dari `.vercel/project.json`
   - `VERCEL_PROJECT_ID`: Project ID dari `.vercel/project.json`

3. **Environment Variables di Vercel**
   
   Setup di Vercel dashboard > Project Settings > Environment Variables:
   
   ```env
   NODE_ENV=production
   HOST=0.0.0.0
   PORT=5000
   
   # Database
   PGHOST=your_db_host
   PGUSER=your_db_user
   PGDATABASE=your_db_name
   PGPASSWORD=your_db_password
   PGPORT=5432
   
   # JWT Tokens
   ACCESS_TOKEN_KEY=your_super_secret_access_token_key
   REFRESH_TOKEN_KEY=your_super_secret_refresh_token_key
   ACCESS_TOKEN_AGE=3000
   ```

### Trigger Deployment

CD akan berjalan otomatis ketika ada push ke branch `main` atau `master`.

## Option 2: Traditional Server Deployment

### Prerequisites

1. **VPS/Server**: Ubuntu/CentOS dengan SSH access
2. **Node.js**: Version 18.x atau lebih baru
3. **PostgreSQL**: Database server
4. **PM2**: Process manager untuk Node.js

### Setup Steps

1. **Prepare Server**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2
   sudo npm install -g pm2

   # Install PostgreSQL
   sudo apt-get install postgresql postgresql-contrib

   # Clone repository
   git clone https://github.com/your-username/forum-api-v2.git
   cd forum-api-v2
   ```

2. **Setup Environment**
   ```bash
   # Create .env file
   cp .env.example .env
   # Edit .env dengan konfigurasi production

   # Install dependencies
   npm ci --only=production

   # Run migrations
   npm run migrate up

   # Start with PM2
   pm2 start npm --name "forum-api-v2" -- start
   pm2 save
   pm2 startup
   ```

3. **Setup GitHub Secrets**
   
   Di GitHub repository settings > Secrets and variables > Actions, tambahkan:
   
   - `HOST`: IP address server
   - `USERNAME`: SSH username
   - `SSH_PRIVATE_KEY`: SSH private key
   - `PORT`: SSH port (default: 22)
   - `APP_PATH`: Path ke aplikasi di server (default: ~/forum-api-v2)
   - `PRODUCTION_URL`: URL production untuk health check

### Trigger Deployment

Gunakan manual trigger di GitHub Actions:
1. Go to Actions tab
2. Select "Continuous Deployment (Traditional Server)"
3. Click "Run workflow"
4. Choose environment (production/staging)

## Health Check

Kedua deployment option menyediakan health check endpoint:

```bash
curl https://your-domain.com/health
```

Response:
```json
{
  "status": "success",
  "message": "Server is healthy",
  "timestamp": "2025-08-28T10:00:00.000Z",
  "environment": "production"
}
```

## Monitoring

### Vercel
- Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
- Logs: Real-time di Vercel dashboard
- Analytics: Built-in analytics

### Traditional Server
- PM2 Status: `pm2 status`
- Logs: `pm2 logs forum-api-v2`
- Restart: `pm2 restart forum-api-v2`

## Troubleshooting

### Common Issues

1. **Deployment Gagal**
   - Check GitHub Actions logs
   - Verify secrets configuration
   - Check environment variables

2. **Database Connection Error**
   - Verify database credentials
   - Check network connectivity
   - Ensure database migrations are run

3. **Health Check Gagal**
   - Check server logs
   - Verify port configuration
   - Check firewall settings

### Rollback

#### Vercel
```bash
vercel rollback [deployment-url]
```

#### Traditional Server
```bash
# Revert to previous commit
git reset --hard HEAD~1
pm2 restart forum-api-v2
```

## Best Practices

1. **Always test in staging first**
2. **Use environment-specific configurations**
3. **Monitor deployments actively**
4. **Keep secrets secure and rotate regularly**
5. **Backup database before major deployments**
6. **Use blue-green deployments for zero downtime**

## Support

Jika mengalami masalah dengan deployment, silakan:
1. Check GitHub Actions logs
2. Review dokumentasi ini
3. Create issue di repository GitHub
