import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { serviceMenuItems } from "@/data/services";

interface ServicePageProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  highlights: readonly string[];
  body: readonly string[];
  currentHref: string;
}

export function ServicePage({
  eyebrow,
  title,
  subtitle,
  image,
  highlights,
  body,
  currentHref,
}: ServicePageProps) {
  return (
    <div className="bg-bg-light">
      <PageHero
        image={image}
        imageAlt={title}
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        breadcrumbs={[
          { label: "หน้าแรก", href: "/" },
          { label: "บริการ", href: "/services" },
          { label: title },
        ]}
      />

      <div className="container-ff py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/40 to-transparent" />
            </div>

            <div className="mt-8 space-y-4 rounded-2xl border border-border bg-white p-6 md:p-8">
              {body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-base leading-relaxed text-muted md:text-[17px]"
                >
                  {paragraph}
                </p>
              ))}

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-deep-blue"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    ติดต่อฝ่ายบริการ
                  </Button>
                </Link>
                <Link href="/quotation">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    ขอใบเสนอราคา
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-border bg-white p-6 lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Services
              </p>
              <h3 className="mt-2 heading-display text-lg text-deep-blue">
                บริการทั้งหมด
              </h3>
              <ul className="mt-5 space-y-1">
                {serviceMenuItems.map((item) => {
                  const active = item.href === currentHref;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm transition-colors ${
                          active
                            ? "bg-primary text-white"
                            : "text-deep-blue hover:bg-bg-light"
                        }`}
                      >
                        <span>{item.shortLabel}</span>
                        <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
