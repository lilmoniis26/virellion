import { SITE } from "@/lib/site";

export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} · ${SITE.name}` },
      { name: "description", content: description },
    ],
  };
}