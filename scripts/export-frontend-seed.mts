import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { categories, products, articles } from "../src/data/home.ts";
import { industries } from "../src/data/industries.ts";
import { serviceMenuItems, servicesContent } from "../src/data/services.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../backend/database/data");
fs.mkdirSync(outDir, { recursive: true });

const heroSlides = [
  {
    eyebrow: "Premium Textile",
    titleLine1: "ผ้าคุณภาพสำหรับ",
    titleLine2: "ธุรกิจและคนรักผ้า",
    description:
      "จำหน่ายผ้าปลีกและผ้าส่ง พร้อมบริการสำหรับโรงงาน แบรนด์เสื้อผ้า และธุรกิจที่ต้องการผ้าคุณภาพมาตรฐาน",
    image:
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=2000&q=85",
    primaryCtaLabel: "ดูสินค้าทั้งหมด",
    primaryCtaUrl: "/products",
    secondaryCtaLabel: "สั่งซื้อราคาส่ง",
    secondaryCtaUrl: "/wholesale",
    sortOrder: 1,
  },
  {
    eyebrow: "Retail & Wholesale",
    titleLine1: "ราคาส่งชัดเจน",
    titleLine2: "สต็อกพร้อมส่งทั่วประเทศ",
    description:
      "รองรับร้านค้า โรงงาน และแบรนด์แฟชั่น ด้วยราคาส่งตามจำนวน ใบเสนอราคา และบริการจัดส่งที่รวดเร็ว",
    image:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=2000&q=85",
    primaryCtaLabel: "สมัครสมาชิกค้าส่ง",
    primaryCtaUrl: "/wholesale",
    secondaryCtaLabel: "เลือกดูผ้า",
    secondaryCtaUrl: "/products",
    sortOrder: 2,
  },
  {
    eyebrow: "For Every Industry",
    titleLine1: "ผ้าสำหรับทุก",
    titleLine2: "อุตสาหกรรม",
    description:
      "ตั้งแต่ตกแต่งภายใน ยานยนต์ การแพทย์ ไปจนถึงยูนิฟอร์มและงานผลิต — คัดสรรผ้าให้เหมาะกับงานของคุณ",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=2000&q=85",
    primaryCtaLabel: "ผ้าแต่ละอุตสาหกรรม",
    primaryCtaUrl: "/industries",
    secondaryCtaLabel: "คำนวณผ้า",
    secondaryCtaUrl: "/fabric-calculator",
    sortOrder: 3,
  },
  {
    eyebrow: "Trusted Partner",
    titleLine1: "พาร์ทเนอร์ผ้า",
    titleLine2: "ที่ธุรกิจไว้ใจ",
    description:
      "คุณภาพมาตรฐาน ความหลากหลายของเนื้อผ้า และทีมงานพร้อมให้คำแนะนำทั้งปลีกและส่ง",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=2000&q=85",
    primaryCtaLabel: "ติดต่อฝ่ายขาย",
    primaryCtaUrl: "/contact",
    secondaryCtaLabel: "รู้จัก FabricFlow",
    secondaryCtaUrl: "/about",
    sortOrder: 4,
  },
];

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

function buildColors(product: (typeof products)[number]) {
  if (product.colors?.length) return product.colors;

  const seed = product.sku
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const count = 4 + (seed % 3);
  const colors = [];

  for (let i = 0; i < count; i++) {
    const imageIndex = (seed + i * 3) % COLOR_IMAGE_POOL.length;
    colors.push({
      name:
        i === 0
          ? `${DEFAULT_COLOR_NAMES[0].split("-")[0]}-${product.color
              .toUpperCase()
              .replace(/\s+/g, "-")}`
          : DEFAULT_COLOR_NAMES[i] || `0${i + 1}-COLOR`,
      code: product.sku,
      image:
        i === 0
          ? product.image.replace("w=800", "w=1200")
          : COLOR_IMAGE_POOL[imageIndex],
      inStock: i === 3 ? false : true,
      retailPrice: product.retailPrice + (i > 2 ? 10 : 0),
      wholesalePrice: product.wholesalePrice + (i > 2 ? 8 : 0),
    });
  }

  return colors;
}

const payload = {
  categories: categories.map((c, index) => ({
    slug: c.id,
    nameTh: c.nameTh,
    nameEn: c.nameEn,
    image: c.image,
    sortOrder: index + 1,
  })),
  industries: industries.map((industry, index) => ({
    slug: industry.id,
    nameTh: industry.nameTh,
    nameEn: industry.nameEn,
    description: industry.description,
    image: industry.image,
    intro: industry.intro,
    guideTitle: industry.guideTitle,
    guideBody: industry.guideBody,
    sortOrder: index + 1,
    collections: industry.collections.map((collection, cIndex) => ({
      name: collection.name,
      description: collection.description,
      image: collection.image,
      sortOrder: cIndex + 1,
    })),
  })),
  products: products.map((product, index) => ({
    slug: product.id,
    sku: product.sku,
    name: product.name,
    material: product.material,
    width: product.width,
    color: product.color,
    retailPrice: product.retailPrice,
    wholesalePrice: product.wholesalePrice,
    inStock: product.inStock,
    badge: product.badge ?? null,
    image: product.image,
    categorySlug: product.categoryId,
    industrySlugs: product.industryIds,
    isFeatured: index < 12,
    colors: buildColors(product),
  })),
  articles: articles.map((article) => ({
    slug: article.id,
    title: article.title,
    category: article.category,
    author: article.author,
    readTime: article.readTime,
    publishedAt: "2026-08-01",
    excerpt: article.excerpt,
    content: article.content.map((p) => `<p>${p}</p>`).join("\n"),
    image: article.image,
  })),
  services: Object.values(servicesContent).map((service, index) => {
    const menu = serviceMenuItems.find((item) =>
      item.href.endsWith(service.slug)
    );
    return {
      slug: service.slug,
      eyebrow: service.eyebrow,
      title: service.title,
      shortLabel: menu?.shortLabel ?? service.eyebrow,
      subtitle: service.subtitle,
      image: service.image,
      highlights: [...service.highlights],
      body: service.body.map((text) => ({
        heading: "รายละเอียด",
        text,
      })),
      sortOrder: index + 1,
    };
  }),
  heroSlides,
};

const outFile = path.join(outDir, "frontend-seed.json");
fs.writeFileSync(outFile, JSON.stringify(payload, null, 2), "utf8");
console.log(`Wrote ${outFile}`);
console.log(
  JSON.stringify(
    {
      categories: payload.categories.length,
      industries: payload.industries.length,
      products: payload.products.length,
      articles: payload.articles.length,
      services: payload.services.length,
      heroSlides: payload.heroSlides.length,
    },
    null,
    2
  )
);
