import { STUDIO_MEDIA } from "@/lib/catalog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function MediaPicker({
  image,
  alt,
  onImage,
  onAlt,
  idPrefix = "media",
}: {
  image: string;
  alt: string;
  onImage: (src: string, alt?: string) => void;
  onAlt: (alt: string) => void;
  idPrefix?: string;
}) {
  const onFile = (file: File | undefined) => {
    if (!file) return;
    if (file.size > 900_000) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (result) onImage(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <Label>Photograph</Label>
      {image ? <img src={image} alt="" className="aspect-photo w-full max-w-sm rounded-lg object-cover" /> : null}
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
        {STUDIO_MEDIA.map((photo) => (
          <button
            key={photo.src}
            type="button"
            className={`overflow-hidden rounded-md border ${image === photo.src ? "border-accent" : "border-border"}`}
            onClick={() => onImage(photo.src, photo.alt)}
          >
            <img src={photo.src} alt={photo.label} className="aspect-square w-full object-cover" />
          </button>
        ))}
      </div>
      <Label htmlFor={`${idPrefix}-url`}>Or image link</Label>
      <Input
        id={`${idPrefix}-url`}
        placeholder="https://…"
        value={image.startsWith("data:") ? "" : image}
        onChange={(e) => onImage(e.target.value)}
      />
      <Label htmlFor={`${idPrefix}-file`}>Or upload a file</Label>
      <Input
        id={`${idPrefix}-file`}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => onFile(e.target.files?.[0])}
      />
      <Label htmlFor={`${idPrefix}-alt`}>Image description</Label>
      <Input id={`${idPrefix}-alt`} value={alt} onChange={(e) => onAlt(e.target.value)} />
    </div>
  );
}
