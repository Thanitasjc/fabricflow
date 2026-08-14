import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { servicesContent } from "@/data/services";

const content = servicesContent.production;

export const metadata: Metadata = {
  title: content.title,
  description: content.subtitle,
};

export default function CustomProductionPage() {
  return (
    <ServicePage
      eyebrow={content.eyebrow}
      title={content.title}
      subtitle={content.subtitle}
      image={content.image}
      highlights={content.highlights}
      body={content.body}
      currentHref="/services/custom-production"
    />
  );
}
