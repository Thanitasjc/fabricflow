"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  COMPARE_MAX,
  type CatalogProductSnapshot,
} from "@/lib/catalog-lists";

const FAVORITES_KEY = "ff_favorites";
const COMPARE_KEY = "ff_compare";

type CatalogListsContextValue = {
  favorites: CatalogProductSnapshot[];
  compare: CatalogProductSnapshot[];
  ready: boolean;
  isFavorite: (id: string) => boolean;
  isCompared: (id: string) => boolean;
  toggleFavorite: (product: CatalogProductSnapshot) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
  toggleCompare: (product: CatalogProductSnapshot) => { ok: boolean; message?: string };
  removeCompare: (id: string) => void;
  clearCompare: () => void;
};

const CatalogListsContext = createContext<CatalogListsContextValue | null>(
  null
);

function readList(key: string): CatalogProductSnapshot[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CatalogProductSnapshot[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeList(key: string, list: CatalogProductSnapshot[]) {
  localStorage.setItem(key, JSON.stringify(list));
}

export function CatalogListsProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<CatalogProductSnapshot[]>([]);
  const [compare, setCompare] = useState<CatalogProductSnapshot[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFavorites(readList(FAVORITES_KEY));
    setCompare(readList(COMPARE_KEY));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeList(FAVORITES_KEY, favorites);
  }, [favorites, ready]);

  useEffect(() => {
    if (!ready) return;
    writeList(COMPARE_KEY, compare);
  }, [compare, ready]);

  const isFavorite = useCallback(
    (id: string) => favorites.some((p) => p.id === id),
    [favorites]
  );

  const isCompared = useCallback(
    (id: string) => compare.some((p) => p.id === id),
    [compare]
  );

  const toggleFavorite = useCallback((product: CatalogProductSnapshot) => {
    setFavorites((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [product, ...prev];
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clearFavorites = useCallback(() => setFavorites([]), []);

  const toggleCompare = useCallback(
    (product: CatalogProductSnapshot) => {
      if (compare.some((p) => p.id === product.id)) {
        setCompare((prev) => prev.filter((p) => p.id !== product.id));
        return { ok: true };
      }
      if (compare.length >= COMPARE_MAX) {
        return {
          ok: false,
          message: `เปรียบเทียบได้สูงสุด ${COMPARE_MAX} รายการ`,
        };
      }
      setCompare((prev) => [...prev, product]);
      return { ok: true };
    },
    [compare]
  );

  const removeCompare = useCallback((id: string) => {
    setCompare((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clearCompare = useCallback(() => setCompare([]), []);

  const value = useMemo(
    () => ({
      favorites,
      compare,
      ready,
      isFavorite,
      isCompared,
      toggleFavorite,
      removeFavorite,
      clearFavorites,
      toggleCompare,
      removeCompare,
      clearCompare,
    }),
    [
      favorites,
      compare,
      ready,
      isFavorite,
      isCompared,
      toggleFavorite,
      removeFavorite,
      clearFavorites,
      toggleCompare,
      removeCompare,
      clearCompare,
    ]
  );

  return (
    <CatalogListsContext.Provider value={value}>
      {children}
    </CatalogListsContext.Provider>
  );
}

export function useCatalogLists() {
  const ctx = useContext(CatalogListsContext);
  if (!ctx) {
    throw new Error("useCatalogLists must be used within CatalogListsProvider");
  }
  return ctx;
}
