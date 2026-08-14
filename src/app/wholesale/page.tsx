import type { Metadata } from "next";
import { WholesaleCTA } from "@/components/home/WholesaleCTA";
import { PricingPreview } from "@/components/home/PricingPreview";
import { ContactCTA } from "@/components/home/ContactCTA";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "ขายส่ง",
  description: "โปรแกรมขายส่งผ้า FabricFlow สำหรับร้านค้า โรงงาน และแบรนด์",
};

const wholesaleHero =
  "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1800&q=85";

export default function WholesalePage() {
  return (
    <>
      <PageHero
        image={wholesaleHero}
        imageAlt="ขายส่งผ้าสำหรับธุรกิจ FabricFlow"
        eyebrow="B2B"
        title="ขายส่งสำหรับธุรกิจ"
        subtitle="ราคาพิเศษ สต็อกพร้อมส่ง ใบเสนอราคา และบัญชีเครดิตสำหรับลูกค้าองค์กร"
        breadcrumbs={[
          { label: "หน้าแรก", href: "/" },
          { label: "ขายส่ง" },
        ]}
      />
      <WholesaleCTA />
      <PricingPreview />
      <ContactCTA />
    </>
  );
}
