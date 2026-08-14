import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success" | "muted";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide",
        variant === "default" && "bg-primary text-white",
        variant === "accent" && "bg-accent/15 text-[#8B6914]",
        variant === "success" && "bg-success/10 text-success",
        variant === "muted" && "bg-bg-light text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
