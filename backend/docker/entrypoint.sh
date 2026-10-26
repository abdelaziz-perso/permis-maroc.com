#!/bin/sh
set -e

cd /var/www/html

if [ ! -f vendor/autoload.php ]; then
  composer install --prefer-dist --no-interaction
fi

if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "" ]; then
  if grep -q '^APP_KEY=$' .env 2>/dev/null || ! grep -q '^APP_KEY=base64:' .env 2>/dev/null; then
    php artisan key:generate --force --no-interaction || true
  fi
fi

php artisan migrate --force --no-interaction

exec "$@"
