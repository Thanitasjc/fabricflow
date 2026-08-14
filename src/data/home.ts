export const categories = [
  {
    id: "suiting",
    nameTh: "ผ้าสูท",
    nameEn: "Suiting Fabric",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
  },
  {
    id: "cotton",
    nameTh: "ผ้าคอตตอน",
    nameEn: "Cotton Fabric",
    image:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
  },
  {
    id: "denim",
    nameTh: "ผ้ายีนส์",
    nameEn: "Denim",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
  },
  {
    id: "uniform",
    nameTh: "ผ้ายูนิฟอร์ม",
    nameEn: "Uniform Fabric",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
  },
  {
    id: "shirting",
    nameTh: "ผ้าเชิ้ต",
    nameEn: "Shirting Fabric",
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80",
  },
  {
    id: "fashion",
    nameTh: "ผ้าแฟชั่น",
    nameEn: "Fashion Fabric",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
  },
];

export type ProductBadge = "ขายดี" | "ใหม่" | "ราคาส่ง";

export type IndustryId =
  | "interior-furniture"
  | "automotive"
  | "medical"
  | "arts-entertainment"
  | "uniform-hospitality"
  | "agriculture-manufacturing";

export type CategoryId =
  | "suiting"
  | "cotton"
  | "denim"
  | "uniform"
  | "shirting"
  | "fashion";

export interface ProductColor {
  id: string;
  name: string;
  code: string;
  image: string;
  inStock: boolean;
  retailPrice?: number;
  wholesalePrice?: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  material: string;
  width: string;
  color: string;
  retailPrice: number;
  wholesalePrice: number;
  inStock: boolean;
  badge?: ProductBadge;
  image: string;
  categoryId: CategoryId;
  industryIds: IndustryId[];
  colors?: ProductColor[];
}

const COLOR_IMAGE_POOL = [
  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1200&q=85",
  "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200&q=85",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=85",
  "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=85",
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=85",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=85",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85",
];

const DEFAULT_COLOR_NAMES = [
  "01-IVORY",
  "02-SAND",
  "03-OLIVE",
  "04-NAVY",
  "05-CHARCOAL",
  "06-ROSE",
];

