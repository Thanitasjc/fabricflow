import type { SiteBranding } from "@/lib/branding";
import type { ApiBrand } from "@/lib/brands";
import type { ApiIndustry } from "@/lib/industries";
import type { NavMenuItem } from "@/lib/menu";

export type HeroSlideCta = {
  label: string | null;
  url: string | null;
};

export type HeroSlide = {
  id: number;
  eyebrow: string | null;
  titleLine1: string;
  titleLine2: string | null;
  description: string | null;
  image: string | null;
  primaryCta: HeroSlideCta;
  secondaryCta: HeroSlideCta;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

type FetchOptions = RequestInit & { revalidate?: number };

async function apiFetch<T>(path: string, init?: FetchOptions): Promise<T> {
  const { revalidate, ...rest } = init ?? {};
  const isServer = typeof window === "undefined";

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(rest.headers ?? {}),
    },
    ...(isServer && revalidate !== undefined
      ? { next: { revalidate } }
      : { cache: rest.cache ?? "no-store" }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `API ${path} failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  categories: () => apiFetch<unknown[]>("/categories", { revalidate: 60 }),
  products: (params?: Record<string, string>) => {
    const qs = params ? `?${new URLSearchParams(params)}` : "";
    return apiFetch<unknown[]>(`/products${qs}`, { revalidate: 60 });
  },
  product: (slug: string) =>
    apiFetch<unknown>(`/products/${slug}`, { revalidate: 60 }),
  industries: () => apiFetch<ApiIndustry[]>("/industries", { revalidate: 30 }),
  industry: (slug: string) =>
    apiFetch<ApiIndustry>(`/industries/${slug}`, { revalidate: 30 }),
  articles: () => apiFetch<unknown[]>("/articles", { revalidate: 60 }),
  article: (slug: string) =>
    apiFetch<unknown>(`/articles/${slug}`, { revalidate: 60 }),
  services: () => apiFetch<unknown[]>("/services", { revalidate: 60 }),
  service: (slug: string) =>
    apiFetch<unknown>(`/services/${slug}`, { revalidate: 60 }),
  heroSlides: () =>
    apiFetch<HeroSlide[]>("/hero-slides", { revalidate: 0, cache: "no-store" }),
  branding: () =>
    apiFetch<SiteBranding>("/branding", { revalidate: 30 }),
  brands: () => apiFetch<ApiBrand[]>("/brands", { revalidate: 30 }),
  brand: (slug: string) =>
    apiFetch<ApiBrand>(`/brands/${slug}`, { revalidate: 30 }),
  menus: (location = "header") =>
    apiFetch<NavMenuItem[]>(`/menus?location=${location}`, { revalidate: 30 }),
  contact: (body: {
    name: string;
    phone?: string;
    email?: string;
    topic?: string;
    message: string;
  }) =>
    apiFetch<{ ok: boolean; id: number }>("/contact", {
      method: "POST",
      body: JSON.stringify(body),
      cache: "no-store",
    }),
};

export { API_URL };
