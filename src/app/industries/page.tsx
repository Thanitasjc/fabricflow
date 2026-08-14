import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { IndustryMegaMenu } from "@/components/industries/IndustryMegaMenu";
import { api } from "@/lib/api";
import { toIndustryCard } from "@/lib/industries";

export const metadata: Metadata = {
  title: "ผ้าแต่ละอุตสาหกรรม",
  description:
    "เลือกผ้าตามอุตสาหกรรม — ตกแต่งภายใน ยานยนต์ การแพทย์ ยูนิฟอร์ม และอื่นๆ",
};

export const dynamic = "force-dynamic";

export default async function IndustriesPage() {
  const industries = await api
    .industries()
    .then((rows) => rows.map(toIndustryCard))
    .catch(() => null);

  const heroImage =
    industries?.[0]?.image ||
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1800&q=85";

  return (
    <div className="bg-bg-light">
      <PageHero
        image={heroImage}
        imageAlt="ผ้าแต่ละอุตสาหกรรม FabricFlow"
        eyebrow="Industries"
        title="ผ้าแต่ละอุตสาหกรรม"
        subtitle="เลือกผ้าที่เหมาะกับงานในแต่ละอุตสาหกรรม พร้อมคำแนะนำจากทีม FabricFlow"
        breadcrumbs={[
          { label: "หน้าแรก", href: "/" },
          { label: "ผ้าแต่ละอุตสาหกรรม" },
        ]}
      />
      <div className="bg-[#F7F5F2] py-10 md:py-14">
        <div className="container-ff">
          <IndustryMegaMenu items={industries} />
        </div>
      </div>
    </div>
  );
}
