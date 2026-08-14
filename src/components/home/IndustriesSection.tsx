import Link from "next/link";
import { ChevronUp } from "lucide-react";
import { IndustryMegaMenu } from "@/components/industries/IndustryMegaMenu";
import { api } from "@/lib/api";
import { toIndustryCard } from "@/lib/industries";

export async function IndustriesSection() {
  const industries = await api
    .industries()
    .then((rows) => rows.map(toIndustryCard))
    .catch(() => null);

  return (
    <section className="section-padding bg-[#F7F5F2]">
      <div className="container-ff">
        <div className="mb-8 flex items-center justify-center gap-2 md:mb-10">
          <Link
            href="/industries"
            className="heading-display text-2xl text-deep-blue transition-colors hover:text-primary md:text-3xl"
          >
            ผ้าแต่ละอุตสาหกรรม
          </Link>
          <ChevronUp className="h-4 w-4 text-muted" />
        </div>
        <IndustryMegaMenu items={industries} />
      </div>
    </section>
  );
}
