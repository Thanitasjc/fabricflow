export type CatalogProductSnapshot = {
  id: string;
  name: string;
  sku: string;
  material: string;
  width: string;
  color: string;
  retailPrice: number;
  wholesalePrice: number;
  inStock: boolean;
  image: string;
  badge?: string;
};

export const COMPARE_MAX = 4;

export function toCatalogSnapshot(product: {
  id: string;
  name: string;
  sku: string;
  material: string;
  width: string;
  color: string;
  retailPrice: number;
  wholesalePrice: number;
  inStock: boolean;
  image: string;
  badge?: string;
}): CatalogProductSnapshot {
  return {
    id: product.id,
    name: product.name,
    sku: product.sku,
    material: product.material,
    width: product.width,
    color: product.color,
    retailPrice: product.retailPrice,
    wholesalePrice: product.wholesalePrice,
    inStock: product.inStock,
    image: product.image,
    badge: product.badge,
  };
}
