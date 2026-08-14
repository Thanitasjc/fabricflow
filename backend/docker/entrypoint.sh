#!/usr/bin/env bash
set -euo pipefail

php artisan config:clear || true
php artisan migrate --force
php artisan storage:link || true

PORT="${PORT:-8000}"
exec php artisan serve --host=0.0.0.0 --port="${PORT}"
