import Image from "next/image";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  breadcrumbs: BreadcrumbItem[];
}

export function PageHero({
  image,
  imageAlt,
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="relative isolate min-h-[280px] overflow-hidden md:min-h-[340px] lg:min-h-[380px]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/90 via-deep-blue/75 to-deep-blue/45" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,164,65,0.14),transparent_55%)]" />

      <div className="container-ff relative flex min-h-[280px] flex-col justify-end py-10 md:min-h-[340px] md:py-14 lg:min-h-[380px]">
        <nav className="mb-4 text-sm text-white/65" aria-label="Breadcrumb">
          {breadcrumbs.map((item, index) => (
            <span key={`${item.label}-${index}`}>
              {index > 0 && <span className="mx-2 text-white/35">/</span>}
              {item.href ? (
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white">{item.label}</span>
              )}
            </span>
          ))}
        </nav>

        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-manrope)] text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
          {title}
        </h1>
        <div className="gold-rule mt-4" />
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
