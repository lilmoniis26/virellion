export const MAX_IMAGE_CHARS = 1_400_000;

export function sanitizeImage(raw: string): string {
  const value = raw.trim();
  if (!value) return "";
  if (value.startsWith("/media/") && !value.includes("..") && value.length < 200) return value;
  if (/^https:\/\//i.test(value) && value.length < 2000) return value;
  if (/^data:image\/(png|jpeg|jpg|webp);base64,/i.test(value) && value.length <= MAX_IMAGE_CHARS) return value;
  throw new Error("Use a studio photo, an https image link, or a small image file (JPG, PNG, or WebP).");
}

export function lines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.replace(/^[\s•\-]+/, "").trim())
    .filter(Boolean);
}
