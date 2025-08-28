# Forum API V2

Forum API adalah sebuah RESTful API yang dibangun menggunakan Node.js dan Hapi Framework dengan menerapkan prinsip Clean Architecture. API ini menyediakan fitur autentikasi, manajemen thread, komentar, dan fitur like pada komentar.

## Submission Information

- **Repository URL**: https://github.com/rahmatez/forum-api-v2
- **Deployed API URL**: https://forum-api-v2.vercel.app/

## Fitur

### Fitur Utama

- **Autentikasi**: Registrasi user, login, logout, dan refresh token
- **Thread Management**: Membuat dan melihat detail thread
- **Comment Management**: Menambah, menghapus, dan melihat komentar pada thread
- **Like System**: Menyukai dan batal menyukai komentar (fitur opsional)

### Fitur Keamanan

- **Rate Limiting**: Membatasi request pada endpoint `/threads` sebanyak 90 request per menit
- **HTTPS**: Akses API melalui protokol HTTPS
- **JWT Authentication**: Menggunakan JSON Web Token untuk autentikasi

## Teknologi

- **Runtime**: Node.js
- **Framework**: Hapi.js
- **Database**: PostgreSQL
- **Authentication**: JWT (@hapi/jwt)
- **Password Hashing**: bcrypt
- **Testing**: Jest
- **CI/CD**: GitHub Actions
- **Reverse Proxy**: NGINX

## Clean Architecture

Project ini mengimplementasikan Clean Architecture dengan struktur:

```
src/
├── Applications/          # Use Cases & Security Abstractions
│   ├── security/
│   └── use_case/
├── Commons/              # Shared utilities & exceptions
│   └── exceptions/
├── Domains/              # Business Logic & Entities
│   ├── authentications/
│   ├── comments/
│   ├── likes/
│   ├── threads/
│   └── users/
├── Infrastructures/      # External interfaces
│   ├── database/
│   ├── http/
│   ├── repository/
│   └── security/
└── Interfaces/           # HTTP API Routes & Handlers
    └── http/api/
```

## API Endpoints

### Authentication

- `POST /users` - Registrasi user baru
- `POST /authentications` - Login user
- `PUT /authentications` - Refresh access token
- `DELETE /authentications` - Logout user

### Threads

- `POST /threads` - Membuat thread baru (requires auth)
- `GET /threads/{threadId}` - Melihat detail thread

### Comments

- `POST /threads/{threadId}/comments` - Menambah komentar (requires auth)
- `DELETE /threads/{threadId}/comments/{commentId}` - Menghapus komentar (requires auth)

### Likes (Opsional)

- `PUT /threads/{threadId}/comments/{commentId}/likes` - Like/unlike komentar (requires auth)

## Installation

1. Clone repository

```bash
git clone <repository-url>
cd forum-api-v2
```

2. Install dependencies

```bash
npm install
```

3. Setup environment variables

```bash
cp .env.example .env
# Edit .env file dengan konfigurasi database dan JWT keys
```

4. Setup database

```bash
# Create database
createdb forum_api_v2
createdb forum_api_v2_test

# Run migrations
npm run migrate
npm run migrate:test
```

## Usage

### Development

```bash
npm run start:dev
```

### Production

```bash
npm start
```

### Testing

```bash
# Run all tests
npm test

# Run tests with watch mode
npm run test:watch
```

## CI/CD Implementation

### Continuous Integration (CI)

- ✅ **Automated Testing**: Testing otomatis pada setiap pull request
- ✅ **Multiple Node.js Versions**: Support Node.js 18.x dan 20.x
- ✅ **Database Testing**: PostgreSQL service containers untuk testing
- ✅ **Code Coverage**: Integrasi dengan Codecov untuk coverage reporting
- ✅ **Linting & Formatting**: ESLint untuk code quality

**Workflow**: `.github/workflows/ci.yml`

### Continuous Deployment (CD)

- ✅ **Production Deployment**: Otomatis deploy ke Vercel saat push ke branch main
- ✅ **Health Checks**: Endpoint `/health` untuk monitoring deployment
- ✅ **Multiple Deployment Options**: Support Vercel dan traditional server deployment
- ✅ **Environment Management**: Automated environment variable configuration
- ✅ **Rollback Capability**: Easy rollback untuk deployment yang gagal

**Workflows**: 
- `.github/workflows/cd.yml` (Vercel deployment)
- `.github/workflows/cd-server.yml` (Traditional server deployment)

**Production URL**: https://forum-api-v2.vercel.app/

### Deployment Features

1. **Zero Downtime Deployment**: Menggunakan Vercel's serverless infrastructure
2. **Automatic SSL**: HTTPS enabled by default
3. **Global CDN**: Fast response times worldwide
4. **Auto Scaling**: Handle traffic spikes automatically
5. **Real-time Monitoring**: Built-in analytics and logging

**Setup Guide**: Lihat [CD_SETUP.md](./CD_SETUP.md) untuk panduan lengkap setup deployment.

### Continuous Deployment

- Otomatis deployment ke server pada push ke branch main
- Deployment ke EC2 instance menggunakan SSH
- Environment production dengan HTTPS dan rate limiting

## Rate Limiting

API menerapkan rate limiting pada endpoint `/threads` dan semua path di dalamnya:

- Limit: 90 request per menit per IP address
- Menggunakan NGINX untuk implementasi rate limiting

## HTTPS Configuration

API wajib diakses melalui HTTPS untuk keamanan:

- Menggunakan SSL/TLS certificate
- Konfigurasi NGINX dengan security headers
- Redirect otomatis dari HTTP ke HTTPS

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id VARCHAR(50) PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  fullname TEXT NOT NULL
);
```

### Threads Table

```sql
CREATE TABLE threads (
  id VARCHAR(50) PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  date TEXT NOT NULL,
  owner VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE
);
```

### Comments Table

```sql
CREATE TABLE comments (
  id VARCHAR(50) PRIMARY KEY,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  owner VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
  thread_id VARCHAR(50) REFERENCES threads(id) ON DELETE CASCADE,
  is_delete BOOLEAN DEFAULT FALSE
);
```

### Likes Table (Opsional)

```sql
CREATE TABLE likes (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) REFERENCES users(id) ON DELETE CASCADE,
  comment_id VARCHAR(50) REFERENCES comments(id) ON DELETE CASCADE,
  UNIQUE(user_id, comment_id)
);
```

## Testing

Project menggunakan Jest untuk testing dengan coverage:

- Unit Test untuk entities dan use cases
- Integration Test untuk repository
- Functional Test untuk HTTP endpoints

## Environment Variables

```env
# Server Configuration
HOST=localhost
PORT=5000

# Database Configuration
PGHOST=localhost
PGUSER=postgres
PGDATABASE=forum_api_v2
PGPASSWORD=your_password
PGPORT=5432

# Test Database Configuration
PGHOST_TEST=localhost
PGUSER_TEST=postgres
PGDATABASE_TEST=forum_api_v2_test
PGPASSWORD_TEST=your_password
PGPORT_TEST=5432

# JWT Configuration
ACCESS_TOKEN_KEY=your_access_token_key
REFRESH_TOKEN_KEY=your_refresh_token_key
ACCESS_TOKEN_AGE=3000
```

## Postman Testing

Collection dan Environment untuk testing sudah disediakan:

- `Forum API V2 Test.postman_collection.json`
- `Forum API V2 Test.postman_environment.json`

Import kedua file tersebut ke Postman untuk testing API.

## Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the ISC License.
# Test CI/CD Pipeline
