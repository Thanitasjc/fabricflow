import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Clock, User } from "lucide-react";
import {
  articles,
  getArticleById,
  getRelatedArticles,
} from "@/data/home";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({ id: article.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getArticleById(id);
  if (!article) return { title: "บทความ" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const article = getArticleById(id);
  if (!article) notFound();

  const related = getRelatedArticles(article);
  const currentIndex = articles.findIndex((item) => item.id === article.id);
  const prev = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const next =
    currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return (
    <div className="bg-bg-light">
      <section className="relative isolate min-h-[320px] overflow-hidden md:min-h-[420px]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-deep-blue/70 to-deep-blue/35" />
        <div className="container-ff relative flex min-h-[320px] flex-col justify-end py-10 md:min-h-[420px] md:py-14">
          <nav className="mb-4 text-sm text-white/65" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              หน้าแรก
            </Link>
            <span className="mx-2 text-white/35">/</span>
            <Link href="/articles" className="hover:text-white">
              บทความ
            </Link>
            <span className="mx-2 text-white/35">/</span>
            <span className="text-white">{article.title}</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {article.category}
          </p>
          <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-manrope)] text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/75">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4 text-accent" />
              {article.author}
            </span>
            <time>{article.date}</time>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-accent" />
              {article.readTime}
            </span>
          </div>
        </div>
      </section>

      <div className="container-ff py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <article className="lg:col-span-8">
            <div className="rounded-2xl border border-border bg-white p-6 md:p-10">
              <p className="text-lg leading-relaxed text-deep-blue md:text-xl">
                {article.excerpt}
              </p>
              <div className="gold-rule mt-6" />
              <div className="mt-8 space-y-5">
                {article.content.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-base leading-relaxed text-muted md:text-[17px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
                {prev ? (
                  <Link
                    href={`/articles/${prev.id}`}
                    className="group inline-flex max-w-xs items-start gap-2 text-sm text-muted hover:text-primary"
                  >
                    <ArrowLeft className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      <span className="block text-xs">บทความก่อนหน้า</span>
                      <span className="mt-0.5 block font-medium text-deep-blue group-hover:text-primary">
                        {prev.title}
                      </span>
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link
                    href={`/articles/${next.id}`}
                    className="group inline-flex max-w-xs items-start gap-2 text-right text-sm text-muted hover:text-primary sm:ml-auto"
                  >
                    <span>
                      <span className="block text-xs">บทความถัดไป</span>
                      <span className="mt-0.5 block font-medium text-deep-blue group-hover:text-primary">
                        {next.title}
                      </span>
                    </span>
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" />
                  </Link>
                ) : null}
              </div>
            </div>
          </article>

          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-border bg-white p-6 lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Related
              </p>
              <h2 className="mt-2 heading-display text-xl text-deep-blue">
                บทความที่เกี่ยวข้อง
              </h2>
              <div className="mt-5 space-y-4">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/articles/${item.id}`}
                    className="group flex gap-3"
                  >
                    <span className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="96px"
                      />
                    </span>
                    <span>
                      <span className="text-[11px] font-medium text-primary">
                        {item.category}
                      </span>
                      <span className="mt-1 block text-sm font-medium leading-snug text-deep-blue group-hover:text-primary">
                        {item.title}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/articles"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary"
              >
                ดูบทความทั้งหมด <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
