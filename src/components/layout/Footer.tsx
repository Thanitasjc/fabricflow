import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { FacebookIcon } from "@/components/icons/SocialIcons";
import { SiteBrandLogo } from "@/components/layout/SiteBrandLogo";
import type { SiteBranding } from "@/lib/branding";

const productLinks = [
  { href: "/products", label: "ผ้าทั้งหมด" },
  { href: "/industries", label: "ผ้าแต่ละอุตสาหกรรม" },
  { href: "/products?cat=cotton", label: "ผ้าคอตตอน" },
  { href: "/products?cat=denim", label: "ผ้ายีนส์" },
  { href: "/products?cat=suiting", label: "ผ้าสูท" },
  { href: "/products?cat=uniform", label: "ผ้ายูนิฟอร์ม" },
];

const serviceLinks = [
  {
    href: "/services/sourcing-preorder",
    label: "จัดหาผ้า / พรีออเดอร์",
  },
  {
    href: "/services/custom-production",
    label: "สั่งผลิต / พิมพ์ดิจิตอล",
  },
  { href: "/services/warp-sizing", label: "วาร์ป & ไซส์ซิ่ง" },
  { href: "/fabric-calculator", label: "เครื่องคำนวณผ้า" },
  { href: "/wholesale", label: "ขายส่ง" },
  { href: "/quotation", label: "ขอใบเสนอราคา" },
];

const aboutLinks = [
  { href: "/about", label: "บริษัท" },
  { href: "/articles", label: "บทความ" },
  { href: "/contact", label: "ติดต่อเรา" },
  { href: "/faq", label: "FAQ" },
];

export function Footer({ branding }: { branding?: SiteBranding | null }) {
  return (
    <footer className="bg-deep-blue text-white">
      <div className="container-ff section-padding !pb-10 !pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <SiteBrandLogo
                branding={branding}
                variant="footer"
                showUnderline={false}
              />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Premium Textile
              <br />
              Retail & Wholesale
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              จำหน่ายผ้าคุณภาพสำหรับร้านค้า โรงงาน แบรนด์แฟชั่น
              และลูกค้าทั่วไป
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-accent">
              สินค้า
            </h3>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-accent">
              บริการ
            </h3>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-accent">
              เกี่ยวกับเรา
            </h3>
            <ul className="mt-4 space-y-2.5">
              {aboutLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-accent">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                02-000-0000
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-accent" />
                @fabricflow
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                sales@fabricflow.co.th
              </li>
              <li className="flex items-center gap-2">
                <FacebookIcon className="h-4 w-4 text-accent" />
                FabricFlow Textile
              </li>
            </ul>
            <div className="mt-5 flex h-24 w-24 items-center justify-center rounded-lg bg-white p-2">
              <div className="flex h-full w-full flex-col items-center justify-center rounded bg-bg-light text-center">
                <span className="text-[10px] font-semibold text-deep-blue">
                  LINE QR
                </span>
                <span className="mt-0.5 text-[9px] text-muted">@fabricflow</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>© 2026 FabricFlow. All Rights Reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
