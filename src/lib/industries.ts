import type { IndustryDetail } from "@/data/industries";

export type ApiIndustry = {
  id: string;
  slug: string;
  nameTh: string;
  nameEn: string | null;
  description: string | null;
  intro: string | null;
  guideTitle: string | null;
  guideBody: string[] | null;
  image: string | null;
  collections?: Array<{
    id: number | string;
    name: string;
    description: string | null;
    image: string | null;
  }>;
};

export type IndustryCard = {
  id: string;
  nameTh: string;
  image: string;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1800&q=85";

export function toIndustryCard(item: ApiIndustry): IndustryCard {
  return {
    id: item.slug || item.id,
    nameTh: item.nameTh,
    image: item.image || FALLBACK_IMAGE,
  };
}

export function toIndustryDetail(item: ApiIndustry): IndustryDetail {
  return {
    id: item.slug || item.id,
    nameTh: item.nameTh,
    nameEn: item.nameEn || item.nameTh,
    description: item.description || "",
    image: item.image || FALLBACK_IMAGE,
    intro: item.intro || item.description || "",
    guideTitle: item.guideTitle || "",
    guideBody: item.guideBody ?? [],
    collections: (item.collections ?? []).map((c) => ({
      id: String(c.id),
      name: c.name,
      description: c.description || "",
      image: c.image || FALLBACK_IMAGE,
    })),
  };
}
