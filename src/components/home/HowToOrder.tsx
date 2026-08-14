import { SectionHeader } from "@/components/ui/SectionHeader";
import { orderSteps } from "@/data/home";

export function HowToOrder() {
  return (
    <section className="section-padding bg-bg-light">
      <div className="container-ff">
        <SectionHeader
          eyebrow="Process"
          title="ขั้นตอนการสั่งซื้อ"
          subtitle="ง่าย ชัดเจน รองรับทั้งลูกค้าปลีกและลูกค้าองค์กร"
        />

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-0 md:right-0 md:top-8 md:h-px md:w-auto md:bottom-auto" />

          <ol className="grid gap-8 md:grid-cols-4 md:gap-6">
            {orderSteps.map((step, index) => (
              <li key={step.number} className="relative flex gap-4 md:flex-col md:items-center md:text-center">
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-white font-[family-name:var(--font-manrope)] text-sm font-bold text-primary shadow-sm md:mx-auto">
                  {step.number}
                </div>
                <div className="pt-1 md:pt-5">
                  <h3 className="heading-display text-lg text-deep-blue">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                  {index < orderSteps.length - 1 && (
                    <span className="sr-only">ถัดไป</span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
