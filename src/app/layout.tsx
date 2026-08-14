import type { Metadata, Viewport } from "next";
import { Inter, Kanit, Manrope } from "next/font/google";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { CatalogListsProvider } from "@/components/commerce/CatalogListsProvider";
import { CompareDock } from "@/components/commerce/CompareDock";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { PwaInstallPrompt } from "@/components/pwa/PwaInstallPrompt";
import { PwaRegister } from "@/components/pwa/PwaRegister";
import { api } from "@/lib/api";
import { defaultBranding } from "@/lib/branding";
import { toIndustryCard } from "@/lib/industries";
import { defaultHeaderMenus } from "@/lib/menu";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  applicationName: "FabricFlow",
  title: {
    default: "FabricFlow | Premium Textile · Retail & Wholesale",
    template: "%s | FabricFlow",
  },
  description:
    "FabricFlow จำหน่ายผ้าคุณภาพสำหรับร้านค้า โรงงาน แบรนด์แฟชั่น และลูกค้าทั่วไป — ขายปลีกและขายส่งครบวงจร",
  keywords: [
    "ผ้า",
    "textile",
    "wholesale fabric",
    "ผ้าส่ง",
    "ผ้าคอตตอน",
    "ผ้ายีนส์",
    "FabricFlow",
  ],
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FabricFlow",
  },
  formatDetection: {
    telephone: true,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#073B73" },
    { media: "(prefers-color-scheme: dark)", color: "#031F3D" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [branding, menus, industries] = await Promise.all([
    api.branding().catch(() => defaultBranding),
    api.menus("header").catch(() => defaultHeaderMenus),
    api
      .industries()
      .then((rows) => rows.map(toIndustryCard))
      .catch(() => null),
  ]);

  return (
    <html
      lang="th"
      className={`${inter.variable} ${manrope.variable} ${kanit.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white pb-16 font-sans text-foreground md:pb-0">
        <AuthProvider>
          <CatalogListsProvider>
            <Header
              branding={branding}
              menus={menus}
              industries={industries}
            />
            <main className="flex-1">{children}</main>
            <Footer branding={branding} />
            <FloatingContact />
            <MobileBottomNav />
            <CompareDock />
            <PwaRegister />
            <PwaInstallPrompt />
          </CatalogListsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
