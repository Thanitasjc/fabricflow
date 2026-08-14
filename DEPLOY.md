# Deploy notes (FabricFlow)

## Architecture

| Piece | Host | Notes |
|-------|------|--------|
| Next.js | [Vercel](https://vercel.com) | Frontend |
| Laravel + Filament | [Render](https://render.com) Docker | API + `/admin` |
| Postgres + Storage | [Supabase](https://supabase.com) | DB + images (S3) |

Uploads use `MEDIA_DISK=s3` so files survive redeploys.

## Supabase setup

1. Create project
2. Database → copy **URI** (`DATABASE_URL`)
3. Storage → New bucket `fabricflow` (public)
4. Project Settings → API → S3 access keys
5. Endpoint example: `https://<PROJECT_REF>.supabase.co/storage/v1/s3`
6. Public URL example: `https://<PROJECT_REF>.supabase.co/storage/v1/object/public/fabricflow`

## Render (API)

- Blueprint: `render.yaml` or New Web Service → Docker → root `backend/`
- Set env from `.env.example` (especially `DATABASE_URL`, AWS_*, `APP_URL`, `FRONTEND_URL`)
- After deploy: open `/admin` and re-upload media if migrating from local disk

## Vercel (web)

- Import GitHub repo
- Framework: Next.js
- Env: `NEXT_PUBLIC_API_URL=https://<render-service>.onrender.com/api`
