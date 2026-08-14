import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const features = [
  "ราคาส่งตามจำนวน",
  "สินค้าหลากหลาย",
  "มี Stock พร้อมส่ง",
  "รองรับใบเสนอราคา",
  "รองรับลูกค้าเครดิต",
  "จัดส่งทั่วประเทศ",
];

export function WholesaleCTA() {
  return (
    <section className="bg-deep-blue">
      <div className="grid lg:grid-cols-2">
        <div className="flex items-center px-5 py-16 md:px-10 lg:px-16 lg:py-24">
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              For Business
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-[2.75rem]">
              ขายส่งสำหรับธุรกิจ
            </h2>
            <div className="gold-rule mt-4" />
            <p className="mt-5 text-base leading-relaxed text-white/75">
              ราคาพิเศษสำหรับร้านค้า โรงงาน แบรนด์เสื้อผ้า และลูกค้าองค์กร
              พร้อมบริการใบเสนอราคาและบัญชีเครดิต
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2.5 text-sm text-white/90"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20">
                    <Check className="h-3 w-3 text-accent" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/register?type=wholesale">
                <Button variant="accent" size="lg" className="w-full sm:w-auto">
                  สมัครสมาชิกค้าส่ง
                </Button>
              </Link>
              <Link href="/quotation">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-white/35 text-white hover:bg-white hover:text-deep-blue sm:w-auto"
                >
                  ขอใบเสนอราคา
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative min-h-[320px] lg:min-h-full">
          <Image
            src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1400&q=85"
            alt="Textile warehouse and fabric rolls for wholesale"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-deep-blue/25" />
        </div>
      </div>
    </section>
  );
}
