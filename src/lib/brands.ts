export type ApiBrand = {
  id: string;
  slug: string;
  name: string;
  nameTh: string | null;
  tagline: string | null;
  description: string | null;
  image: string | null;
  logo: string | null;
  websiteUrl: string | null;
  country: string | null;
  isFeatured: boolean;
};

const FALLBACK =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=85";

export function brandCover(brand: ApiBrand): string {
  return brand.image || brand.logo || FALLBACK;
}

export function brandDisplayName(brand: ApiBrand): string {
  return brand.nameTh?.trim() || brand.name;
}
