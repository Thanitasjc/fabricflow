import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProductListActions } from "@/components/commerce/ProductListActions";

export interface ProductCardProps {
  id: string;
  name: string;
  sku: string;
  material: string;
  width: string;
  color: string;
  retailPrice: number;
  wholesalePrice: number;
  inStock: boolean;
  badge?: "ขายดี" | "ใหม่" | "ราคาส่ง";
  image: string;
}

export function ProductCard({
  id,
  name,
  sku,
  material,
  width,
  color,
  retailPrice,
  wholesalePrice,
  inStock,
  badge,
  image,
}: ProductCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(3,31,61,0.08)]">
      <Link href={`/products/${id}`} className="relative block aspect-[4/5] overflow-hidden bg-bg-light">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {badge && (
          <div className="absolute left-3 top-3">
            <Badge variant={badge === "ราคาส่ง" ? "accent" : "default"}>
              {badge}
            </Badge>
          </div>
        )}
        <div className="absolute right-3 top-3 z-10">
          <ProductListActions
            product={{
              id,
              name,
              sku,
              material,
              width,
              color,
              retailPrice,
              wholesalePrice,
              inStock,
              image,
              badge,
            }}
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <Link href={`/products/${id}`}>
          <h3 className="heading-display text-[15px] md:text-base leading-snug text-deep-blue transition-colors group-hover:text-primary">
            {name}
          </h3>
        </Link>
        <p className="mt-1.5 text-xs text-muted">
          SKU: {sku} · {material} · {width}
        </p>
        <p className="mt-0.5 text-xs text-muted">สี: {color}</p>

        <div className="mt-4 space-y-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xs text-muted">ราคาปลีก</span>
            <span className="text-sm font-semibold text-deep-blue">
              ฿{retailPrice.toLocaleString()}{" "}
              <span className="font-normal text-muted">/ เมตร</span>
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xs text-accent font-medium">ราคาส่ง</span>
            <span className="text-sm font-semibold text-primary">
              เริ่มต้น ฿{wholesalePrice.toLocaleString()}{" "}
              <span className="font-normal text-muted">/ เมตร</span>
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${
              inStock ? "bg-success" : "bg-danger"
            }`}
          />
          <span className={inStock ? "text-success" : "text-danger"}>
            {inStock ? "มีสินค้า" : "สินค้าหมด"}
          </span>
        </div>

        <Link href={`/products/${id}`} className="mt-4 block">
          <Button
            className="w-full"
            size="sm"
            variant={inStock ? "primary" : "outline"}
          >
            <ShoppingBag className="h-4 w-4" />
            ดูรายละเอียด
          </Button>
        </Link>
      </div>
    </article>
  );
}
