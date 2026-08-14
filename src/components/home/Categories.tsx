"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { categories } from "@/data/home";
import { cn } from "@/lib/utils";

const AUTO_MS = 4000;
const total = categories.length;

export function Categories() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [index, setIndex] = useState(total); // start in middle copy
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(true);
  const [paused, setPaused] = useState(false);

  const track = [...categories, ...categories, ...categories];

  const measure = useCallback(() => {
    const card = cardRef.current;
    const viewport = viewportRef.current;
    if (!card || !viewport) return;
    const styles = window.getComputedStyle(viewport.querySelector("[data-cat-track]")!);
    const gap = parseFloat(styles.columnGap || styles.gap || "12") || 12;
    setStep(card.getBoundingClientRect().width + gap);
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const go = useCallback((delta: number) => {
    setAnimating(true);
    setIndex((current) => current + delta);
  }, []);

  // Snap back into middle copy after leaving it
  useEffect(() => {
    if (index >= total && index < total * 2) return;

    const timer = window.setTimeout(() => {
      setAnimating(false);
      setIndex((current) => {
        const normalized = ((current % total) + total) % total;
        return total + normalized;
      });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
    }, 480);

    return () => window.clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    if (paused || total <= 1 || step === 0) return;
    const id = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, go, step]);

  return (
    <section className="section-padding bg-bg-light">
      <div className="container-ff">
        <SectionHeader
          eyebrow="Collections"
          title="หมวดหมู่สินค้า"
          subtitle="เลือกผ้าที่เหมาะกับงานของคุณ ทั้งเสื้อผ้า ยูนิฟอร์ม และงานตัดเย็บ"
        />

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setPaused(false);
            }
          }}
        >
          <div
            ref={viewportRef}
            className="overflow-hidden"
            aria-roledescription="carousel"
            aria-label="หมวดหมู่สินค้า"
          >
            <div
              data-cat-track
              className={cn(
                "flex gap-3 md:gap-5",
                animating && "transition-transform duration-500 ease-out"
              )}
              style={{
                transform: step
                  ? `translate3d(${-index * step}px, 0, 0)`
                  : undefined,
              }}
            >
              {track.map((cat, i) => (
                <Link
                  key={`${cat.id}-${i}`}
                  ref={i === total ? cardRef : undefined}
                  href={`/products?cat=${cat.id}`}
                  className="group relative aspect-[4/5] w-[46%] shrink-0 overflow-hidden rounded-xl sm:w-[38%] md:w-[31%] lg:w-[15.5%]"
                >
                  <Image
                    src={cat.image}
                    alt={`${cat.nameTh} — ${cat.nameEn}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 50vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/85 via-deep-blue/25 to-transparent transition-opacity group-hover:from-deep-blue/90" />
                  <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                    <h3 className="heading-display text-sm text-white md:text-base">
                      {cat.nameTh}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-white/70">
                      {cat.nameEn}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      ดูสินค้า <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end gap-2">
            <button
              type="button"
              aria-label="หมวดหมู่ก่อนหน้า"
              onClick={() => go(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-deep-blue transition hover:border-primary hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="หมวดหมู่ถัดไป"
              onClick={() => go(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-deep-blue transition hover:border-primary hover:text-primary"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
