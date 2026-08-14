import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { articles } from "@/data/home";

export const metadata: Metadata = {
  title: "บทความ",
  description: "สาระน่ารู้เรื่องผ้า คู่มือเลือกผ้า และความรู้สิ่งทอจาก FabricFlow",
};

export default function ArticlesPage() {
  return (
    <div className="bg-bg-light">
      <PageHero
        image="https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1800&q=85"
        imageAlt="บทความความรู้เรื่องผ้า FabricFlow"
        eyebrow="Knowledge"
        title="สาระน่ารู้เรื่องผ้า"
        subtitle="บทความและคู่มือเลือกผ้าสำหรับธุรกิจ โรงงาน แบรนด์ และคนรักการตัดเย็บ"
        breadcrumbs={[
          { label: "หน้าแรก", href: "/" },
          { label: "บทความ" },
        ]}
      />

      <div className="container-ff py-10 md:py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(3,31,61,0.08)]"
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
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </Link>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                  <span className="font-medium text-primary">
                    {article.category}
                  </span>
                  <span>·</span>
                  <time>{article.date}</time>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>
                <Link href={`/articles/${article.id}`}>
                  <h2 className="mt-3 heading-display text-lg leading-snug text-deep-blue transition-colors group-hover:text-primary md:text-xl">
                    {article.title}
                  </h2>
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
    </div>
  );
}
