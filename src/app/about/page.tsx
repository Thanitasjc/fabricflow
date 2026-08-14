import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Award,
  Building2,
  Package,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description:
    "รู้จัก FabricFlow บริษัทจำหน่ายผ้าคุณภาพ ปลีกและส่ง สำหรับร้านค้า โรงงาน และแบรนด์แฟชั่น",
};

const values = [
  {
    icon: ShieldCheck,
    title: "คุณภาพมาตรฐาน",
    desc: "คัดสรรผ้าที่ผ่านการตรวจสอบเนื้อสัมผัส สี และความสม่ำเสมอของล็อต",
  },
  {
    icon: Package,
    title: "สต็อกพร้อมส่ง",
    desc: "มีสินค้าพร้อมใช้งาน รองรับทั้งออเดอร์ปลีกและออเดอร์ธุรกิจ",
  },
  {
    icon: Truck,
    title: "จัดส่งทั่วประเทศ",
    desc: "แพ็คอย่างระมัดระวัง ส่งถึงปลายทางได้รวดเร็วในเวลาทำการ",
  },
  {
    icon: Users,
    title: "ทีมงานเชี่ยวชาญ",
    desc: "ให้คำแนะนำชนิดผ้า ราคาส่ง และสเปกที่เหมาะกับงานจริง",
  },
];

const stats = [
  { value: "6+", label: "กลุ่มอุตสาหกรรม" },
  { value: "100+", label: "รายการผ้า" },
  { value: "B2B", label: "รองรับขายส่ง" },
  { value: "TH", label: "บริการทั่วไทย" },
];

const milestones = [
  {
    title: "จุดเริ่มต้น",
    text: "ก่อตั้งด้วยเป้าหมายเป็นพาร์ทเนอร์ผ้าที่ธุรกิจไว้ใจได้ ทั้งคุณภาพและบริการ",
  },
  {
    title: "ขยายสู่ปลีกและส่ง",
    text: "พัฒนาการจำหน่ายให้ครอบคลุมลูกค้าทั่วไป ร้านค้า โรงงาน และแบรนด์",
  },
  {
    title: "บริการครบวงจร",
    text: "เพิ่มบริการจัดหาผ้า พรีออเดอร์ สั่งผลิต และเครื่องมือคำนวณผ้า",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-bg-light">
      <PageHero
        image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1800&q=85"
        imageAlt="เกี่ยวกับ FabricFlow"
        eyebrow="About Us"
        title="เกี่ยวกับ FabricFlow"
        subtitle="พาร์ทเนอร์ผ้าคุณภาพสำหรับธุรกิจและคนรักผ้า — ขายปลีก ขายส่ง บริการครบวงจร"
        breadcrumbs={[
          { label: "หน้าแรก", href: "/" },
          { label: "เกี่ยวกับเรา" },
        ]}
      />

      {/* Intro */}
      <section className="section-padding bg-white">
        <div className="container-ff">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1400&q=85"
                alt="FabricFlow textile warehouse"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                Our Story
              </p>
              <h2 className="mt-3 heading-display text-3xl leading-tight text-deep-blue md:text-4xl">
                ผ้าที่ดี เริ่มต้นจาก
                <br />
                คุณภาพที่เราเลือก
              </h2>
              <div className="gold-rule mt-4" />
              <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
                FabricFlow เป็นแพลตฟอร์มจำหน่ายผ้าคุณภาพสำหรับลูกค้าทั่วไป
                ร้านค้า โรงงาน แบรนด์แฟชั่น และองค์กร โดยเน้นความหลากหลายของผ้า
                ราคาที่เหมาะสม และบริการที่โปร่งใสทั้งปลีกและส่ง
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                เราไม่ได้เป็นแค่ร้านค้าออนไลน์ แต่เป็นพาร์ทเนอร์ด้านสิ่งทอ
                ที่ช่วยให้ธุรกิจเลือกผ้าได้ถูกต้อง ลดความเสี่ยงในการผลิต
                และเดินหน้าออเดอร์ได้อย่างมั่นใจ
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/products">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    ดูสินค้า
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    ติดต่อเรา
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-deep-blue">
        <div className="container-ff grid grid-cols-2 gap-6 py-10 md:grid-cols-4 md:py-14">
          {stats.map((item) => (
            <div key={item.label} className="text-center">
              <p className="font-[family-name:var(--font-manrope)] text-3xl font-semibold text-accent md:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-white/70">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-bg-light">
        <div className="container-ff">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Values
            </p>
            <h2 className="mt-3 heading-display text-3xl text-deep-blue md:text-4xl">
              สิ่งที่เรายึดมั่น
            </h2>
            <div className="gold-rule mx-auto mt-4" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(3,31,61,0.08)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 heading-display text-lg text-deep-blue">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-ff">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                Journey
              </p>
              <h2 className="mt-3 heading-display text-3xl text-deep-blue">
                การเดินทางของเรา
              </h2>
              <div className="gold-rule mt-4" />
              <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
                จากจุดเริ่มต้นด้านผ้าคุณภาพ สู่บริการครบวงจรสำหรับธุรกิจสิ่งทอ
              </p>
            </div>
            <div className="space-y-5 lg:col-span-8">
              {milestones.map((item, index) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-border bg-bg-light p-5 md:p-6"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-[family-name:var(--font-manrope)] text-sm font-bold text-white">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="heading-display text-lg text-deep-blue">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-dark">
        <div className="container-ff flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center md:py-16">
          <div>
            <div className="inline-flex items-center gap-2 text-accent">
              <Building2 className="h-4 w-4" />
              <Award className="h-4 w-4" />
            </div>
            <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-2xl font-semibold text-white md:text-3xl">
              พร้อมเป็นพาร์ทเนอร์ผ้าให้ธุรกิจคุณ
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/70 md:text-base">
              ปรึกษาทีมงานเรื่องชนิดผ้า ราคาส่ง หรือบริการสั่งผลิตได้วันนี้
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/wholesale">
              <Button variant="accent" size="lg" className="w-full sm:w-auto">
                ขายส่ง
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-white/30 text-white hover:bg-white hover:text-deep-blue sm:w-auto"
              >
                ติดต่อเรา
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
