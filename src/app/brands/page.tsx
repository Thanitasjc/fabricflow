import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { api } from "@/lib/api";
import { brandCover, brandDisplayName, type ApiBrand } from "@/lib/brands";

export const metadata: Metadata = {
  title: "แบรนด์",
  description: "แบรนด์ผ้าที่ FabricFlow คัดสรรสำหรับงานปลีกและส่ง",
};

export const dynamic = "force-dynamic";

export default async function BrandsPage() {
  const brands = await api.brands().catch(() => [] as ApiBrand[]);
  const hero =
    brands[0]?.image ||
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1800&q=85";

  return (
    <div className="bg-bg-light">
      <PageHero
        image={hero}
        imageAlt="แบรนด์ผ้า FabricFlow"
        eyebrow="Brands"
        title="แบรนด์ผ้า"
        subtitle="คัดสรรแบรนด์และไลน์ผ้าคุณภาพ สำหรับร้านค้า โรงงาน และแบรนด์แฟชั่น"
        breadcrumbs={[
          { label: "หน้าแรก", href: "/" },
          { label: "แบรนด์" },
        ]}
      />

      <div className="container-ff py-10 md:py-14">
        {brands.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white px-6 py-16 text-center text-sm text-muted">
            ยังไม่มีแบรนด์ — เพิ่มได้ที่ Admin → Website → แบรนด์
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((brand) => (
              <article
                key={brand.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(3,31,61,0.08)]"
              >
                <Link
                  href={`/brands/${brand.slug}`}
                  className="relative aspect-[16/10] overflow-hidden bg-bg-light"
                >
                  <Image
                    src={brandCover(brand)}
                    alt={brandDisplayName(brand)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {brand.isFeatured && (
                    <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold text-deep-blue">
                      แนะนำ
                    </span>
                  )}
                </Link>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  {brand.country && (
                    <p className="text-xs font-medium uppercase tracking-wider text-muted">
                      {brand.country}
                    </p>
                  )}
                  <Link href={`/brands/${brand.slug}`}>
                    <h2 className="mt-1 font-display text-xl font-semibold text-deep-blue transition-colors group-hover:text-primary">
                      {brandDisplayName(brand)}
                    </h2>
                  </Link>
                  {brand.tagline && (
                    <p className="mt-1 text-sm text-primary">{brand.tagline}</p>
                  )}
                  {brand.description && (
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                      {brand.description}
                    </p>
                  )}
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    ดูรายละเอียด
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
