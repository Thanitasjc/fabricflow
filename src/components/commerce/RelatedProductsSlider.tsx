"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/commerce/ProductCard";
import type { Product } from "@/data/home";
import { cn } from "@/lib/utils";

interface RelatedProductsSliderProps {
  products: Product[];
}

export function RelatedProductsSlider({ products }: RelatedProductsSliderProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  const updateControls = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < maxScroll - 8);
    const totalPages = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth));
    const currentPage = Math.round(el.scrollLeft / Math.max(el.clientWidth, 1));
    setPages(totalPages);
    setPage(Math.min(totalPages - 1, Math.max(0, currentPage)));
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateControls();
    el.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);
    return () => {
      el.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
    };
  }, [products]);

  const scrollByPage = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * el.clientWidth * 0.9,
      behavior: "smooth",
    });
  };

  const dots = useMemo(() => Array.from({ length: pages }), [pages]);

  if (products.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        {products.map((item) => (
          <div
            key={item.id}
            className="w-[46%] shrink-0 snap-start sm:w-[38%] md:w-[31%] lg:w-[23.5%]"
          >
            <ProductCard {...item} />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          {dots.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`ไปยังกลุ่มสินค้า ${index + 1}`}
              onClick={() => {
                const el = scrollerRef.current;
                if (!el) return;
                el.scrollTo({
                  left: index * el.clientWidth * 0.9,
                  behavior: "smooth",
                });
              }}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === page
                  ? "w-6 bg-primary"
                  : "w-2.5 bg-border hover:bg-muted"
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="สินค้าก่อนหน้า"
            onClick={() => scrollByPage(-1)}
            disabled={!canPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-deep-blue transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="สินค้าถัดไป"
            onClick={() => scrollByPage(1)}
            disabled={!canNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-deep-blue transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
