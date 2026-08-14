# FabricFlow

Premium textile retail + wholesale (B2B/B2C) — Next.js frontend + Laravel/Filament backend.

## Frontend (Next.js)

```bash
npm install
npm run dev
```

Open http://localhost:3000

Optional `.env.local`:

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

## Backend (Laravel + Filament Admin)

```bash
cd backend
composer install
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

Seed ดึงจาก mock Frontend (`scripts/export-frontend-seed.mts` → `backend/database/data/frontend-seed.json`).

อัปเดต seed จาก Frontend ใหม่:

```bash
npx tsx scripts/export-frontend-seed.mts
cd backend && php artisan db:seed --force
```

- Admin CRUD: http://127.0.0.1:8000/admin  
- Admin login: `admin@fabricflow.test` / `password`  
- Customer portal: http://localhost:3000/login → `/account`  
- Portal demo: `customer@fabricflow.test` / `password`  
- Favorites: `/favorites` · Compare: `/compare` (บันทึกในเบราว์เซอร์)  
- เมกะเมนูอุตสาหกรรม (การ์ดย่อย): Admin → **Website → ผ้าแต่ละอุตสาหกรรม** (`/admin/industries`)  
- Brands page `/brands`: Admin → **Website → แบรนด์** (`/admin/brands`)  
- Public API: http://127.0.0.1:8000/api/*

### Corporate Admin modules (`/admin`)

| Group | Modules |
|------|---------|
| CRM | Companies, Contacts, Customer Groups, Customers, Leads, Opportunities (Pipeline), Activities, Contact inbox |
| Sales | Quotations, Sales Orders (+ credit check + stock deduct) |
| Inventory | Warehouses, Lots/Rolls, Stock movements |
| Purchasing | Suppliers, Purchase Orders, Goods Receipts (post → stock in) |
| Finance | Invoices, Payments |
| Catalog | Categories, Fabric products (GSM, composition, retail/wholesale/dealer/VIP) |
| Website | Header Menu, Logo/Branding, Hero, Industries, Brands, Articles, Services |

**B2B flow:** Lead → Company/Contact → Opportunity → Quotation → Sales Order → Invoice/Payment  
**Stock flow:** PO → Goods Receipt (post) → Warehouse/Lot → Order confirm → Stock out  

RBAC roles (Spatie): `super_admin`, `ceo`, `sales_manager`, `sales_staff`, `crm_staff`, warehouse/purchasing/finance roles.

Images use Filament **FileUpload** — click the upload area to pick a file from your computer (stored in `storage/app/public`).

### API endpoints

- `GET /api/categories`
- `GET /api/products` (`?category=&industry=&featured=1&q=`)
- `GET /api/products/{slug}`
- `GET /api/industries` / `GET /api/industries/{slug}`
- `GET /api/articles` / `GET /api/articles/{slug}`
- `GET /api/services` / `GET /api/services/{slug}`
- `GET /api/hero-slides`
- `GET /api/branding` (logo + brand text)
- `GET /api/menus?location=header`
- `GET /api/brands` · `GET /api/brands/{slug}`
- `POST /api/contact`
- `POST /api/auth/register` · `POST /api/auth/login` · `GET /api/auth/me` · `POST /api/auth/logout`
- `GET /api/portal/dashboard` · `/orders` · `/quotations` · `/invoices` (Bearer token)
