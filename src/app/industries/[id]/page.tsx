import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { IndustryDetailView } from "@/components/industries/IndustryDetailView";
import type { ProductCardProps } from "@/components/commerce/ProductCard";
import { api } from "@/lib/api";
import { toIndustryDetail } from "@/lib/industries";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const industry = await api.industry(id);
    return {
      title: industry.nameTh,
      description: industry.intro || industry.description || undefined,
    };
  } catch {
    return { title: "อุตสาหกรรม" };
  }
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { id } = await params;

  let industryRaw;
  try {
    industryRaw = await api.industry(id);
  } catch {
    notFound();
  }

  const industry = toIndustryDetail(industryRaw);

  const [allIndustries, productsRaw] = await Promise.all([
    api
      .industries()
      .then((rows) => rows.map(toIndustryDetail))
      .catch(() => [industry]),
    api
      .products({ industry: id })
      .then((rows) => rows as ProductCardProps[])
      .catch(() => [] as ProductCardProps[]),
  ]);

  const products: ProductCardProps[] = productsRaw.map((raw) => {
    const p = raw as ProductCardProps & { badge?: ProductCardProps["badge"] };
    return {
      id: String(p.id),
      name: p.name,
      sku: p.sku,
      material: p.material,
      width: p.width,
      color: p.color,
      retailPrice: Number(p.retailPrice),
      wholesalePrice: Number(p.wholesalePrice),
      inStock: Boolean(p.inStock),
      badge: p.badge,
      image: p.image,
    };
  });

  return (
    <IndustryDetailView
      industry={industry}
      products={products}
      otherIndustries={allIndustries.filter((item) => item.id !== industry.id)}
    />
  );
}