export const products: Product[] = [
  {
    id: "ct-001",
    name: "ผ้าคอตตอน Premium",
    sku: "CT-001",
    material: "Cotton",
    width: "150 cm",
    color: "Ivory",
    retailPrice: 120,
    wholesalePrice: 95,
    inStock: true,
    badge: "ขายดี",
    image:
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80",
    categoryId: "cotton",
    industryIds: ["uniform-hospitality", "arts-entertainment"],
  },
  {
    id: "dn-012",
    name: "ผ้ายีนส์ Classic Indigo",
    sku: "DN-012",
    material: "Denim",
    width: "150 cm",
    color: "Indigo",
    retailPrice: 185,
    wholesalePrice: 155,
    inStock: true,
    badge: "ใหม่",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
    categoryId: "denim",
    industryIds: ["arts-entertainment", "uniform-hospitality"],
  },
  {
    id: "st-008",
    name: "ผ้าสูท Wool Blend",
    sku: "ST-008",
    material: "Wool Blend",
    width: "150 cm",
    color: "Charcoal",
    retailPrice: 320,
    wholesalePrice: 275,
    inStock: true,
    badge: "ราคาส่ง",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    categoryId: "suiting",
    industryIds: ["uniform-hospitality"],
  },
  {
    id: "uf-021",
    name: "ผ้ายูนิฟอร์ม ToughWear",
    sku: "UF-021",
    material: "Polyester Cotton",
    width: "150 cm",
    color: "Navy",
    retailPrice: 95,
    wholesalePrice: 78,
    inStock: true,
    badge: "ขายดี",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    categoryId: "uniform",
    industryIds: ["uniform-hospitality", "medical", "agriculture-manufacturing"],
  },
  {
    id: "sh-005",
    name: "ผ้าเชิ้ต Fine Stripe",
    sku: "SH-005",
    material: "Cotton Poplin",
    width: "145 cm",
    color: "Sky Blue",
    retailPrice: 140,
    wholesalePrice: 112,
    inStock: true,
    badge: "ใหม่",
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80",
    categoryId: "shirting",
    industryIds: ["uniform-hospitality", "medical"],
  },
  {
    id: "ln-003",
    name: "ผ้าลินิน Natural",
    sku: "LN-003",
    material: "Linen",
    width: "140 cm",
    color: "Natural",
    retailPrice: 210,
    wholesalePrice: 178,
    inStock: false,
    image:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    categoryId: "fashion",
    industryIds: ["interior-furniture", "arts-entertainment"],
  },
  {
    id: "tw-017",
    name: "ผ้าทวีล Premium",
    sku: "TW-017",
    material: "Twill",
    width: "150 cm",
    color: "Olive",
    retailPrice: 165,
    wholesalePrice: 138,
    inStock: true,
    badge: "ราคาส่ง",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
    categoryId: "fashion",
    industryIds: ["automotive", "agriculture-manufacturing"],
  },
  {
    id: "ct-014",
    name: "ผ้าคอตตอน Soft Touch",
    sku: "CT-014",
    material: "Cotton",
    width: "150 cm",
    color: "White",
    retailPrice: 110,
    wholesalePrice: 88,
    inStock: true,
    badge: "ขายดี",
    image:
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80",
    categoryId: "cotton",
    industryIds: ["medical", "uniform-hospitality"],
  },
  {
    id: "hm-101",
    name: "ผ้าบุโซฟา Haven Soft",
    sku: "HM-101",
    material: "Polyester",
    width: "140 cm",
    color: "Beige",
    retailPrice: 280,
    wholesalePrice: 230,
    inStock: true,
    badge: "ขายดี",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    categoryId: "fashion",
    industryIds: ["interior-furniture"],
  },
  {
    id: "hm-102",
    name: "ผ้าม่าน Drape Soft",
    sku: "HM-102",
    material: "Polyester",
    width: "280 cm",
    color: "Warm Grey",
    retailPrice: 195,
    wholesalePrice: 160,
    inStock: true,
    badge: "ใหม่",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
    categoryId: "fashion",
    industryIds: ["interior-furniture"],
  },
  {
    id: "hm-103",
    name: "ผ้าบุกำมะหยี่ Velvet Luxe",
    sku: "HM-103",
    material: "Velvet Polyester",
    width: "140 cm",
    color: "Emerald",
    retailPrice: 420,
    wholesalePrice: 360,
    inStock: true,
    badge: "ราคาส่ง",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    categoryId: "fashion",
    industryIds: ["interior-furniture"],
  },
  {
    id: "hm-104",
    name: "ผ้า Petcare Guard",
    sku: "HM-104",
    material: "Polyester",
    width: "140 cm",
    color: "Sand",
    retailPrice: 310,
    wholesalePrice: 265,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    categoryId: "fashion",
    industryIds: ["interior-furniture"],
  },
  {
    id: "au-201",
    name: "ผ้าเบาะรถยนต์ Drive Pro",
    sku: "AU-201",
    material: "Polyester",
    width: "150 cm",
    color: "Black",
    retailPrice: 260,
    wholesalePrice: 215,
    inStock: true,
    badge: "ขายดี",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    categoryId: "fashion",
    industryIds: ["automotive"],
  },
  {
    id: "au-202",
    name: "ผ้า Cabin Comfort",
    sku: "AU-202",
    material: "Polyester Blend",
    width: "150 cm",
    color: "Graphite",
    retailPrice: 245,
    wholesalePrice: 200,
    inStock: true,
    badge: "ใหม่",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    categoryId: "fashion",
    industryIds: ["automotive"],
  },
  {
    id: "au-203",
    name: "ผ้า Fleet Tough",
    sku: "AU-203",
    material: "Heavy Polyester",
    width: "150 cm",
    color: "Charcoal",
    retailPrice: 290,
    wholesalePrice: 240,
    inStock: true,
    badge: "ราคาส่ง",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
    categoryId: "uniform",
    industryIds: ["automotive", "agriculture-manufacturing"],
  },
  {
    id: "md-301",
    name: "ผ้าสครับ CareWear",
    sku: "MD-301",
    material: "Polyester Cotton",
    width: "150 cm",
    color: "Ceil Blue",
    retailPrice: 135,
    wholesalePrice: 108,
    inStock: true,
    badge: "ขายดี",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    categoryId: "uniform",
    industryIds: ["medical"],
  },
  {
    id: "md-302",
    name: "ผ้า Clinic Soft",
    sku: "MD-302",
    material: "Cotton Rich",
    width: "150 cm",
    color: "White",
    retailPrice: 125,
    wholesalePrice: 98,
    inStock: true,
    badge: "ใหม่",
    image:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80",
    categoryId: "cotton",
    industryIds: ["medical", "uniform-hospitality"],
  },
  {
    id: "md-303",
    name: "ผ้า Hygiene Soft",
    sku: "MD-303",
    material: "Polyester",
    width: "150 cm",
    color: "Light Grey",
    retailPrice: 118,
    wholesalePrice: 92,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1581595220892-b0739db3b8c5?w=800&q=80",
    categoryId: "uniform",
    industryIds: ["medical"],
  },
  {
    id: "ar-401",
    name: "ผ้าพิมพ์ Print Lab Base",
    sku: "AR-401",
    material: "Polyester",
    width: "150 cm",
    color: "White",
    retailPrice: 95,
    wholesalePrice: 78,
    inStock: true,
    badge: "ขายดี",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    categoryId: "fashion",
    industryIds: ["arts-entertainment"],
  },
  {
    id: "ar-402",
    name: "ผ้าคราฟต์ Craft Studio",
    sku: "AR-402",
    material: "Cotton",
    width: "145 cm",
    color: "Natural",
    retailPrice: 130,
    wholesalePrice: 105,
    inStock: true,
    badge: "ใหม่",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    categoryId: "cotton",
    industryIds: ["arts-entertainment", "interior-furniture"],
  },
  {
    id: "ar-403",
    name: "ผ้า Color Play Graphic",
    sku: "AR-403",
    material: "Polyester",
    width: "150 cm",
    color: "Multi",
    retailPrice: 155,
    wholesalePrice: 128,
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&q=80",
    categoryId: "fashion",
    industryIds: ["arts-entertainment"],
  },
  {
    id: "uh-501",
    name: "ผ้า Service Wear Pro",
    sku: "UH-501",
    material: "Polyester Cotton",
    width: "150 cm",
    color: "Black",
    retailPrice: 105,
    wholesalePrice: 86,
    inStock: true,
    badge: "ขายดี",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    categoryId: "uniform",
    industryIds: ["uniform-hospitality"],
  },
  {
    id: "uh-502",
    name: "ผ้า Hotel Line Soft",
    sku: "UH-502",
    material: "Cotton Blend",
    width: "150 cm",
    color: "Ivory",
    retailPrice: 145,
    wholesalePrice: 118,
    inStock: true,
    badge: "ราคาส่ง",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    categoryId: "shirting",
    industryIds: ["uniform-hospitality"],
  },
  {
    id: "ag-601",
    name: "ผ้า Field Guard Outdoor",
    sku: "AG-601",
    material: "Coated Polyester",
    width: "150 cm",
    color: "Olive",
    retailPrice: 175,
    wholesalePrice: 145,
    inStock: true,
    badge: "ขายดี",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    categoryId: "uniform",
    industryIds: ["agriculture-manufacturing"],
  },
  {
    id: "ag-602",
    name: "ผ้า Plant Wear Heavy",
    sku: "AG-602",
    material: "Canvas",
    width: "150 cm",
    color: "Khaki",
    retailPrice: 160,
    wholesalePrice: 132,
    inStock: true,
    badge: "ใหม่",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    categoryId: "uniform",
    industryIds: ["agriculture-manufacturing", "automotive"],
  },
  {
    id: "ag-603",
    name: "ผ้า Cover Tech Shield",
    sku: "AG-603",
    material: "Technical Polyester",
    width: "150 cm",
    color: "Grey",
    retailPrice: 190,
    wholesalePrice: 155,
    inStock: true,
    badge: "ราคาส่ง",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80",
    categoryId: "fashion",
    industryIds: ["agriculture-manufacturing"],
  },
];

