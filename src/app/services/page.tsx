import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { serviceMenuItems, servicesIndexHero } from "@/data/services";

export const metadata: Metadata = {
  title: "บริการ",
  description:
    "บริการ FabricFlow — จัดหาผ้า พรีออเดอร์ สั่งผลิต พิมพ์ดิจิตอล วาร์ป ไซส์ซิ่ง และเครื่องคำนวณผ้า",
};

export default function ServicesIndexPage() {
  return (
    <div className="bg-bg-light">
      <PageHero
        image={servicesIndexHero}
        imageAlt="บริการ FabricFlow"
        eyebrow="Services"
        title="บริการของเรา"
        subtitle="ครบวงจรสำหรับธุรกิจผ้า ตั้งแต่จัดหา สั่งผลิต ไปจนถึงเครื่องมือคำนวณผ้า"
        breadcrumbs={[
          { label: "หน้าแรก", href: "/" },
          { label: "บริการ" },
        ]}
      />

      <div className="container-ff py-10 md:py-14">
        <div className="grid gap-5 sm:grid-cols-2">
          {serviceMenuItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="group overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_12px_40px_rgba(3,31,61,0.1)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.cover}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/70 via-deep-blue/15 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-[family-name:var(--font-manrope)] text-[11px] font-semibold tracking-[0.16em] text-deep-blue backdrop-blur-sm">
                  0{index + 1}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 p-5 md:p-6">
                <div>
                  <h2 className="heading-display text-lg text-deep-blue transition-colors group-hover:text-primary md:text-xl">
                    {item.label}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    ดูรายละเอียด
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
