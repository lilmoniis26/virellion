import { cn } from "@/lib/utils";

/** Pole-star V — same glyph as public/favicon.svg */
export function VirellionMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-7", className)}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M8.4 7.1 L14.6 24.6 H17.4 L23.6 7.1 H19.7 L16 18.2 12.3 7.1 Z"
        fill="currentColor"
      />
      <circle cx="16" cy="8.15" r="1.65" fill="currentColor" />
    </svg>
  );
}

/** @deprecated use VirellionMark */
export const AtlasMark = VirellionMark;
