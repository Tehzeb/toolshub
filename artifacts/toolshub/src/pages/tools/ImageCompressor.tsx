import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Download, Upload, RefreshCw } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { getToolBySlug } from "@/lib/tools";

interface CompressedResult {
  url: string;
  size: number;
  type: string;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ImageCompressor() {
  const tool = getToolBySlug("image-compressor")!;
  useDocumentMeta({ title: tool.name, description: tool.description });

  const inputRef = useRef<HTMLInputElement>(null);
  const [original, setOriginal] = useState<{ url: string; size: number; name: string } | null>(null);
  const [quality, setQuality] = useState(70);
  const [compressed, setCompressed] = useState<CompressedResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setOriginal({ url, size: file.size, name: file.name });
    compressFile(file, quality);
  };

  const compressFile = async (file: File, q: number) => {
    setBusy(true);
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    const mime = file.type === "image/png" ? "image/jpeg" : file.type === "image/webp" ? "image/webp" : "image/jpeg";
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setBusy(false);
          return;
        }
        setCompressed({
          url: URL.createObjectURL(blob),
          size: blob.size,
          type: mime,
        });
        setBusy(false);
      },
      mime,
      q / 100
    );
  };

  const onQualityChange = (q: number) => {
    setQuality(q);
    const file = inputRef.current?.files?.[0];
    if (file) compressFile(file, q);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onDownload = () => {
    if (!compressed || !original) return;
    const a = document.createElement("a");
    a.href = compressed.url;
    const ext = compressed.type === "image/webp" ? "webp" : "jpg";
    const base = original.name.replace(/\.[^.]+$/, "");
    a.download = `${base}-compressed.${ext}`;
    a.click();
  };

  const reset = () => {
    setOriginal(null);
    setCompressed(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <ToolPageLayout
      tool={tool}
      steps={[
        "Drag and drop an image (JPG, PNG, or WEBP) or click to upload.",
        "Adjust the quality slider to balance size and visual quality.",
        "Compare before and after, then download the compressed image.",
      ]}
      faqs={[
        {
          q: "Are my images uploaded anywhere?",
          a: "No. All compression happens in your browser — your images never leave your device.",
        },
        {
          q: "What formats are supported?",
          a: "JPG, PNG, and WEBP. PNGs are converted to JPG for the best compression.",
        },
        {
          q: "Will compression hurt the visual quality?",
          a: "At 70–85% quality, the difference is usually invisible. Lower the slider only if you need a very small file.",
        },
        {
          q: "Is there a file size limit?",
          a: "Free users can compress images up to 25 MB. Pro lifts the limit to 500 MB.",
        },
      ]}
    >
      {!original ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          }`}
          data-testid="dropzone-image"
        >
          <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium">Drop your image here, or click to browse</p>
          <p className="text-sm text-muted-foreground mt-1">JPG, PNG, or WEBP • up to 25 MB</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Quality: {quality}%</Label>
              <Button variant="ghost" size="sm" onClick={reset} data-testid="button-reset">
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> New image
              </Button>
            </div>
            <Slider
              min={10}
              max={100}
              step={5}
              value={[quality]}
              onValueChange={([v]) => onQualityChange(v)}
              data-testid="slider-quality"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Before</p>
              <div className="rounded-lg border bg-secondary aspect-square flex items-center justify-center overflow-hidden">
                <img src={original.url} alt="Original" className="max-w-full max-h-full object-contain" />
              </div>
              <p className="text-sm text-muted-foreground">{formatBytes(original.size)}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">After</p>
              <div className="rounded-lg border bg-secondary aspect-square flex items-center justify-center overflow-hidden">
                {compressed && (
                  <img src={compressed.url} alt="Compressed" className="max-w-full max-h-full object-contain" />
                )}
              </div>
              <p className="text-sm">
                {compressed ? (
                  <>
                    <span className="font-medium">{formatBytes(compressed.size)}</span>{" "}
                    <span className="text-emerald-600 dark:text-emerald-400">
                      ({Math.max(0, Math.round((1 - compressed.size / original.size) * 100))}% smaller)
                    </span>
                  </>
                ) : (
                  <span className="text-muted-foreground">Compressing…</span>
                )}
              </p>
            </div>
          </div>

          <Button onClick={onDownload} disabled={!compressed || busy} className="w-full" size="lg" data-testid="button-download-image">
            <Download className="h-4 w-4 mr-2" /> Download compressed image
          </Button>
        </div>
      )}
    </ToolPageLayout>
  );
}
