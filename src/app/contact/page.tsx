import Link from "next/link";
import type { Metadata } from "next";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { FacebookIcon } from "@/components/icons/SocialIcons";

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description:
    "ติดต่อ FabricFlow สอบถามผ้า ราคาส่ง ใบเสนอราคา และบริการสำหรับธุรกิจ",
};

const contactCards = [
  {
    icon: Phone,
    title: "โทรศัพท์",
    lines: ["ฝ่ายขาย 02-000-0000", "มือถือ 08x-xxx-xxxx"],
    href: "tel:020000000",
  },
  {
    icon: MessageCircle,
    title: "LINE Official",
    lines: ["@fabricflow", "ตอบกลับในเวลาทำการ"],
    href: "#",
  },
  {
    icon: Mail,
    title: "อีเมล",
    lines: ["sales@fabricflow.co.th", "support@fabricflow.co.th"],
    href: "mailto:sales@fabricflow.co.th",
  },
  {
    icon: Clock,
    title: "เวลาทำการ",
    lines: ["จ.–ศ. 08:30–17:30", "ส. 09:00–15:00"],
  },
];

export default function ContactPage() {
  return (
    <div className="bg-bg-light">
      <PageHero
        image="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1800&q=85"
        imageAlt="ติดต่อ FabricFlow"
        eyebrow="Contact"
        title="ติดต่อเรา"
        subtitle="ทีมงานพร้อมให้คำแนะนำเรื่องชนิดผ้า ราคาปลีก-ส่ง และการสั่งซื้อสำหรับธุรกิจ"
        breadcrumbs={[
          { label: "หน้าแรก", href: "/" },
          { label: "ติดต่อเรา" },
        ]}
      />

      <div className="container-ff py-10 md:py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card) => {
            const Icon = card.icon;
            const content = (
              <>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h2 className="mt-4 heading-display text-lg text-deep-blue">
                  {card.title}
                </h2>
                <div className="mt-2 space-y-1 text-sm text-muted">
                  {card.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </>
            );

            return card.href ? (
              <a
                key={card.title}
                href={card.href}
                className="rounded-2xl border border-border bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_8px_28px_rgba(3,31,61,0.08)]"
              >
                {content}
              </a>
            ) : (
              <div
                key={card.title}
                className="rounded-2xl border border-border bg-white p-5"
              >
                {content}
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Location
              </p>
              <h2 className="mt-2 heading-display text-xl text-deep-blue">
                ที่ตั้งโชว์รูม / สำนักงาน
              </h2>
              <div className="mt-4 flex gap-3 text-sm leading-relaxed text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p>
                  FabricFlow Textile
                  <br />
                  กรุงเทพมหานคร ประเทศไทย
                  <br />
                  (ที่อยู่ตัวอย่าง — อัปเดตได้ภายหลัง)
                </p>
              </div>
              <div className="mt-5 overflow-hidden rounded-xl border border-border bg-bg-light">
                <div className="flex aspect-[16/10] items-center justify-center text-sm text-muted">
                  Map Placeholder
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-deep-blue p-6 text-white md:p-8">
              <h3 className="font-[family-name:var(--font-manrope)] text-xl font-semibold">
                ช่องทางด่วน
              </h3>
              <p className="mt-2 text-sm text-white/70">
                ต้องการคุยเร็ว ๆ ติดต่อผ่าน LINE หรือโทรหาฝ่ายขายได้ทันที
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a href="#">
                  <Button variant="accent" size="lg" className="w-full">
                    <MessageCircle className="h-4 w-4" />
                    LINE Official
                  </Button>
                </a>
                <a href="tel:020000000">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-white/30 text-white hover:bg-white hover:text-deep-blue"
                  >
                    <Phone className="h-4 w-4" />
                    โทร 02-000-0000
                  </Button>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 text-sm text-white/70 hover:text-white"
                >
                  <FacebookIcon className="h-4 w-4" />
                  FabricFlow Textile
                </a>
              </div>
              <Link
                href="/wholesale"
                className="mt-6 inline-block text-sm text-accent hover:underline"
              >
                สนใจขายส่ง? ดูรายละเอียด →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
