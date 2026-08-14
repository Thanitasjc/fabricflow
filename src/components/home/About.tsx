import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function About() {
  return (
    <section className="section-padding bg-white">
      <div className="container-ff">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-[5/4]">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=85"
              alt="FabricFlow textile showroom and quality fabrics"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/20 bg-deep-blue/80 p-4 backdrop-blur-sm md:bottom-6 md:left-6 md:right-auto md:max-w-xs">
              <p className="text-xs uppercase tracking-[0.18em] text-accent">
                Since Excellence
              </p>
              <p className="mt-1 font-[family-name:var(--font-manrope)] text-lg font-semibold text-white">
                Trusted Textile Partner
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              About FabricFlow
            </p>
            <h2 className="mt-3 heading-display text-3xl leading-tight md:text-4xl">
              ผ้าที่ดี เริ่มต้นจาก
              <br />
              คุณภาพที่เราเลือก
            </h2>
            <div className="gold-rule mt-4" />
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              FabricFlow ให้บริการจำหน่ายผ้าสำหรับลูกค้าทั่วไป ร้านค้า โรงงาน
              แบรนด์แฟชั่น และองค์กร โดยเน้นคุณภาพสินค้า
              ความหลากหลายของผ้า ราคาที่เหมาะสม และบริการจัดส่งที่รวดเร็ว
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              เราเป็นพันธมิตรด้านผ้าที่ธุรกิจไว้วางใจ
              ทั้งขายปลีกและขายส่งในแพลตฟอร์มเดียว
            </p>
            <div className="mt-8">
              <Link href="/about">
                <Button variant="primary" size="lg">
                  รู้จัก FabricFlow
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
