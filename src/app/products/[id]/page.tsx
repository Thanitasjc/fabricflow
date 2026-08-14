import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetailView } from "@/components/commerce/ProductDetailView";
import {
  getProductById,
  getProductColors,
  getProductStockMeters,
  getRelatedProducts,
  products,
} from "@/data/home";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "สินค้า" };
  return {
    title: product.name,
    description: `${product.name} (${product.sku}) — ${product.material} · ${product.width} · ราคาปลีก ฿${product.retailPrice}/เมตร`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <ProductDetailView
      product={product}
      colors={getProductColors(product)}
      stockMeters={getProductStockMeters(product)}
      related={getRelatedProducts(product)}
    />
  );
}
