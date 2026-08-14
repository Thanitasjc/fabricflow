import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/commerce/ProductCard";
import { PageHero } from "@/components/layout/PageHero";
import { categories, filterProducts } from "@/data/home";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "สินค้า",
  description: "เลือกซื้อผ้าคุณภาพ FabricFlow ทั้งปลีกและส่ง",
};

const productsHero =
  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1800&q=85";

interface ProductsPageProps {
  searchParams: Promise<{ cat?: string; industry?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { cat, industry } = await searchParams;
  const filtered = filterProducts({
    categoryId: cat,
    industryId: industry,
  });

  const activeIndustry = industries.find((item) => item.id === industry);
  const activeCategory = categories.find((item) => item.id === cat);

  const title = activeIndustry
    ? activeIndustry.nameTh
    : activeCategory
      ? activeCategory.nameTh
      : "สินค้าทั้งหมด";

  const subtitle = activeIndustry
    ? `สินค้าในกลุ่ม ${activeIndustry.nameTh}`
    : activeCategory
      ? `หมวดหมู่ ${activeCategory.nameTh}`
      : "ค้นหาผ้าที่เหมาะกับงานของคุณ พร้อมราคาปลีกและราคาส่ง";

  return (
    <div className="bg-bg-light">
      <PageHero
        image={
          activeIndustry?.image ||
          activeCategory?.image ||
          productsHero
        }
        imageAlt={title}
        eyebrow="Catalog"
        title={title}
        subtitle={subtitle}
        breadcrumbs={[
          { label: "หน้าแรก", href: "/" },
          { label: "สินค้า", href: "/products" },
          ...(activeIndustry
            ? [
                {
                  label: "อุตสาหกรรม",
                  href: "/industries",
                },
                { label: activeIndustry.nameTh },
              ]
            : activeCategory
              ? [{ label: activeCategory.nameTh }]
              : []),
        ]}
      />

      <div className="container-ff py-8 md:py-12">
        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            หมวดหมู่ผ้า
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/products"
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                !cat && !industry
                  ? "bg-primary text-white"
                  : "border border-border bg-white text-muted hover:border-primary hover:text-primary"
              }`}
            >
              ทั้งหมด
            </Link>
            {categories.map((item) => (
              <Link
                key={item.id}
                href={`/products?cat=${item.id}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  cat === item.id
                    ? "bg-primary text-white"
                    : "border border-border bg-white text-muted hover:border-primary hover:text-primary"
                }`}
              >
                {item.nameTh}
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            อุตสาหกรรม
          </p>
          <div className="flex flex-wrap gap-2">
            {industries.map((item) => (
              <Link
                key={item.id}
                href={`/products?industry=${item.id}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  industry === item.id
                    ? "bg-deep-blue text-white"
                    : "border border-border bg-white text-muted hover:border-deep-blue hover:text-deep-blue"
                }`}
              >
                {item.nameTh}
              </Link>
            ))}
          </div>
        </div>

        <p className="mb-5 text-sm text-muted">
          พบ {filtered.length} รายการ
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-white px-6 py-16 text-center">
            <p className="heading-display text-xl text-deep-blue">
              ไม่พบสินค้าในหมวดนี้
            </p>
            <p className="mt-2 text-sm text-muted">
              ลองเลือกหมวดอื่น หรือดูสินค้าทั้งหมด
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex h-11 items-center rounded-[10px] bg-primary px-6 text-sm font-medium text-white"
            >
              ดูสินค้าทั้งหมด
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
