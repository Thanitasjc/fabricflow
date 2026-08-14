"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { HeroSlide } from "@/lib/api";
import { cn } from "@/lib/utils";

type SlideView = {
  id: number;
  eyebrow: string;
  title: string[];
  description: string;
  image: string;
  alt: string;
  primaryCta: { href: string; label: string } | null;
  secondaryCta: { href: string; label: string } | null;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=2000&q=85";

const fallbackSlides: SlideView[] = [
  {
    id: 1,
    eyebrow: "Premium Textile",
    title: ["ผ้าคุณภาพสำหรับ", "ธุรกิจและคนรักผ้า"],
    description:
      "จำหน่ายผ้าปลีกและผ้าส่ง พร้อมบริการสำหรับโรงงาน แบรนด์เสื้อผ้า และธุรกิจที่ต้องการผ้าคุณภาพมาตรฐาน",
    image: FALLBACK_IMAGE,
    alt: "Premium textile fabric swatches and textures",
    primaryCta: { href: "/products", label: "ดูสินค้าทั้งหมด" },
    secondaryCta: { href: "/wholesale", label: "สั่งซื้อราคาส่ง" },
  },
];

function normalizeHref(url: string | null | undefined) {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  ) {
    return trimmed;
  }
  return `/${trimmed}`;
}

function mapApiSlide(slide: HeroSlide): SlideView {
  const title = [slide.titleLine1, slide.titleLine2].filter(
    (line): line is string => Boolean(line && line.trim())
  );

  const primaryHref = normalizeHref(slide.primaryCta?.url);
  const secondaryHref = normalizeHref(slide.secondaryCta?.url);

  return {
    id: slide.id,
    eyebrow: slide.eyebrow?.trim() || "FabricFlow",
    title: title.length ? title : ["FabricFlow"],
    description: slide.description?.trim() || "",
    image: slide.image || FALLBACK_IMAGE,
    alt: slide.titleLine1 || "FabricFlow hero",
    primaryCta:
      primaryHref && slide.primaryCta?.label
        ? { href: primaryHref, label: slide.primaryCta.label }
        : null,
    secondaryCta:
      secondaryHref && slide.secondaryCta?.label
        ? { href: secondaryHref, label: slide.secondaryCta.label }
        : null,
  };
}

const AUTO_MS = 6000;

type HeroProps = {
  slides?: HeroSlide[];
};

export function Hero({ slides: apiSlides = [] }: HeroProps) {
  const slides = useMemo(() => {
    if (apiSlides.length > 0) return apiSlides.map(mapApiSlide);
    return fallbackSlides;
  }, [apiSlides]);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setActive(0);
  }, [slides.length]);

  const goTo = useCallback(
    (index: number) => {
      setActive((index + slides.length) % slides.length);
    },
    [slides.length]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  const slide = slides[active] ?? slides[0];

  if (!slide) return null;

  return (
    <section
      className="relative isolate min-h-[560px] overflow-hidden md:min-h-[650px] lg:min-h-[720px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="FabricFlow hero slider"
    >
      {slides.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-out",
            index === active ? "opacity-100" : "opacity-0"
          )}
          aria-hidden={index !== active}
        >
          <Image
            src={item.image}
            alt={item.alt}
            fill
            priority={index === 0}
            unoptimized={item.image.includes("127.0.0.1") || item.image.includes("localhost")}
            className={cn(
              "object-cover object-center transition-transform duration-[7000ms] ease-out",
              index === active ? "scale-105" : "scale-100"
            )}
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/85 via-deep-blue/65 to-deep-blue/35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,164,65,0.12),transparent_50%)]" />

      <div className="container-ff relative flex min-h-[560px] items-center py-20 md:min-h-[650px] lg:min-h-[720px]">
        <div key={slide.id} className="max-w-xl animate-fade-up text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent md:text-sm">
            {slide.eyebrow}
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-manrope)] text-4xl font-semibold leading-[1.15] tracking-tight md:text-5xl lg:text-[3.5rem]">
            {slide.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          {slide.description ? (
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 md:text-lg">
              {slide.description}
            </p>
          ) : null}
          {(slide.primaryCta || slide.secondaryCta) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {slide.primaryCta ? (
                <Link href={slide.primaryCta.href}>
                  <Button variant="accent" size="lg" className="w-full sm:w-auto">
                    {slide.primaryCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : null}
              {slide.secondaryCta ? (
                <Link href={slide.secondaryCta.href}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-white/40 text-white hover:bg-white hover:text-deep-blue sm:w-auto"
                  >
                    {slide.secondaryCta.label}
                  </Button>
                </Link>
              ) : null}
            </div>
          )}
          <p className="mt-8 text-xs tracking-wide text-white/50">
            FabricFlow · Retail & Wholesale · Nationwide Delivery
          </p>
        </div>
      </div>

      {slides.length > 1 ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className="container-ff flex items-end justify-between pb-6 md:pb-8">
            <div className="pointer-events-auto flex items-center gap-2">
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`ไปยังสไลด์ ${index + 1}`}
                  aria-current={index === active}
                  onClick={() => goTo(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    index === active
                      ? "w-8 bg-accent"
                      : "w-3 bg-white/40 hover:bg-white/70"
                  )}
                />
              ))}
            </div>

            <div className="pointer-events-auto hidden items-center gap-2 sm:flex">
              <button
                type="button"
                aria-label="สไลด์ก่อนหน้า"
                onClick={prev}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-deep-blue"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="สไลด์ถัดไป"
                onClick={next}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-deep-blue"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="ml-2 font-[family-name:var(--font-manrope)] text-sm text-white/70">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
