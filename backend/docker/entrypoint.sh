#!/usr/bin/env bash
set -euo pipefail

# Laravel reads DB_URL; many hosts provide DATABASE_URL instead.
if [[ -z "${DB_URL:-}" && -n "${DATABASE_URL:-}" ]]; then
  export DB_URL="${DATABASE_URL}"
fi

# Supabase / managed Postgres typically require SSL.
if [[ -n "${DB_URL:-}" || -n "${DATABASE_URL:-}" ]]; then
  export DB_SSLMODE="${DB_SSLMODE:-require}"
fi

php artisan config:clear || true
php artisan migrate --force
php artisan storage:link || true

PORT="${PORT:-8000}"
exec php artisan serve --host=0.0.0.0 --port="${PORT}"
