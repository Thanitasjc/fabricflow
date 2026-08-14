import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Button } from "@/components/ui/Button";
import type { IndustryDetail } from "@/data/industries";
import type { ProductCardProps } from "@/components/commerce/ProductCard";

interface IndustryDetailViewProps {
  industry: IndustryDetail;
  products: ProductCardProps[];
  otherIndustries?: IndustryDetail[];
}

export function IndustryDetailView({
  industry,
  products,
  otherIndustries = [],
}: IndustryDetailViewProps) {
  return (
    <div className="bg-white">
      {/* Intro hero band */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src={industry.image}
            alt={industry.nameTh}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/90 via-deep-blue/75 to-deep-blue/40" />
        </div>
        <div className="container-ff relative py-14 md:py-20 lg:py-24">
          <nav className="mb-5 text-sm text-white/65" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              หน้าแรก
            </Link>
            <span className="mx-2 text-white/35">/</span>
            <Link href="/industries" className="hover:text-white">
              ผ้าแต่ละอุตสาหกรรม
            </Link>
            <span className="mx-2 text-white/35">/</span>
            <span className="text-white">{industry.nameTh}</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {industry.nameEn}
          </p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-manrope)] text-3xl font-semibold text-white md:text-5xl">
            {industry.nameTh}
          </h1>
          <div className="gold-rule mt-4" />
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">
            {industry.intro}
          </p>
        </div>
      </section>

      {/* Guide content */}
      <section className="section-padding bg-[#F7F5F2]">
        <div className="container-ff max-w-4xl">
          <h2 className="heading-display text-2xl text-deep-blue md:text-3xl">
            {industry.guideTitle}
          </h2>
          <div className="gold-rule mt-4" />
          <div className="mt-6 space-y-4">
            {industry.guideBody.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-base leading-relaxed text-muted md:text-[17px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="section-padding bg-white">
        <div className="container-ff">
          <div className="mb-8 md:mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Collections
            </p>
            <h2 className="mt-2 heading-display text-2xl text-deep-blue md:text-3xl">
              คอลเลกชันแนะนำ
            </h2>
            <div className="gold-rule mt-4" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {industry.collections.map((collection) => (
              <article
                key={collection.id}
                className="group overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(3,31,61,0.1)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-deep-blue/0 transition-colors group-hover:bg-deep-blue/15" />
                </div>
                <div className="p-5">
                  <h3 className="font-[family-name:var(--font-manrope)] text-sm font-semibold tracking-wide text-primary">
                    {collection.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {collection.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding bg-bg-light">
        <div className="container-ff">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="heading-display text-2xl text-deep-blue md:text-3xl">
                {industry.nameTh}
              </h2>
              <div className="gold-rule mt-4" />
              <p className="mt-4 text-sm text-muted md:text-base">
                สินค้าในกลุ่มนี้ {products.length} รายการ — ราคาปลีกและราคาส่ง
              </p>
            </div>
            <Link
              href={`/products?industry=${industry.id}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              ดูทั้งหมด
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-white px-6 py-14 text-center">
              <p className="heading-display text-xl text-deep-blue">
                ยังไม่มีสินค้าในอุตสาหกรรมนี้
              </p>
              <p className="mt-2 text-sm text-muted">
                สามารถติดต่อฝ่ายขายเพื่อขอคำแนะนำผ้าที่เหมาะสมได้
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                ดูสินค้าทั้งหมด
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Other industries */}
      <section className="border-t border-border bg-white py-12 md:py-16">
        <div className="container-ff">
          <h2 className="heading-display text-xl text-deep-blue md:text-2xl">
            อุตสาหกรรมอื่น ๆ
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {otherIndustries.map((item) => (
              <Link
                key={item.id}
                href={`/industries/${item.id}`}
                className="rounded-full border border-border bg-bg-light px-4 py-2 text-sm text-deep-blue transition-colors hover:border-primary hover:bg-white hover:text-primary"
              >
                {item.nameTh}
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-deep-blue p-6 md:flex md:items-center md:justify-between md:p-8">
            <div>
              <h3 className="font-[family-name:var(--font-manrope)] text-xl font-semibold text-white">
                ต้องการคำแนะนำผ้าสำหรับ{industry.nameTh}?
              </h3>
              <p className="mt-2 max-w-xl text-sm text-white/70">
                ทีม FabricFlow พร้อมช่วยเลือกชนิดผ้า สต็อก และราคาส่งให้เหมาะกับงานของคุณ
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row md:mt-0">
              <Link href="/contact">
                <Button variant="accent" size="lg" className="w-full sm:w-auto">
                  ติดต่อฝ่ายขาย
                </Button>
              </Link>
              <Link href="/quotation">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-white/30 text-white hover:bg-white hover:text-deep-blue sm:w-auto"
                >
                  ขอใบเสนอราคา
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
