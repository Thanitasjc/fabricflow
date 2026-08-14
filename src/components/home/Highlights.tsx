import { Layers, ShieldCheck, Package, Truck } from "lucide-react";
import { highlights } from "@/data/home";

const icons = [Layers, ShieldCheck, Package, Truck];

export function Highlights() {
  return (
    <section className="border-b border-border bg-white">
      <div className="container-ff py-10 md:py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={item.number}
                className="group rounded-xl border border-border bg-white p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-[0_4px_24px_rgba(3,31,61,0.06)]"
              >
                <div className="flex items-start justify-between">
                  <span className="font-[family-name:var(--font-manrope)] text-xs font-semibold tracking-[0.2em] text-accent">
                    {item.number}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg-light text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="mt-5 heading-display text-lg text-deep-blue">
                  {item.titleTh}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
                  {item.titleEn}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
