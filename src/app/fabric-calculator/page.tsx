import type { Metadata } from "next";
import { FabricCalculator } from "@/components/calculator/FabricCalculator";
import { PageHero } from "@/components/layout/PageHero";
import { calculatorHero } from "@/data/services";

export const metadata: Metadata = {
  title: "เครื่องคำนวณผ้า",
  description:
    "เครื่องคำนวณผ้า FabricFlow ประมาณจำนวนหลาและเมตรที่ต้องใช้ตามแพทเทิร์น ไซส์ และจำนวนชุด",
};

export default function FabricCalculatorPage() {
  return (
    <div className="bg-bg-light">
      <PageHero
        image={calculatorHero}
        imageAlt="เครื่องคำนวณผ้า FabricFlow"
        eyebrow="Fabric Calculator"
        title="เครื่องคำนวณผ้า"
        subtitle="ประมาณจำนวนผ้าที่ต้องใช้ตามแพทเทิร์น ไซส์ และจำนวนชุด — เหมาะทั้งงานปลีกและงานตัดจำนวนมาก"
        breadcrumbs={[
          { label: "หน้าแรก", href: "/" },
          { label: "บริการ", href: "/services" },
          { label: "เครื่องคำนวณผ้า" },
        ]}
      />

      <div className="container-ff py-10 md:py-14">
        <FabricCalculator />
      </div>
    </div>
  );
}
