import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { collections } from "@/data/home";

export function TextileCollection() {
  const large = collections.find((c) => c.size === "large")!;
  const mediums = collections.filter((c) => c.size === "medium");
  const smalls = collections.filter((c) => c.size === "small");

  return (
    <section className="section-padding bg-white">
      <div className="container-ff">
        <SectionHeader
          eyebrow="Editorial"
          title="Textile Collection"
          subtitle="สำรวจคอลเลกชันผ้าคุณภาพในสไตล์ editorial ที่เน้นเนื้อผ้าและงานตัดเย็บ"
        />

        <div className="grid gap-3 md:grid-cols-12 md:gap-4">
          <Link
            href={`/products?collection=${large.id}`}
            className="group relative col-span-12 aspect-[16/10] overflow-hidden rounded-xl md:col-span-7 md:aspect-auto md:min-h-[420px]"
          >
            <Image
              src={large.image}
              alt={large.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 58vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Featured
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-manrope)] text-2xl font-semibold text-white md:text-3xl">
                {large.title}
              </h3>
            </div>
          </Link>

          <div className="col-span-12 grid gap-3 md:col-span-5 md:gap-4">
            {mediums.map((item) => (
              <Link
                key={item.id}
                href={`/products?collection=${item.id}`}
                className="group relative aspect-[16/9] overflow-hidden rounded-xl md:aspect-auto md:min-h-[200px]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="font-[family-name:var(--font-manrope)] text-lg font-semibold text-white md:text-xl">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {smalls.map((item) => (
            <Link
              key={item.id}
              href={`/products?collection=${item.id}`}
              className="group relative col-span-6 aspect-[4/3] overflow-hidden rounded-xl md:col-span-6 md:min-h-[220px]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <h3 className="font-[family-name:var(--font-manrope)] text-base font-semibold text-white md:text-lg">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
