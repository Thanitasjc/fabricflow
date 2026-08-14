"use client";

import Link from "next/link";
import Image from "next/image";
import { GitCompareArrows, X } from "lucide-react";
import { useCatalogLists } from "@/components/commerce/CatalogListsProvider";
import { COMPARE_MAX } from "@/lib/catalog-lists";
import { Button } from "@/components/ui/Button";

export function CompareDock() {
  const { compare, removeCompare, clearCompare, ready } = useCatalogLists();

  if (!ready || compare.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-16 z-40 md:bottom-0">
      <div className="border-t border-border bg-white/95 shadow-[0_-8px_30px_rgba(3,31,61,0.1)] backdrop-blur-md">
        <div className="container-ff flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto">
            <div className="shrink-0 text-sm font-medium text-deep-blue">
              เปรียบเทียบ{" "}
              <span className="text-muted">
                ({compare.length}/{COMPARE_MAX})
              </span>
            </div>
            {compare.map((item) => (
              <div
                key={item.id}
                className="relative flex h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-bg-light"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
                <button
                  type="button"
                  aria-label={`ลบ ${item.name}`}
                  onClick={() => removeCompare(item.id)}
                  className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-deep-blue/80 text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={clearCompare}
              className="h-10 px-3 text-sm text-muted hover:text-danger"
            >
              ล้าง
            </button>
            <Link href="/compare">
              <Button size="sm" disabled={compare.length < 2}>
                <GitCompareArrows className="h-4 w-4" />
                ดูเปรียบเทียบ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
