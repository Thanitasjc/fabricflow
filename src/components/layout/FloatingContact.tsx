"use client";

import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, ShoppingBag } from "lucide-react";
import {
  FacebookIcon,
  TikTokIcon,
  YoutubeIcon,
} from "@/components/icons/SocialIcons";
import { cn } from "@/lib/utils";

const contacts = [
  {
    name: "LINE",
    handle: "@fabricflow",
    href: "#",
    icon: MessageCircle,
  },
  {
    name: "Facebook",
    handle: "FabricFlow",
    href: "#",
    icon: FacebookIcon,
  },
  {
    name: "TikTok",
    handle: "FabricFlow",
    href: "#",
    icon: TikTokIcon,
  },
  {
    name: "Shopee",
    handle: "FabricFlow",
    href: "#",
    icon: ShoppingBag,
  },
  {
    name: "YouTube",
    handle: "FabricFlow",
    href: "#",
    icon: YoutubeIcon,
  },
];

const btnBase =
  "group relative flex h-11 w-11 items-center justify-center rounded-full shadow-[0_4px_14px_rgba(3,31,61,0.16)] transition-all duration-200 md:h-12 md:w-12";

export function FloatingContact() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-20 right-3 z-40 flex flex-col items-center gap-2.5 md:bottom-8 md:right-5">
      {/* Soft vertical glow behind the stack */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-2 -z-10 w-10 rounded-full bg-deep-blue/10 blur-xl md:w-12"
      />

      {contacts.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            href={item.href}
            aria-label={`${item.name} ${item.handle}`}
            className={cn(
              btnBase,
              "border border-[#E8EEF5] bg-white text-deep-blue hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(3,31,61,0.2)]"
            )}
          >
            <Icon className="h-[18px] w-[18px] md:h-5 md:w-5" />
            <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-deep-blue px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 md:block">
              <strong className="font-semibold">{item.name}</strong>
              <span className="ml-1.5 text-white/70">{item.handle}</span>
            </span>
          </a>
        );
      })}

      <button
        type="button"
        aria-label="กลับขึ้นด้านบน"
        onClick={scrollTop}
        className={cn(
          btnBase,
          "bg-deep-blue text-white hover:-translate-y-0.5 hover:bg-navy-dark hover:shadow-[0_6px_18px_rgba(3,31,61,0.28)]",
          showTop
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        )}
      >
        <ArrowUp className="h-[18px] w-[18px] md:h-5 md:w-5" strokeWidth={2.5} />
      </button>
    </div>
  );
}
