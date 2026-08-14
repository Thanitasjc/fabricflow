import Image from "next/image";
import Link from "next/link";
import { industries as fallbackIndustries } from "@/data/industries";
import type { IndustryCard } from "@/lib/industries";
import { cn } from "@/lib/utils";

interface IndustryMegaMenuProps {
  items?: IndustryCard[] | null;
  onNavigate?: () => void;
  className?: string;
  compact?: boolean;
}

export function IndustryMegaMenu({
  items,
  onNavigate,
  className,
  compact = false,
}: IndustryMegaMenuProps) {
  const list: IndustryCard[] =
    items && items.length > 0
      ? items
      : fallbackIndustries.map((item) => ({
          id: item.id,
          nameTh: item.nameTh,
          image: item.image,
        }));

  return (
    <div className={cn(className)}>
      <div
        className={cn(
          "grid gap-3",
          compact
            ? "grid-cols-2"
            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4"
        )}
      >
        {list.map((item) => (
          <Link
            key={item.id}
            href={`/industries/${item.id}`}
            onClick={onNavigate}
            className="group block text-center"
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-lg bg-bg-light",
                compact ? "aspect-[3/4]" : "aspect-[2/3]"
              )}
            >
              <Image
                src={item.image}
                alt={item.nameTh}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                sizes={compact ? "50vw" : "(max-width: 1024px) 33vw, 16vw"}
              />
              <div className="absolute inset-0 bg-deep-blue/0 transition-colors duration-300 group-hover:bg-deep-blue/20" />
            </div>
            <p
              className={cn(
                "mt-2.5 font-medium leading-snug text-deep-blue transition-colors group-hover:text-primary",
                compact ? "text-xs" : "text-xs md:text-sm"
              )}
            >
              {item.nameTh}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
