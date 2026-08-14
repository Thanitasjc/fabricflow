"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FileText,
  GitCompareArrows,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  ZoomIn,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCatalogLists } from "@/components/commerce/CatalogListsProvider";
import {
  ProductImageZoom,
  ZoomHint,
} from "@/components/commerce/ProductImageZoom";
import { RelatedProductsSlider } from "@/components/commerce/RelatedProductsSlider";
import type { Product, ProductColor } from "@/data/home";
import { categories, getProductGallery } from "@/data/home";
import { industries } from "@/data/industries";
import { toCatalogSnapshot } from "@/lib/catalog-lists";
import { cn } from "@/lib/utils";

interface ProductDetailViewProps {
  product: Product;
  colors: ProductColor[];
  stockMeters: number;
  related: Product[];
}

const tabs = [
  "รายละเอียดสินค้า",
  "คุณสมบัติ",
  "ข้อมูลเนื้อผ้า",
  "วิธีดูแล",
  "Shipping",
  "Reviews",
] as const;

export function ProductDetailView({
  product,
  colors,
  stockMeters,
  related,
}: ProductDetailViewProps) {
  const [selectedColorId, setSelectedColorId] = useState(colors[0]?.id ?? "");
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(20);
  const [tab, setTab] = useState<(typeof tabs)[number]>("รายละเอียดสินค้า");
  const [zoomOpen, setZoomOpen] = useState(false);
  const { isFavorite, isCompared, toggleFavorite, toggleCompare } =
    useCatalogLists();
  const snap = toCatalogSnapshot(product);
  const fav = isFavorite(product.id);
  const cmp = isCompared(product.id);

  const selectedColor =
    colors.find((color) => color.id === selectedColorId) ?? colors[0];

  const gallery = useMemo(
    () => getProductGallery(product, selectedColor),
    [product, selectedColor]
  );

  const category = categories.find((c) => c.id === product.categoryId);
  const productIndustries = industries.filter((item) =>
    product.industryIds.includes(item.id as (typeof product.industryIds)[number])
  );

  const retailPrice = selectedColor?.retailPrice ?? product.retailPrice;
  const wholesalePrice =
    selectedColor?.wholesalePrice ?? product.wholesalePrice;
  const colorInStock = selectedColor?.inStock ?? product.inStock;

  const retailTotal = useMemo(
    () => retailPrice * qty,
    [retailPrice, qty]
  );

  const adjustQty = (delta: number) => {
    setQty((value) => Math.min(9999, Math.max(1, value + delta)));
  };

  const selectColor = (color: ProductColor) => {
    setSelectedColorId(color.id);
    setActiveImage(0);
  };

  return (
    <div className="bg-bg-light">
      <div className="border-b border-border bg-white">
        <div className="container-ff py-4 text-sm text-muted">
          <Link href="/" className="hover:text-primary">
            หน้าแรก
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-primary">
            สินค้า
          </Link>
          {category && (
            <>
              <span className="mx-2">/</span>
              <Link
                href={`/products?cat=${category.id}`}
                className="hover:text-primary"
              >
                {category.nameTh}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-deep-blue">{product.name}</span>
        </div>
      </div>

      <div className="container-ff py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Gallery */}
          <div className="lg:col-span-6">
            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-white text-left md:aspect-square"
              aria-label="เปิดซูมรูปสินค้า"
            >
              <Image
                key={gallery[activeImage]}
                src={gallery[activeImage]}
                alt={`${product.name} - ${selectedColor?.name ?? product.color}`}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {product.badge && (
                <div className="absolute left-4 top-4">
                  <Badge
                    variant={product.badge === "ราคาส่ง" ? "accent" : "default"}
                  >
                    {product.badge}
                  </Badge>
                </div>
              )}
              <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-deep-blue shadow-sm transition-colors group-hover:bg-primary group-hover:text-white">
                <ZoomIn className="h-4 w-4" />
              </span>
              <ZoomHint />
            </button>
            <div className="mt-3 grid grid-cols-4 gap-2 md:gap-3">
              {gallery.map((src, index) => (
                <button
                  key={src + index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  onDoubleClick={() => {
                    setActiveImage(index);
                    setZoomOpen(true);
                  }}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-xl border-2 transition-all",
                    activeImage === index
                      ? "border-primary"
                      : "border-transparent hover:border-primary/40"
                  )}
                >
                  <Image
                    src={src}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
              {category && (
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {category.nameEn}
                </p>
              )}
              <h1 className="mt-2 heading-display text-2xl text-deep-blue md:text-3xl lg:text-4xl">
                {product.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted">
                <span>SKU: {product.sku}</span>
                <span className="text-border">|</span>
                <span className="inline-flex items-center gap-1 text-deep-blue">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                  4.8
                  <span className="text-muted">(24 รีวิว)</span>
                </span>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-bg-light px-4 py-3">
                  <dt className="text-xs text-muted">Material</dt>
                  <dd className="mt-1 font-medium text-deep-blue">
                    {product.material}
                  </dd>
                </div>
                <div className="rounded-xl bg-bg-light px-4 py-3">
                  <dt className="text-xs text-muted">Color</dt>
                  <dd className="mt-1 font-medium text-deep-blue">
                    {selectedColor?.name ?? product.color}
                  </dd>
                </div>
                <div className="rounded-xl bg-bg-light px-4 py-3">
                  <dt className="text-xs text-muted">Width</dt>
                  <dd className="mt-1 font-medium text-deep-blue">
                    {product.width}
                  </dd>
                </div>
                <div className="rounded-xl bg-bg-light px-4 py-3">
                  <dt className="text-xs text-muted">Category</dt>
                  <dd className="mt-1 font-medium text-deep-blue">
                    {category?.nameTh ?? "-"}
                  </dd>
                </div>
              </dl>

              {/* Color selector */}
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-deep-blue">
                    เลือกสี
                  </p>
                  <p className="text-xs text-muted">
                    {selectedColor?.name ?? product.color}
                    {!colorInStock && (
                      <span className="ml-2 text-danger">· หมดชั่วคราว</span>
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                  {colors.map((color) => {
                    const active = color.id === selectedColor?.id;
                    return (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => selectColor(color)}
                        className={cn(
                          "group/color relative overflow-hidden rounded-xl border-2 bg-white p-1.5 text-center transition-all",
                          active
                            ? "border-primary shadow-[0_0_0_3px_rgba(7,59,115,0.12)]"
                            : "border-border hover:border-primary/40",
                          !color.inStock && "opacity-70"
                        )}
                        aria-pressed={active}
                        aria-label={`เลือกสี ${color.name}`}
                      >
                        <span className="relative block aspect-square overflow-hidden rounded-lg">
                          <Image
                            src={color.image}
                            alt={color.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover/color:scale-105"
                            sizes="100px"
                          />
                          {!color.inStock && (
                            <span className="absolute inset-0 flex items-center justify-center bg-deep-blue/45">
                              <span className="rounded bg-white/95 px-1.5 py-0.5 text-[10px] font-semibold text-danger">
                                หมด
                              </span>
                            </span>
                          )}
                        </span>
                        <span
                          className={cn(
                            "mt-1.5 block truncate text-[10px] font-medium leading-tight md:text-[11px]",
                            active ? "text-primary" : "text-deep-blue"
                          )}
                        >
                          {color.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm">
                <span
                  className={cn(
                    "inline-block h-2 w-2 rounded-full",
                    colorInStock ? "bg-success" : "bg-danger"
                  )}
                />
                <span className={colorInStock ? "text-success" : "text-danger"}>
                  {colorInStock ? "มีสินค้า" : "สินค้าหมด"}
                </span>
                {colorInStock && (
                  <span className="text-muted">
                    · {stockMeters.toLocaleString()} เมตร
                  </span>
                )}
              </div>

              <div className="mt-6 space-y-3 border-y border-border py-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted">Retail</p>
                    <p className="mt-1 font-[family-name:var(--font-manrope)] text-2xl font-semibold text-deep-blue">
                      ฿{retailPrice.toLocaleString()}
                      <span className="text-sm font-normal text-muted">
                        {" "}
                        / เมตร
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-accent">Wholesale</p>
                    <p className="mt-1 font-[family-name:var(--font-manrope)] text-2xl font-semibold text-primary">
                      ฿{wholesalePrice.toLocaleString()}
                      <span className="text-sm font-normal text-muted">
                        {" "}
                        / เมตร
                      </span>
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted">
                  ประมาณการราคารวม (ปลีก): ฿{retailTotal.toLocaleString()}
                </p>
              </div>

              <div className="mt-6">
                <p className="mb-2 text-sm font-medium text-deep-blue">
                  Quantity (เมตร)
                </p>
                <div className="inline-flex items-center rounded-xl border border-border bg-bg-light">
                  <button
                    type="button"
                    aria-label="ลดจำนวน"
                    onClick={() => adjustQty(-1)}
                    className="flex h-12 w-12 items-center justify-center text-deep-blue hover:text-primary"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) => {
                      const n = parseInt(e.target.value, 10);
                      setQty(Number.isNaN(n) ? 1 : Math.min(9999, Math.max(1, n)));
                    }}
                    className="h-12 w-20 border-x border-border bg-white text-center text-base font-semibold text-deep-blue outline-none"
                  />
                  <button
                    type="button"
                    aria-label="เพิ่มจำนวน"
                    onClick={() => adjustQty(1)}
                    className="flex h-12 w-12 items-center justify-center text-deep-blue hover:text-primary"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:flex-1"
                  disabled={!colorInStock}
                >
                  <ShoppingBag className="h-4 w-4" />
                  เพิ่มลงตะกร้า
                </Button>
                <Link href="/quotation" className="w-full sm:flex-1">
                  <Button variant="outline" size="lg" className="w-full">
                    <FileText className="h-4 w-4" />
                    ขอใบเสนอราคา
                  </Button>
                </Link>
              </div>

              <div className="mt-3 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => toggleFavorite(snap)}
                  className={cn(
                    "inline-flex items-center gap-2 text-sm transition-colors",
                    fav ? "text-danger" : "text-muted hover:text-primary"
                  )}
                >
                  <Heart className={cn("h-4 w-4", fav && "fill-current")} />
                  {fav ? "บันทึกในรายการโปรดแล้ว" : "เพิ่มในรายการโปรด"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const res = toggleCompare(snap);
                    if (!res.ok && res.message) window.alert(res.message);
                  }}
                  className={cn(
                    "inline-flex items-center gap-2 text-sm transition-colors",
                    cmp ? "text-primary" : "text-muted hover:text-primary"
                  )}
                >
                  <GitCompareArrows className="h-4 w-4" />
                  {cmp ? "อยู่ในรายการเปรียบเทียบ" : "เปรียบเทียบ"}
                </button>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-xl bg-bg-light p-4 text-sm text-muted">
                <Truck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                จัดส่งทั่วประเทศ · สั่งขั้นต่ำแนะนำ 1 เมตร · ลูกค้าส่งสามารถขอราคาตามจำนวนได้
              </div>

              {productIndustries.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs text-muted">เหมาะกับอุตสาหกรรม</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {productIndustries.map((item) => (
                      <Link
                        key={item.id}
                        href={`/industries/${item.id}`}
                        className="rounded-full border border-border px-3 py-1 text-xs text-deep-blue hover:border-primary hover:text-primary"
                      >
                        {item.nameTh}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 rounded-2xl border border-border bg-white">
          <div className="flex gap-1 overflow-x-auto border-b border-border px-2 md:px-4">
            {tabs.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={cn(
                  "shrink-0 border-b-2 px-3 py-4 text-sm font-medium transition-colors md:px-4",
                  tab === item
                    ? "border-primary text-primary"
                    : "border-transparent text-muted hover:text-deep-blue"
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="p-6 md:p-8">
            {tab === "รายละเอียดสินค้า" && (
              <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted md:text-base">
                <p>
                  {product.name} ({product.sku}) เป็นผ้าคุณภาพจาก FabricFlow
                  ผลิต/คัดสรรสำหรับงานที่ต้องการเนื้อผ้ามาตรฐาน ทั้งงานปลีกและงานส่ง
                </p>
                <p>
                  เนื้อผ้า{product.material} ความกว้าง {product.width} สี{" "}
                  {product.color} เหมาะกับการตัดเย็บและงานผลิตที่ต้องการความสม่ำเสมอของคุณภาพ
                </p>
              </div>
            )}
            {tab === "คุณสมบัติ" && (
              <ul className="grid gap-3 sm:grid-cols-2">
                {[
                  `วัสดุ: ${product.material}`,
                  `ความกว้าง: ${product.width}`,
                  `สี: ${product.color}`,
                  "รองรับทั้งขายปลีกและขายส่ง",
                  product.inStock ? "มีสต็อกพร้อมส่ง" : "รอเติมสต็อก",
                  "คุณภาพมาตรฐานองค์กร",
                ].map((item) => (
                  <li
                    key={item}
                    className="rounded-xl bg-bg-light px-4 py-3 text-sm text-deep-blue"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {tab === "ข้อมูลเนื้อผ้า" && (
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      ["ชื่อสินค้า", product.name],
                      ["SKU", product.sku],
                      ["Material", product.material],
                      ["Width", product.width],
                      ["Color", product.color],
                      ["หน่วยขาย", "เมตร"],
                    ].map(([label, value]) => (
                      <tr key={label} className="border-b border-border last:border-0">
                        <th className="w-40 bg-bg-light px-4 py-3 text-left font-medium text-deep-blue">
                          {label}
                        </th>
                        <td className="px-4 py-3 text-muted">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {tab === "วิธีดูแล" && (
              <ul className="max-w-2xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted md:text-base">
                <li>แนะนำซักตามประเภทเนื้อผ้า และทดสอบสีก่อนใช้งานจริง</li>
                <li>หลีกเลี่ยงอุณหภูมิสูงเกินความเหมาะสมของวัสดุ</li>
                <li>เก็บในที่แห้ง หลีกเลี่ยงความชื้นและแสงแดดโดยตรง</li>
                <li>สำหรับงานผลิตจำนวนมาก ควรตัดตัวอย่างก่อนสั่งล็อตใหญ่</li>
              </ul>
            )}
            {tab === "Shipping" && (
              <div className="max-w-2xl space-y-3 text-sm leading-relaxed text-muted md:text-base">
                <p>จัดส่งทั่วประเทศ แพ็คอย่างระมัดระวังสำหรับม้วนผ้าและเศษตัด</p>
                <p>ระยะเวลาจัดส่งโดยประมาณ 1–3 วันทำการ (ขึ้นกับปลายทางและสต็อก)</p>
                <p>ลูกค้าองค์กรสามารถขอใบเสนอราคาและเงื่อนไขเครดิตได้</p>
              </div>
            )}
            {tab === "Reviews" && (
              <div className="space-y-4">
                {[
                  {
                    name: "คุณนภา",
                    text: "เนื้อผ้าสม่ำเสมอ ตัดง่าย ใช้ทำยูนิฟอร์มชุดเล็กได้ดีมาก",
                  },
                  {
                    name: "โรงงาน BKK Apparel",
                    text: "ราคาส่งชัดเจน สต็อกพร้อม ส่งไว เหมาะกับออเดอร์ต่อเนื่อง",
                  },
                ].map((review) => (
                  <div
                    key={review.name}
                    className="rounded-xl border border-border px-4 py-4"
                  >
                    <div className="flex items-center gap-1 text-accent">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-accent" />
                      ))}
                    </div>
                    <p className="mt-2 text-sm font-medium text-deep-blue">
                      {review.name}
                    </p>
                    <p className="mt-1 text-sm text-muted">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12 md:mt-16">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Related
                </p>
                <h2 className="mt-2 heading-display text-2xl text-deep-blue">
                  สินค้าที่เกี่ยวข้อง
                </h2>
              </div>
              <Link
                href={`/products?cat=${product.categoryId}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                ดูเพิ่มเติม
              </Link>
            </div>
            <RelatedProductsSlider products={related} />
          </div>
        )}
      </div>

      <ProductImageZoom
        open={zoomOpen}
        images={gallery}
        activeIndex={activeImage}
        alt={`${product.name} - ${selectedColor?.name ?? product.color}`}
        onClose={() => setZoomOpen(false)}
        onChangeIndex={setActiveImage}
      />
    </div>
  );
}
