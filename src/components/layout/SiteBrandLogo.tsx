import Image from "next/image";
import {
  defaultBranding,
  splitBrandName,
  type SiteBranding,
} from "@/lib/branding";
import { cn } from "@/lib/utils";

type Props = {
  branding?: SiteBranding | null;
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  accentClassName?: string;
  showUnderline?: boolean;
  variant?: "header" | "footer";
};

export function SiteBrandLogo({
  branding,
  className,
  imageClassName,
  textClassName,
  accentClassName,
  showUnderline = true,
  variant = "header",
}: Props) {
  const data = branding ?? defaultBranding;
  const { base, accent } = splitBrandName(data.brandName, data.brandAccent);
  const showText = data.showText !== false;
  const hasLogo = Boolean(data.logo);

  if (!hasLogo && !showText) {
    return (
      <span
        className={cn(
          "font-[family-name:var(--font-manrope)] text-xl font-bold tracking-tight text-deep-blue md:text-2xl",
          textClassName
        )}
      >
        Fabric<span className={cn("text-primary", accentClassName)}>Flow</span>
      </span>
    );
  }

  return (
    <div className={cn("flex items-center gap-2.5 md:gap-3", className)}>
      {hasLogo && (
        <span
          className={cn(
            "relative block shrink-0",
            variant === "header" ? "h-12 w-auto md:h-14" : "h-11 w-auto",
            imageClassName
          )}
        >
          <Image
            src={data.logo!}
            alt={data.brandName}
            width={240}
            height={56}
            className={cn(
              "h-12 w-auto object-contain md:h-14",
              variant === "footer" && "h-11"
            )}
            unoptimized={
              data.logo!.startsWith("http://") ||
              data.logo!.startsWith("https://")
            }
            priority={variant === "header"}
          />
        </span>
      )}

      {showText && (
        <div className="flex min-w-0 flex-col">
          <span
            className={cn(
              "font-[family-name:var(--font-manrope)] text-xl font-bold tracking-tight md:text-2xl",
              variant === "header" ? "text-deep-blue" : "text-white",
              textClassName
            )}
          >
            {base}
            {accent ? (
              <span
                className={cn(
                  variant === "header" ? "text-primary" : "text-accent",
                  accentClassName
                )}
              >
                {accent}
              </span>
            ) : null}
          </span>
          {data.tagline ? (
            <span
              className={cn(
                "mt-0.5 text-[10px] leading-none md:text-xs",
                variant === "header" ? "text-muted" : "text-white/60"
              )}
            >
              {data.tagline}
            </span>
          ) : showUnderline && variant === "header" ? (
            <span className="mt-0.5 h-0.5 w-10 bg-accent transition-all group-hover:w-14" />
          ) : null}
        </div>
      )}
    </div>
  );
}
