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

# Prefer Render's public HTTPS URL so Filament assets are not emitted as http://
if [[ -n "${RENDER_EXTERNAL_URL:-}" ]]; then
  export APP_URL="${RENDER_EXTERNAL_URL}"
elif [[ -n "${APP_URL:-}" && "${APP_URL}" == http://* ]]; then
  export APP_URL="https://${APP_URL#http://}"
fi

php artisan config:clear || true
php artisan migrate --force

# First boot: seed catalog/CMS when the DB is empty (Render Free has no Shell).
CATEGORY_COUNT="$(
  php -r 'require "vendor/autoload.php"; $app = require "bootstrap/app.php"; $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap(); echo (int) App\Models\Category::query()->count();'
)" || CATEGORY_COUNT="0"

if [[ "${CATEGORY_COUNT}" == "0" ]]; then
  echo "Empty catalog detected — running database seed..."
  php artisan db:seed --force
fi

php artisan storage:link || true

PORT="${PORT:-8000}"
exec php artisan serve --host=0.0.0.0 --port="${PORT}"
