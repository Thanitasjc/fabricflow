import { SectionHeader } from "@/components/ui/SectionHeader";
import { pricingTiers } from "@/data/home";
import { cn } from "@/lib/utils";

export function PricingPreview() {
  return (
    <section className="section-padding bg-bg-light">
      <div className="container-ff">
        <SectionHeader
          eyebrow="Wholesale Pricing"
          title="ตัวอย่างราคาส่ง"
          subtitle="ยิ่งสั่งมาก ยิ่งได้ราคาดี — ราคาขึ้นกับชนิดผ้าและเงื่อนไขสมาชิก"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative rounded-xl border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5",
                tier.featured
                  ? "border-accent shadow-[0_8px_32px_rgba(217,164,65,0.15)]"
                  : "border-border hover:shadow-[0_4px_24px_rgba(3,31,61,0.06)]"
              )}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-[11px] font-semibold text-deep-blue">
                  แนะนำ
                </span>
              )}
              <p className="font-[family-name:var(--font-manrope)] text-sm font-semibold uppercase tracking-wider text-primary">
                {tier.name}
              </p>
              <p className="mt-1 text-sm text-muted">{tier.range}</p>
              <p className="mt-6 font-[family-name:var(--font-manrope)] text-3xl font-semibold text-deep-blue">
                ฿{tier.price}
                <span className="text-base font-normal text-muted"> / เมตร</span>
              </p>
              <p className="mt-4 text-xs text-muted">
                ตัวอย่างราคาผ้าคอตตอน Premium
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted">
          *ราคาจริงอาจแตกต่างตามชนิดผ้า สี และปริมาณการสั่งซื้อ
        </p>
      </div>
    </section>
  );
}
