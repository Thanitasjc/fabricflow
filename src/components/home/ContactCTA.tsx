import Link from "next/link";
import { MessageCircle, Phone, Headphones } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactCTA() {
  return (
    <section className="bg-navy-dark">
      <div className="container-ff py-14 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            Get in Touch
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-manrope)] text-3xl font-semibold text-white md:text-4xl">
            ต้องการสอบถามเรื่องผ้า?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
            ทีมงานของเราพร้อมให้คำแนะนำเรื่องชนิดผ้า ราคา
            และการสั่งซื้อสำหรับธุรกิจ
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link href="/contact">
              <Button variant="accent" size="lg" className="w-full sm:w-auto">
                <Headphones className="h-4 w-4" />
                ติดต่อฝ่ายขาย
              </Button>
            </Link>
            <Link href="#">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-white/30 text-white hover:bg-white hover:text-deep-blue sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                LINE Official
              </Button>
            </Link>
            <a href="tel:020000000">
              <Button
                variant="ghost"
                size="lg"
                className="w-full text-white hover:bg-white/10 sm:w-auto"
              >
                <Phone className="h-4 w-4" />
                โทรหาเรา
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
