import { cn } from "@/lib/utils";

/** Apex mountain mark — brand lockup glyph */
export function VirellionMark({ className }: { className?: string }) {
  return (
    <img
      src="/brand/logo-stacked.jpg"
      alt=""
      className={cn("size-8 rounded-sm object-cover", className)}
      aria-hidden="true"
    />
  );
}

/** Compact geometric mark for tight UI (header icon alternative) */
export function VirellionMarkGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("size-7", className)}
      aria-hidden="true"
      fill="none"
    >
      <path d="M32 6 L58 54 H6 Z" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.9" />
      <path d="M32 22 L48 52 H16 Z" fill="currentColor" opacity="0.35" />
      <path d="M32 34 L42 52 H22 Z" fill="currentColor" />
    </svg>
  );
}

/** @deprecated use VirellionMark */
export const AtlasMark = VirellionMark;
