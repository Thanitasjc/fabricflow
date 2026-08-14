import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { articles } from "@/data/home";

export function Articles() {
  return (
    <section className="section-padding bg-white">
      <div className="container-ff">
        <SectionHeader
          eyebrow="Knowledge"
          title="สาระน่ารู้เรื่องผ้า"
          subtitle="บทความและคู่มือเลือกผ้าสำหรับธุรกิจและคนรักการตัดเย็บ"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(3,31,61,0.08)]"
            >
              <Link
                href={`/articles/${article.id}`}
                className="relative aspect-[16/10] overflow-hidden"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="font-medium text-primary">
                    {article.category}
                  </span>
                  <span>·</span>
                  <time>{article.date}</time>
                </div>
                <Link href={`/articles/${article.id}`}>
                  <h3 className="mt-2 heading-display text-base leading-snug text-deep-blue transition-colors group-hover:text-primary">
                    {article.title}
                  </h3>
                </Link>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {article.excerpt}
                </p>
                <Link
                  href={`/articles/${article.id}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
                >
                  อ่านต่อ <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
