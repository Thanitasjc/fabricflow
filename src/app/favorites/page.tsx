"use client";

import Image from "next/image";
import Link from "next/link";
import { GitCompareArrows, Heart, Trash2 } from "lucide-react";
import { useCatalogLists } from "@/components/commerce/CatalogListsProvider";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { toCatalogSnapshot } from "@/lib/catalog-lists";

const hero =
  "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1800&q=85";

export default function FavoritesPage() {
  const { favorites, ready, removeFavorite, clearFavorites, toggleCompare } =
    useCatalogLists();

  return (
    <div className="bg-bg-light">
      <PageHero
        image={hero}
        imageAlt="รายการโปรด"
        eyebrow="Favorites"
        title="รายการโปรด"
        subtitle="ผ้าที่คุณบันทึกไว้เพื่อดูภายหลัง"
        breadcrumbs={[
          { label: "หน้าแรก", href: "/" },
          { label: "รายการโปรด" },
        ]}
      />

      <div className="container-ff py-10 md:py-14">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {ready ? `${favorites.length} รายการ` : "กำลังโหลด..."}
          </p>
          {favorites.length > 0 && (
            <button
              type="button"
              onClick={clearFavorites}
              className="text-sm text-muted hover:text-danger"
            >
              ล้างทั้งหมด
            </button>
          )}
        </div>

        {!ready ? (
          <p className="text-sm text-muted">กำลังโหลด...</p>
        ) : favorites.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white px-6 py-16 text-center">
            <Heart className="mx-auto h-10 w-10 text-muted" />
            <h2 className="mt-4 font-display text-xl font-semibold text-deep-blue">
              ยังไม่มีรายการโปรด
            </h2>
            <p className="mt-2 text-sm text-muted">
              กดไอคอนหัวใจบนสินค้าเพื่อบันทึกไว้ที่นี่
            </p>
            <Link href="/products" className="mt-6 inline-block">
              <Button>เลือกดูสินค้า</Button>
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {favorites.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-4 sm:flex-row sm:items-center"
              >
                <Link
                  href={`/products/${item.id}`}
                  className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-bg-light sm:h-24 sm:w-24"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/products/${item.id}`}
                    className="font-display text-lg font-semibold text-deep-blue hover:text-primary"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted">
                    SKU: {item.sku} · {item.material} · {item.width}
                  </p>
                  <p className="mt-2 text-sm">
                    <span className="font-semibold text-deep-blue">
                      ฿{item.retailPrice.toLocaleString()}
                    </span>
                    <span className="text-muted"> / เมตร</span>
                    <span className="mx-2 text-border">|</span>
                    <span className="font-semibold text-primary">
                      ส่ง ฿{item.wholesalePrice.toLocaleString()}
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const res = toggleCompare(toCatalogSnapshot(item));
                      if (!res.ok && res.message) window.alert(res.message);
                    }}
                  >
                    <GitCompareArrows className="h-4 w-4" />
                    เปรียบเทียบ
                  </Button>
                  <Link href={`/products/${item.id}`}>
                    <Button size="sm">ดูสินค้า</Button>
                  </Link>
                  <button
                    type="button"
                    aria-label="ลบออก"
                    onClick={() => removeFavorite(item.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-[10px] text-muted hover:bg-danger/5 hover:text-danger"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
