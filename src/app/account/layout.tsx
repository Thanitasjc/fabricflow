"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  FileText,
  LayoutDashboard,
  LogOut,
  Package,
  Receipt,
  UserRound,
} from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/account", label: "แดชบอร์ด", icon: LayoutDashboard, exact: true },
  { href: "/account/profile", label: "โปรไฟล์", icon: UserRound },
  { href: "/account/orders", label: "คำสั่งซื้อ", icon: Package },
  { href: "/account/quotations", label: "ใบเสนอราคา", icon: FileText },
  { href: "/account/invoices", label: "ใบแจ้งหนี้", icon: Receipt },
  { href: "/account/notifications", label: "การแจ้งเตือน", icon: Bell },
];

export default function AccountLayout({ children }: { children: ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, router, pathname]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-bg-light text-muted">
        กำลังโหลด...
      </div>
    );
  }

  async function onLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <div className="min-h-[70vh] bg-bg-light">
      <div className="border-b border-border bg-white">
        <div className="container-ff flex flex-col gap-1 py-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              Customer Portal
            </p>
            <h1 className="mt-1 font-display text-2xl font-semibold text-deep-blue">
              สวัสดี, {user.name}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {user.customer?.code
                ? `รหัสลูกค้า ${user.customer.code} · `
                : ""}
              {user.accountType === "wholesale" ? "บัญชีขายส่ง" : "บัญชีขายปลีก"}
            </p>
          </div>
        </div>
      </div>

      <div className="container-ff grid gap-6 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-2xl border border-border bg-white p-3 lg:sticky lg:top-24">
          <nav className="space-y-0.5">
            {nav.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    active
                      ? "bg-primary text-white"
                      : "text-deep-blue hover:bg-bg-light"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 opacity-90" />
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => void onLogout()}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-danger hover:bg-danger/5"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              ออกจากระบบ
            </button>
          </nav>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