export function getProductsByIndustry(industryId: string) {
  return products.filter((product) =>
    product.industryIds.includes(industryId as IndustryId)
  );
}

export function getProductsByCategory(categoryId: string) {
  return products.filter((product) => product.categoryId === categoryId);
}

export function filterProducts(options?: {
  categoryId?: string;
  industryId?: string;
}) {
  let result = products;
  if (options?.categoryId) {
    result = result.filter((p) => p.categoryId === options.categoryId);
  }
  if (options?.industryId) {
    result = result.filter((p) =>
      p.industryIds.includes(options.industryId as IndustryId)
    );
  }
  return result;
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getRelatedProducts(product: Product, limit = 10) {
  return products
    .filter(
      (item) =>
        item.id !== product.id &&
        (item.categoryId === product.categoryId ||
          item.industryIds.some((id) => product.industryIds.includes(id)))
    )
    .slice(0, limit);
}

export function getProductColors(product: Product): ProductColor[] {
  if (product.colors?.length) return product.colors;

  const seed = product.sku
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  const count = 4 + (seed % 3); // 4–6 colors
  const colors: ProductColor[] = [];

  for (let i = 0; i < count; i++) {
    const imageIndex = (seed + i * 3) % COLOR_IMAGE_POOL.length;
    const image =
      i === 0
        ? product.image.replace("w=800", "w=1200")
        : COLOR_IMAGE_POOL[imageIndex];

    colors.push({
      id: `${product.id}-color-${i + 1}`,
      name: i === 0 ? `${DEFAULT_COLOR_NAMES[0].split("-")[0]}-${product.color.toUpperCase().replace(/\s+/g, "-")}` : DEFAULT_COLOR_NAMES[i] || `0${i + 1}-COLOR`,
      code: product.sku,
      image,
      inStock: i === 3 ? false : true, // demo one unavailable color
      retailPrice: product.retailPrice + (i > 2 ? 10 : 0),
      wholesalePrice: product.wholesalePrice + (i > 2 ? 8 : 0),
    });
  }

  return colors;
}

export function getProductGallery(
  product: Product,
  selectedColor?: ProductColor
) {
  const main = (selectedColor?.image || product.image).replace("w=800", "w=1200");
  const extras = COLOR_IMAGE_POOL.filter((src) => src !== main).slice(0, 3);
  return [main, ...extras];
}

export function getProductStockMeters(product: Product) {
  if (!product.inStock) return 0;
  // Deterministic mock stock from sku
  const seed = product.sku
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return 400 + (seed % 1600);
}

export const pricingTiers = [
  {
    name: "Retail",
    range: "1–9 เมตร",
    price: 120,
    featured: false,
  },
  {
    name: "Wholesale",
    range: "10–49 เมตร",
    price: 110,
    featured: false,
  },
  {
    name: "Wholesale Pro",
    range: "50–99 เมตร",
    price: 100,
    featured: true,
  },
  {
    name: "Dealer",
    range: "100+ เมตร",
    price: 90,
    featured: false,
  },
];

export interface Article {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  readTime: string;
  content: string[];
}

export const articles: Article[] = [
  {
    id: "1",
    category: "คู่มือเลือกผ้า",
    date: "12 ส.ค. 2026",
    title: "วิธีเลือกผ้าให้เหมาะกับการใช้งาน",
    excerpt:
      "เคล็ดลับเลือกเนื้อผ้าให้เหมาะกับเสื้อผ้า ยูนิฟอร์ม และงานตัดเย็บแต่ละประเภท",
    image:
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1200&q=85",
    author: "FabricFlow Team",
    readTime: "5 นาที",
    content: [
      "การเลือกผ้าให้เหมาะกับงานเป็นจุดเริ่มต้นสำคัญของทั้งธุรกิจตัดเย็บและงาน DIY เพราะเนื้อผ้าแต่ละชนิดมีคุณสมบัติต่างกัน ทั้งความหนา ความยืดหยุ่น การระบายอากาศ และการดูแลรักษา",
      "ก่อนตัดสินใจควรเริ่มจากคำถามพื้นฐาน เช่น จะนำไปตัดเป็นเสื้อผ้าประเภทใด ใช้งานหนักแค่ไหน ต้องซักบ่อยหรือไม่ และต้องการภาพลักษณ์แบบไหน เช่น ทางการ ลำลอง หรือยูนิฟอร์มองค์กร",
      "สำหรับงานเสื้อเชิ้ตและยูนิฟอร์ม แนะนำผ้าคอตตอนหรือผ้าผสมโพลีเอสเตอร์ที่คงทรง ซักง่าย และไม่ยับง่าย ส่วนงานสูทควรเลือกผ้าสูทหรือวูลเบลนด์ที่ให้โครงสร้างดีและดูพรีเมียม",
      "หากเป็นงานแฟชั่นที่ต้องการความนุ่มและทิ้งตัวดี อาจพิจารณาผ้าลินิน ชีฟอง หรือผ้าทอเบา ขึ้นกับฤดูกาลและการออกแบบ ส่วนงานยีนส์ควรดูน้ำหนักออนซ์และความยืดของเนื้อผ้า",
      "ท้ายที่สุด การขอตัวอย่างผ้าและทดสอบตัดจริงจะช่วยลดความเสี่ยง โดยเฉพาะออเดอร์จำนวนมากหรืองานแบรนด์ที่ต้องการคุณภาพสม่ำเสมอในทุกล็อต",
    ],
  },
  {
    id: "2",
    category: "ความรู้ผ้า",
    date: "5 ส.ค. 2026",
    title: "Cotton คืออะไร?",
    excerpt:
      "ทำความเข้าใจคุณสมบัติของผ้าคอตตอน ข้อดี และการดูแลรักษาอย่างถูกต้อง",
    image:
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1200&q=85",
    author: "FabricFlow Team",
    readTime: "4 นาที",
    content: [
      "ผ้าคอตตอน หรือผ้าฝ้าย เป็นเส้นใยธรรมชาติที่ได้รับความนิยมสูงในอุตสาหกรรมสิ่งทอ เพราะสัมผัสนุ่ม ระบายอากาศดี และสวมใส่สบายในอากาศร้อนชื้นอย่างประเทศไทย",
      "จุดเด่นของคอตตอนคือการดูดซับความชื้นได้ดี ทำให้รู้สึกเย็นสบาย แต่ก็ยับง่ายกว่าผ้าสังเคราะห์บางชนิด ดังนั้นงานที่ต้องการความเรียบตลอดวันอาจเลือกคอตตอนผสมโพลีเอสเตอร์",
      "คอตตอนมีหลายเกรดและหลายการทอ เช่น Plain, Twill, Poplin หรือ Interlock ซึ่งให้ผิวสัมผัสและการใช้งานต่างกัน เหมาะทั้งเสื้อยืด เสื้อเชิ้ต ชุดลำลอง และงานโฮมเท็กซ์ไทล์",
      "การดูแลรักษาแนะนำซักด้วยน้ำอุณหภูมิที่เหมาะสม หลีกเลี่ยงความร้อนสูงเกินไปตอนอบหรือรีด และแยกสีอ่อน-สีเข้มเพื่อรักษาโทนสีให้คงทน",
      "สำหรับธุรกิจ FabricFlow มีผ้าคอตตอนทั้งเกรดปลีกและราคาส่ง พร้อมสต็อกหลากสี เพื่อรองรับทั้งร้านค้า โรงงาน และแบรนด์เสื้อผ้า",
    ],
  },
  {
    id: "3",
    category: "ยูนิฟอร์ม",
    date: "28 ก.ค. 2026",
    title: "วิธีเลือกผ้าสำหรับทำ Uniform",
    excerpt:
      "แนะนำเนื้อผ้าทนทาน ซักง่าย และเหมาะกับองค์กร โรงงาน และสถาบันการศึกษา",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=85",
    author: "FabricFlow Team",
    readTime: "6 นาที",
    content: [
      "ผ้ายูนิฟอร์มต้องตอบโจทย์ทั้งภาพลักษณ์องค์กรและความทนทานในชีวิตจริง เพราะถูกใช้งานและซักบ่อย โดยเฉพาะในโรงงาน โรงแรม โรงพยาบาล และโรงเรียน",
      "คุณสมบัติที่ควรมีคือ คงทรง สีไม่ตกง่าย ยับน้อย ระบายอากาศพอสมควร และดูแลง่ายในระบบซักจำนวนมาก หากเป็นงานหน้างานหนัก ควรเลือกเนื้อผ้าที่ทนแรงเสียดทาน",
      "วัสดุยอดนิยมคือ Polyester Cotton หรือ TC เพราะสมดุลระหว่างความทนและการสวมใส่สบาย ส่วนงานต้อนรับหรือออฟฟิศอาจใช้ผ้าเชิ้ตเนื้อเรียบเพื่อลุคสุภาพกว่า",
      "นอกจากชนิดผ้า ควรกำหนดมาตรฐานสี ความกว้าง และจำนวนเผื่อต่อขนาดชุดให้ชัดเจน เพื่อให้การผลิตแต่ละล็อตได้ผลลัพธ์ใกล้เคียงกัน",
      "FabricFlow รองรับทั้งขายปลีกตัวอย่าง ขายส่งจำนวนมาก และใบเสนอราคาสำหรับองค์กร พร้อมแนะนำผ้าให้เหมาะกับประเภทงานและงบประมาณ",
    ],
  },
  {
    id: "4",
    category: "Denim",
    date: "20 ก.ค. 2026",
    title: "รู้จัก Denim แต่ละประเภท",
    excerpt:
      "แยกประเภทยีนส์ตั้งแต่น้ำหนักเบาถึงหนัก พร้อมคำแนะนำการเลือกใช้ในงานแฟชั่น",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=85",
    author: "FabricFlow Team",
    readTime: "5 นาที",
    content: [
      "Denim เป็นผ้าทอชนิดหนึ่งที่ขึ้นชื่อเรื่องความทนทานและเอกลักษณ์ของลายทแยง โดยถูกใช้ในกางเกงยีนส์ แจ็กเก็ต กระโปรง และสินค้าแฟชั่นหลากหลาย",
      "การเลือก Denim มักดูจากน้ำหนักเป็นออนซ์ (oz) ผ้าเบาเหมาะกับเสื้อและกางเกงฤดูร้อน ผ้ากลางใช้งานทั่วไป ส่วนผ้าหนักให้รูปทรงชัดและดูพรีเมียมกว่า",
      "นอกจากน้ำหนัก ยังมีปัจจัยอย่าง stretch, raw denim, washed denim และสีอินดิโก้โทนต่าง ๆ ซึ่งส่งผลต่อทั้งลุคและการสวมใส่",
      "สำหรับแบรนด์แฟชั่น ควรทดสอบการหดตัวหลังซักและการยึดคืนรูปของผ้ายืด เพื่อควบคุมคุณภาพไซส์หลังผลิตจริง",
      "ที่ FabricFlow มีตัวเลือก Denim สำหรับงานปลีกและงานส่ง พร้อมแนะนำสเปกให้เหมาะกับคอลเลกชันของคุณ",
    ],
  },
];

export function getArticleById(id: string) {
  return articles.find((article) => article.id === id);
}

export function getRelatedArticles(article: Article, limit = 3) {
  return articles
    .filter(
      (item) => item.id !== article.id && item.category === article.category
    )
    .concat(
      articles.filter(
        (item) => item.id !== article.id && item.category !== article.category
      )
    )
    .slice(0, limit);
}

export const highlights = [
  {
    number: "01",
    titleTh: "ผ้าหลากหลายประเภท",
    titleEn: "Fabric Variety",
    description: "คอตตอน ยีนส์ สูท ยูนิฟอร์ม และผ้าแฟชั่นครบวงจร",
  },
  {
    number: "02",
    titleTh: "คุณภาพมาตรฐาน",
    titleEn: "Premium Quality",
    description: "คัดสรรเนื้อผ้าคุณภาพสำหรับธุรกิจและแบรนด์แฟชั่น",
  },
  {
    number: "03",
    titleTh: "มีสินค้าพร้อมส่ง",
    titleEn: "Ready Stock",
    description: "สต็อกพร้อมใช้งาน รองรับทั้งขายปลีกและขายส่ง",
  },
  {
    number: "04",
    titleTh: "จัดส่งทั่วประเทศ",
    titleEn: "Nationwide Delivery",
    description: "บริการจัดส่งรวดเร็ว ครอบคลุมทุกจังหวัด",
  },
];

export const orderSteps = [
  {
    number: "01",
    title: "เลือกสินค้า",
    description: "เลือกชนิดผ้า สี และจำนวนที่ต้องการจากแคตตาล็อก",
  },
  {
    number: "02",
    title: "ระบุจำนวน / ขอราคา",
    description: "สั่งซื้อออนไลน์ หรือขอใบเสนอราคาสำหรับลูกค้าองค์กร",
  },
  {
    number: "03",
    title: "ชำระเงิน",
    description: "รองรับโอนเงิน QR บัตรเครดิต COD และบัญชีเครดิต",
  },
  {
    number: "04",
    title: "จัดส่งสินค้า",
    description: "แพ็คอย่างระมัดระวังและจัดส่งทั่วประเทศ",
  },
];

export const collections = [
  {
    id: "denim",
    title: "Denim Collection",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80",
    size: "large" as const,
  },
  {
    id: "cotton",
    title: "Cotton Collection",
    image:
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80",
    size: "medium" as const,
  },
  {
    id: "suiting",
    title: "Suiting Collection",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    size: "medium" as const,
  },
  {
    id: "uniform",
    title: "Uniform Collection",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    size: "small" as const,
  },
  {
    id: "texture",
    title: "Texture Studio",
    image:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    size: "small" as const,
  },
];
