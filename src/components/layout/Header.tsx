"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  GitCompareArrows,
  Heart,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  User,
  X,
  MessageCircle,
} from "lucide-react";
import { FacebookIcon } from "@/components/icons/SocialIcons";
import { IndustryMegaMenu } from "@/components/industries/IndustryMegaMenu";
import { useAuth } from "@/components/auth/AuthProvider";
import { useCatalogLists } from "@/components/commerce/CatalogListsProvider";
import { SiteBrandLogo } from "@/components/layout/SiteBrandLogo";
import type { SiteBranding } from "@/lib/branding";
import type { IndustryCard } from "@/lib/industries";
import { defaultHeaderMenus, type NavMenuItem } from "@/lib/menu";
import { cn } from "@/lib/utils";

type HeaderProps = {
  branding?: SiteBranding | null;
  menus?: NavMenuItem[] | null;
  industries?: IndustryCard[] | null;
};

const linkClass =
  "relative px-3 py-2 text-sm font-medium text-deep-blue/80 transition-colors hover:text-primary after:absolute after:bottom-1 after:left-3 after:right-3 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100";

export function Header({ branding, menus, industries }: HeaderProps) {
  const { user, loading: authLoading, logout } = useAuth();
  const { favorites, compare, ready: listsReady } = useCatalogLists();
  const navMenus = menus?.length ? menus : defaultHeaderMenus;
  const industriesItem = navMenus.find((m) => m.type === "industries");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | number | null>(
    null
  );
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileOpenId, setMobileOpenId] = useState<string | number | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const industriesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const openIndustries = () => {
    if (industriesCloseTimer.current) clearTimeout(industriesCloseTimer.current);
    setIndustriesOpen(true);
    setOpenDropdownId(null);
  };

  const closeIndustries = () => {
    if (industriesCloseTimer.current) clearTimeout(industriesCloseTimer.current);
    industriesCloseTimer.current = setTimeout(() => {
      setIndustriesOpen(false);
    }, 120);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-nav-dropdown]")) {
        setOpenDropdownId(null);
      }
      if (accountRef.current && !accountRef.current.contains(target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    return () => {
      if (industriesCloseTimer.current) clearTimeout(industriesCloseTimer.current);
    };
  }, []);

  const closeAll = () => {
    setOpenDropdownId(null);
    setIndustriesOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden border-b border-white/10 bg-navy-dark text-white/90 lg:block">
        <div className="container-ff flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <a
              href="tel:020000000"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Phone className="h-3.5 w-3.5 text-accent" />
              ฝ่ายขาย 02-000-0000
            </a>
            <span className="text-white/30">|</span>
            <span className="text-white/70">จ.–ส. 08:30–17:30</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              LINE
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <FacebookIcon className="h-3.5 w-3.5" />
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b border-border bg-white/95 backdrop-blur-md transition-shadow duration-200",
          scrolled && "shadow-[0_1px_12px_rgba(3,31,61,0.08)]"
        )}
      >
        <div className="container-ff flex h-[72px] items-center justify-between gap-4 lg:h-20">
          <Link href="/" className="group shrink-0" onClick={closeAll}>
            <SiteBrandLogo branding={branding} />
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex">
            {navMenus.map((item) => {
              if (item.type === "industries") {
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={openIndustries}
                    onMouseLeave={closeIndustries}
                  >
                    <button
                      type="button"
                      onClick={() => setIndustriesOpen((v) => !v)}
                      className={cn(
                        "relative inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                        industriesOpen
                          ? "text-primary"
                          : "text-deep-blue/80 hover:text-primary"
                      )}
                      aria-expanded={industriesOpen}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          industriesOpen && "rotate-180"
                        )}
                      />
                    </button>
                  </div>
                );
              }

              if (item.type === "dropdown") {
                const open = openDropdownId === item.id;
                return (
                  <div
                    key={item.id}
                    className="relative"
                    data-nav-dropdown
                    onMouseEnter={() => {
                      setOpenDropdownId(item.id);
                      setIndustriesOpen(false);
                    }}
                    onMouseLeave={() => setOpenDropdownId(null)}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdownId((v) => (v === item.id ? null : item.id))
                      }
                      className={cn(
                        "relative inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                        open
                          ? "text-primary"
                          : "text-deep-blue/80 hover:text-primary"
                      )}
                      aria-expanded={open}
                      aria-haspopup="menu"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          open && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "absolute left-0 top-full z-50 mt-0 w-72 overflow-hidden rounded-xl border border-border bg-white py-2 shadow-[0_12px_40px_rgba(3,31,61,0.12)] transition-all duration-200",
                        open
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none -translate-y-1 opacity-0"
                      )}
                      role="menu"
                    >
                      {item.children.map((sub) => (
                        <Link
                          key={sub.id}
                          href={sub.href || "#"}
                          role="menuitem"
                          target={sub.openInNewTab ? "_blank" : undefined}
                          rel={sub.openInNewTab ? "noreferrer" : undefined}
                          onClick={() => setOpenDropdownId(null)}
                          className="block px-4 py-2.5 text-sm text-deep-blue transition-colors hover:bg-bg-light hover:text-primary"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={item.href || "#"}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noreferrer" : undefined}
                  className={linkClass}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label="ค้นหา"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-deep-blue transition-colors hover:bg-bg-light"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/favorites"
              aria-label="รายการโปรด"
              className="relative hidden h-10 w-10 items-center justify-center rounded-lg text-deep-blue transition-colors hover:bg-bg-light sm:flex"
            >
              <Heart className="h-5 w-5" />
              {listsReady && favorites.length > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-deep-blue">
                  {favorites.length > 9 ? "9+" : favorites.length}
                </span>
              )}
            </Link>
            <Link
              href="/compare"
              aria-label="เปรียบเทียบ"
              className="relative hidden h-10 w-10 items-center justify-center rounded-lg text-deep-blue transition-colors hover:bg-bg-light sm:flex"
            >
              <GitCompareArrows className="h-5 w-5" />
              {listsReady && compare.length > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                  {compare.length}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              aria-label="ตะกร้า"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-deep-blue transition-colors hover:bg-bg-light"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-deep-blue">
                2
              </span>
            </Link>
            <div ref={accountRef} className="relative hidden md:block">
              <button
                type="button"
                aria-label="บัญชี"
                aria-expanded={accountOpen}
                aria-haspopup="menu"
                onClick={() => setAccountOpen((v) => !v)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg text-deep-blue transition-colors hover:bg-bg-light",
                  accountOpen && "bg-bg-light"
                )}
              >
                <User className="h-5 w-5" />
              </button>
              {accountOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-50 mt-1.5 w-48 overflow-hidden rounded-xl border border-border bg-white py-1 shadow-lg shadow-deep-blue/5"
                >
                  {!authLoading && user ? (
                    <>
                      <div className="border-b border-border px-3 py-2.5">
                        <p className="truncate text-sm font-medium text-deep-blue">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-muted">{user.email}</p>
                      </div>
                      <Link
                        href="/account"
                        role="menuitem"
                        onClick={() => setAccountOpen(false)}
                        className="block px-3 py-2.5 text-sm text-deep-blue transition-colors hover:bg-bg-light"
                      >
                        บัญชีของฉัน
                      </Link>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setAccountOpen(false);
                          void logout();
                        }}
                        className="block w-full px-3 py-2.5 text-left text-sm text-danger transition-colors hover:bg-danger/5"
                      >
                        ออกจากระบบ
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        role="menuitem"
                        onClick={() => setAccountOpen(false)}
                        className="block px-3 py-2.5 text-sm text-deep-blue transition-colors hover:bg-bg-light"
                      >
                        เข้าสู่ระบบ
                      </Link>
                      <Link
                        href="/register"
                        role="menuitem"
                        onClick={() => setAccountOpen(false)}
                        className="block px-3 py-2.5 text-sm text-deep-blue transition-colors hover:bg-bg-light"
                      >
                        สมัครสมาชิก
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label={mobileOpen ? "ปิดเมนู" : "เปิดเมนู"}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-deep-blue transition-colors hover:bg-bg-light xl:hidden"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Industries mega panel — full width under header */}
      <div
        className={cn(
          "absolute left-0 right-0 z-40 hidden border-b border-border bg-[#F7F5F2] shadow-[0_16px_40px_rgba(3,31,61,0.1)] transition-all duration-200 xl:block",
          industriesOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        )}
        onMouseEnter={openIndustries}
        onMouseLeave={closeIndustries}
      >
        <div className="container-ff py-8">
          <div className="mb-6 flex items-center justify-center gap-2">
            <Link
              href={industriesItem?.href || "/industries"}
              onClick={() => setIndustriesOpen(false)}
              className="heading-display text-xl text-deep-blue transition-colors hover:text-primary md:text-2xl"
            >
              {industriesItem?.label || "ผ้าแต่ละอุตสาหกรรม"}
            </Link>
            <ChevronDown className="h-4 w-4 rotate-180 text-muted" />
          </div>
          <IndustryMegaMenu
            items={industries}
            onNavigate={() => setIndustriesOpen(false)}
          />
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 top-[72px] z-40 bg-black/40 transition-opacity xl:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={cn(
          "fixed right-0 top-[72px] z-50 flex h-[calc(100dvh-72px)] w-[min(100%,360px)] flex-col bg-white shadow-xl transition-transform duration-200 xl:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex-1 overflow-y-auto p-4">
          {navMenus.map((item) => {
            if (item.type === "industries") {
              const open = mobileOpenId === item.id;
              return (
                <div key={item.id} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileOpenId((v) => (v === item.id ? null : item.id))
                    }
                    className="flex w-full items-center justify-between px-2 py-3.5 text-[15px] font-medium text-deep-blue"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted transition-transform",
                        open && "rotate-180"
                      )}
                    />
                  </button>
                  {open && (
                    <div className="px-2 pb-4">
                      <IndustryMegaMenu
                        items={industries}
                        compact
                        onNavigate={() => setMobileOpen(false)}
                      />
                    </div>
                  )}
                </div>
              );
            }

            if (item.type === "dropdown") {
              const open = mobileOpenId === item.id;
              return (
                <div key={item.id} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileOpenId((v) => (v === item.id ? null : item.id))
                    }
                    className="flex w-full items-center justify-between px-2 py-3.5 text-[15px] font-medium text-deep-blue"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted transition-transform",
                        open && "rotate-180"
                      )}
                    />
                  </button>
                  {open && (
                    <div className="pb-2 pl-3">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.id}
                          href={sub.href || "#"}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-lg px-2 py-2.5 text-sm text-muted hover:bg-bg-light hover:text-primary"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href || "#"}
                onClick={() => setMobileOpen(false)}
                className="block border-b border-border px-2 py-3.5 text-[15px] font-medium text-deep-blue"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-2 border-t border-border p-4">
          <Link
            href="/wholesale"
            onClick={() => setMobileOpen(false)}
            className="flex h-11 items-center justify-center rounded-[10px] bg-primary text-sm font-medium text-white"
          >
            สั่งซื้อราคาส่ง
          </Link>
          {!authLoading && user ? (
            <>
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="flex h-11 items-center justify-center rounded-[10px] border border-border text-sm font-medium text-deep-blue"
              >
                บัญชีของฉัน
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  void logout();
                }}
                className="flex h-11 w-full items-center justify-center rounded-[10px] text-sm font-medium text-danger"
              >
                ออกจากระบบ
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex h-11 items-center justify-center rounded-[10px] border border-border text-sm font-medium text-deep-blue"
            >
              เข้าสู่ระบบ
            </Link>
          )}
        </div>
      </aside>
    </header>
  );
}
