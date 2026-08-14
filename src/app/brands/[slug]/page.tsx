import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { brandCover, brandDisplayName } from "@/lib/brands";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const brand = await api.brand(slug);
    return {
      title: brandDisplayName(brand),
      description: brand.description || brand.tagline || undefined,
    };
  } catch {
    return { title: "แบรนด์" };
  }
}

export default async function BrandDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let brand;
  try {
    brand = await api.brand(slug);
  } catch {
    notFound();
  }

  const title = brandDisplayName(brand);

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src={brandCover(brand)}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/90 via-deep-blue/75 to-deep-blue/40" />
        </div>
        <div className="container-ff relative py-14 md:py-20">
          <nav className="mb-5 text-sm text-white/65" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              หน้าแรก
            </Link>
            <span className="mx-2 text-white/35">/</span>
            <Link href="/brands" className="hover:text-white">
              แบรนด์
            </Link>
            <span className="mx-2 text-white/35">/</span>
            <span className="text-white">{title}</span>
          </nav>
          {brand.country && (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              {brand.country}
            </p>
          )}
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-white md:text-5xl">
            {title}
          </h1>
          {brand.tagline && (
            <p className="mt-3 max-w-2xl text-base text-white/80 md:text-lg">
              {brand.tagline}
            </p>
          )}
        </div>
      </section>

      <section className="container-ff py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="font-display text-xl font-semibold text-deep-blue">
              เกี่ยวกับแบรนด์
            </h2>
            <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-muted">
              {brand.description || "รายละเอียดแบรนด์จะอัปเดตเร็วๆ นี้"}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products">
                <Button>ดูสินค้าทั้งหมด</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">สอบถามแบรนด์นี้</Button>
              </Link>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-border bg-bg-light p-6">
            {brand.logo && (
              <div className="relative mb-5 h-20 w-full">
                <Image
                  src={brand.logo}
                  alt={`${title} logo`}
                  fill
                  className="object-contain object-left"
                  sizes="280px"
                />
              </div>
            )}
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-muted">ชื่อแบรนด์</dt>
                <dd className="mt-0.5 font-medium text-deep-blue">{brand.name}</dd>
              </div>
              {brand.nameTh && (
                <div>
                  <dt className="text-muted">ชื่อไทย</dt>
                  <dd className="mt-0.5 font-medium text-deep-blue">
                    {brand.nameTh}
                  </dd>
                </div>
              )}
              {brand.country && (
                <div>
                  <dt className="text-muted">ประเทศ</dt>
                  <dd className="mt-0.5 font-medium text-deep-blue">
                    {brand.country}
                  </dd>
                </div>
              )}
            </dl>
            {brand.websiteUrl && (
              <a
                href={brand.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                เว็บไซต์แบรนด์
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
