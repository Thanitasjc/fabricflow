import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

const socialImages = [
  "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&q=80",
  "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
  "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80",
];

export function Social() {
  return (
    <section className="section-padding bg-bg-light">
      <div className="container-ff">
        <SectionHeader
          eyebrow="Social"
          title="ติดตาม FabricFlow"
          subtitle="แรงบันดาลใจจากเนื้อผ้า งานตัดเย็บ และเบื้องหลังธุรกิจผ้าคุณภาพ"
        />
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
          {socialImages.map((src, i) => (
            <a
              key={src}
              href="#"
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={src}
                alt={`FabricFlow social highlight ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-deep-blue/0 transition-colors group-hover:bg-deep-blue/35" />
            </a>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="rounded-full border border-border bg-white px-4 py-2 text-xs font-medium text-muted">
            Instagram
          </span>
          <span className="rounded-full border border-border bg-white px-4 py-2 text-xs font-medium text-muted">
            Facebook
          </span>
          <span className="rounded-full border border-border bg-white px-4 py-2 text-xs font-medium text-muted">
            TikTok
          </span>
        </div>
        <div className="mt-6 text-center">
          <Link href="#">
            <Button variant="outline" size="lg">
              Follow Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
