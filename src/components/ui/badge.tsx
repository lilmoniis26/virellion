import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase",
  {
    variants: {
      tone: {
        default: "border-border text-muted",
        accent: "border-accent/30 bg-accent/10 text-accent",
        warn: "border-warn/40 text-warn",
        danger: "border-danger/40 text-danger",
        ok: "border-ok/40 text-ok",
        paper: "border-transparent bg-paper text-ink",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
