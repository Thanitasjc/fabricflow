"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { GitCompareArrows, Trash2, X } from "lucide-react";
import { useCatalogLists } from "@/components/commerce/CatalogListsProvider";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import {
  COMPARE_MAX,
  type CatalogProductSnapshot,
} from "@/lib/catalog-lists";

const hero =
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1800&q=85";

const rows: Array<{
  key: string;
  label: string;
  render: (p: CatalogProductSnapshot) => ReactNode;
}> = [
  {
    key: "sku",
    label: "SKU",
    render: (p) => p.sku,
  },
  {
    key: "material",
    label: "เนื้อผ้า",
    render: (p) => p.material,
  },
  {
    key: "width",
    label: "หน้ากว้าง",
    render: (p) => p.width,
  },
  {
    key: "color",
    label: "สี",
    render: (p) => p.color,
  },
  {
    key: "retail",
    label: "ราคาปลีก / เมตร",
    render: (p) => `฿${p.retailPrice.toLocaleString()}`,
  },
  {
    key: "wholesale",
    label: "ราคาส่ง / เมตร",
    render: (p) => `฿${p.wholesalePrice.toLocaleString()}`,
  },
  {
    key: "stock",
    label: "สต็อก",
    render: (p) => (p.inStock ? "มีสินค้า" : "สินค้าหมด"),
  },
];

export default function ComparePage() {
  const { compare, ready, removeCompare, clearCompare } = useCatalogLists();

  return (
    <div className="bg-bg-light">
      <PageHero
        image={hero}
        imageAlt="เปรียบเทียบสินค้า"
        eyebrow="Compare"
        title="เปรียบเทียบผ้า"
        subtitle={`เลือกได้สูงสุด ${COMPARE_MAX} รายการ เพื่อดูสเปกและราคาเคียงข้างกัน`}
        breadcrumbs={[
          { label: "หน้าแรก", href: "/" },
          { label: "เปรียบเทียบ" },
        ]}
      />

      <div className="container-ff py-10 md:py-14">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {ready
              ? `${compare.length}/${COMPARE_MAX} รายการ`
              : "กำลังโหลด..."}
          </p>
          {compare.length > 0 && (
            <button
              type="button"
              onClick={clearCompare}
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-danger"
            >
              <Trash2 className="h-4 w-4" />
              ล้างทั้งหมด
            </button>
          )}
        </div>

        {!ready ? (
          <p className="text-sm text-muted">กำลังโหลด...</p>
        ) : compare.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white px-6 py-16 text-center">
            <GitCompareArrows className="mx-auto h-10 w-10 text-muted" />
            <h2 className="mt-4 font-display text-xl font-semibold text-deep-blue">
              ยังไม่มีสินค้าเปรียบเทียบ
            </h2>
            <p className="mt-2 text-sm text-muted">
              กดไอคอนเปรียบเทียบบนสินค้า แล้วกลับมาดูตารางที่นี่
            </p>
            <Link href="/products" className="mt-6 inline-block">
              <Button>เลือกดูสินค้า</Button>
            </Link>
          </div>
        ) : compare.length === 1 ? (
          <div className="rounded-2xl border border-border bg-white p-6 text-center">
            <p className="text-sm text-muted">
              เพิ่มอีกอย่างน้อย 1 รายการเพื่อเปรียบเทียบ
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href={`/products/${compare[0].id}`}
                className="relative h-40 w-32 overflow-hidden rounded-xl"
              >
                <Image
                  src={compare[0].image}
                  alt={compare[0].name}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </Link>
            </div>
            <p className="mt-3 font-medium text-deep-blue">{compare[0].name}</p>
            <Link href="/products" className="mt-6 inline-block">
              <Button variant="outline">เพิ่มสินค้าอื่น</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-white">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="sticky left-0 z-10 w-40 bg-white px-4 py-4 text-left font-medium text-muted">
                    รายละเอียด
                  </th>
                  {compare.map((item) => (
                    <th key={item.id} className="px-4 py-4 text-left align-top">
                      <div className="relative mx-auto mb-3 h-36 w-28 overflow-hidden rounded-xl bg-bg-light">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="112px"
                        />
                        <button
                          type="button"
                          aria-label="ลบออก"
                          onClick={() => removeCompare(item.id)}
                          className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-deep-blue shadow-sm hover:text-danger"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <Link
                        href={`/products/${item.id}`}
                        className="font-display text-base font-semibold text-deep-blue hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.key} className="border-b border-border last:border-0">
                    <th className="sticky left-0 z-10 bg-bg-light/80 px-4 py-3 text-left font-medium text-muted backdrop-blur">
                      {row.label}
                    </th>
                    {compare.map((item) => (
                      <td
                        key={`${item.id}-${row.key}`}
                        className="px-4 py-3 text-deep-blue"
                      >
                        {row.render(item)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th className="sticky left-0 z-10 bg-white px-4 py-4" />
                  {compare.map((item) => (
                    <td key={`${item.id}-cta`} className="px-4 py-4">
                      <Link href={`/products/${item.id}`}>
                        <Button size="sm" className="w-full">
                          ดูรายละเอียด
                        </Button>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
