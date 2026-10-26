# Permis Maroc API (Laravel)

Laravel Sanctum SPA cookie authentication backend for [permis-maroc.com](https://permis-maroc.com).

## Requirements

- Docker (MySQL) **or** a local MySQL 8+
- PHP 8.3+ / Composer on the host (default), or Docker profile `api`

## Quick start (Docker MySQL + host PHP)

From the repository root:

```bash
cp .env.docker.example .env   # optional compose overrides
docker compose up -d          # MySQL on localhost:3306

cd backend
cp .env.example .env          # if needed
php artisan key:generate
php artisan migrate
php artisan serve             # http://localhost:8000
```

Default DB credentials (`.env.docker.example`):

| Variable | Value |
|----------|--------|
| Database | `permis_maroc` |
| User     | `permis` |
| Password | `secret` |
| Port     | `3306` |

Frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

```bash
docker compose down
```

### Optional: API container

```bash
docker compose --profile api up -d --build
```

## Auth architecture

- First-party SPA cookie sessions via Laravel Sanctum (`statefulApi`)
- CSRF: `GET /sanctum/csrf-cookie` before login/register
- Domains: `SANCTUM_STATEFUL_DOMAINS`, `SESSION_DOMAIN`, `CORS_ALLOWED_ORIGINS`
- Production: `SESSION_SECURE_COOKIE=true`, `SESSION_SAME_SITE=lax`, HTTPS

## Tests

```bash
cd backend && php artisan test
```
