"use client";

import { GitCompareArrows, Heart } from "lucide-react";
import { useCatalogLists } from "@/components/commerce/CatalogListsProvider";
import {
  toCatalogSnapshot,
  type CatalogProductSnapshot,
} from "@/lib/catalog-lists";
import { cn } from "@/lib/utils";

type Props = {
  product: CatalogProductSnapshot;
  className?: string;
};

export function ProductListActions({ product, className }: Props) {
  const { isFavorite, isCompared, toggleFavorite, toggleCompare } =
    useCatalogLists();
  const snap = toCatalogSnapshot(product);
  const fav = isFavorite(snap.id);
  const cmp = isCompared(snap.id);

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <button
        type="button"
        aria-label={fav ? "ลบจากรายการโปรด" : "เพิ่มรายการโปรด"}
        aria-pressed={fav}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(snap);
        }}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg border bg-white/95 shadow-sm transition",
          fav
            ? "border-danger/30 text-danger"
            : "border-border text-deep-blue hover:border-primary hover:text-primary"
        )}
      >
        <Heart className={cn("h-4 w-4", fav && "fill-current")} />
      </button>
      <button
        type="button"
        aria-label={cmp ? "ลบจากเปรียบเทียบ" : "เพิ่มเปรียบเทียบ"}
        aria-pressed={cmp}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const res = toggleCompare(snap);
          if (!res.ok && res.message) {
            window.alert(res.message);
          }
        }}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg border bg-white/95 shadow-sm transition",
          cmp
            ? "border-primary/40 bg-primary/5 text-primary"
            : "border-border text-deep-blue hover:border-primary hover:text-primary"
        )}
      >
        <GitCompareArrows className="h-4 w-4" />
      </button>
    </div>
  );
}
