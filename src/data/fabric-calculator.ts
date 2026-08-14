export type GarmentSize = "S" | "M" | "L" | "XL";

export interface FabricPattern {
  id: string;
  nameTh: string;
  nameEn: string;
  /** Base estimate in yards for size M, ~150cm fabric width */
  baseYards: number;
  rangeLabel: string;
  category: string;
}

/** Size multipliers relative to M */
export const sizeMultipliers: Record<GarmentSize, number> = {
  S: 0.9,
  M: 1,
  L: 1.15,
  XL: 1.3,
};

export const fabricPatterns: FabricPattern[] = [
  {
    id: "short-skirt",
    nameTh: "กระโปรงสั้น",
    nameEn: "Short Skirt",
    baseYards: 1.75,
    rangeLabel: "1.5–2 หลา",
    category: "กระโปรง",
  },
  {
    id: "long-skirt",
    nameTh: "กระโปรงยาว",
    nameEn: "Long Skirt",
    baseYards: 2.5,
    rangeLabel: "2–3 หลา",
    category: "กระโปรง",
  },
  {
    id: "blouse",
    nameTh: "เสื้อเบลาส์",
    nameEn: "Blouse",
    baseYards: 2,
    rangeLabel: "1.75–2.25 หลา",
    category: "เสื้อ",
  },
  {
    id: "shirt",
    nameTh: "เสื้อเชิ้ต",
    nameEn: "Shirt",
    baseYards: 2.25,
    rangeLabel: "2–2.5 หลา",
    category: "เสื้อ",
  },
  {
    id: "dress",
    nameTh: "เดรส",
    nameEn: "Dress",
    baseYards: 3.5,
    rangeLabel: "3–4 หลา",
    category: "ชุด",
  },
  {
    id: "pants",
    nameTh: "กางเกงขายาว",
    nameEn: "Trousers",
    baseYards: 2.25,
    rangeLabel: "2–2.5 หลา",
    category: "กางเกง",
  },
  {
    id: "shorts",
    nameTh: "กางเกงขาสั้น",
    nameEn: "Shorts",
    baseYards: 1.5,
    rangeLabel: "1.25–1.75 หลา",
    category: "กางเกง",
  },
  {
    id: "blazer",
    nameTh: "เสื้อสูท / เบลเซอร์",
    nameEn: "Blazer",
    baseYards: 2.75,
    rangeLabel: "2.5–3.5 หลา",
    category: "สูท",
  },
  {
    id: "suit",
    nameTh: "ชุดสูท (เสื้อ+กางเกง)",
    nameEn: "Suit Set",
    baseYards: 4,
    rangeLabel: "3.5–4.5 หลา",
    category: "สูท",
  },
  {
    id: "uniform",
    nameTh: "ยูนิฟอร์ม",
    nameEn: "Uniform",
    baseYards: 2.5,
    rangeLabel: "2–3 หลา",
    category: "ยูนิฟอร์ม",
  },
  {
    id: "apron",
    nameTh: "เอี๊ยม / ผ้ากันเปื้อน",
    nameEn: "Apron",
    baseYards: 1.25,
    rangeLabel: "1–1.5 หลา",
    category: "อื่นๆ",
  },
  {
    id: "jacket",
    nameTh: "แจ็กเก็ต",
    nameEn: "Jacket",
    baseYards: 3,
    rangeLabel: "2.5–3.5 หลา",
    category: "เสื้อ",
  },
];

export function estimateFabricYards(
  patternId: string,
  size: GarmentSize,
  quantity: number
): number {
  const pattern = fabricPatterns.find((p) => p.id === patternId);
  if (!pattern || quantity < 1) return 0;
  const yards = pattern.baseYards * sizeMultipliers[size] * quantity;
  return Math.ceil(yards * 10) / 10;
}

export function yardsToMeters(yards: number): number {
  return Math.ceil(yards * 0.9144 * 10) / 10;
}
