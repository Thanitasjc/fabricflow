"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/commerce/ProductCard";
import { products } from "@/data/home";
import { cn } from "@/lib/utils";

const tabs = ["ทั้งหมด", "ขายดี", "สินค้าใหม่", "ราคาส่ง"] as const;

export function FeaturedProducts() {
  const [active, setActive] = useState<(typeof tabs)[number]>("ทั้งหมด");

  const filtered = products
    .filter((p) => {
      if (active === "ทั้งหมด") return true;
      if (active === "ขายดี") return p.badge === "ขายดี";
      if (active === "สินค้าใหม่") return p.badge === "ใหม่";
      if (active === "ราคาส่ง") return p.badge === "ราคาส่ง";
      return true;
    })
    .slice(0, active === "ทั้งหมด" ? 12 : undefined);

  return (
    <section className="section-padding bg-white">
      <div className="container-ff">
        <SectionHeader
          eyebrow="Bestsellers"
          title="สินค้าแนะนำ"
          subtitle="คัดสรรผ้าคุณภาพพร้อมราคาปลีกและราคาส่ง ชัดเจน โปร่งใส"
        />

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={cn(
                "h-10 rounded-full px-5 text-sm font-medium transition-all",
                active === tab
                  ? "bg-primary text-white shadow-sm"
                  : "bg-bg-light text-muted hover:text-deep-blue"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/products">
            <Button variant="outline" size="lg">
              ดูสินค้าทั้งหมด
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
