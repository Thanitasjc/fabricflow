export type SiteBranding = {
  logo: string | null;
  brandName: string;
  brandAccent: string;
  tagline: string | null;
  showText: boolean;
};

export const defaultBranding: SiteBranding = {
  logo: null,
  brandName: "FabricFlow",
  brandAccent: "Flow",
  tagline: null,
  showText: true,
};

export function splitBrandName(brandName: string, brandAccent: string) {
  if (brandAccent && brandName.endsWith(brandAccent)) {
    return {
      base: brandName.slice(0, -brandAccent.length),
      accent: brandAccent,
    };
  }
  return { base: brandName, accent: "" };
}
