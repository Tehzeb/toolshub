import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Download } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { getToolBySlug } from "@/lib/tools";

export default function QrGenerator() {
  const tool = getToolBySlug("qr-generator")!;
  useDocumentMeta({
    title: tool.name,
    description: tool.description,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState("https://toolshub.app");
  const [size, setSize] = useState(300);
  const [fg, setFg] = useState("#0f172a");
  const [bg, setBg] = useState("#ffffff");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const value = text.trim() || " ";
    QRCode.toCanvas(
      canvas,
      value,
      {
        width: size,
        margin: 2,
        color: { dark: fg, light: bg },
        errorCorrectionLevel: "M",
      },
      (err) => {
        if (err) console.error(err);
      }
    );
  }, [text, size, fg, bg]);

  const onDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <ToolPageLayout
      tool={tool}
      steps={[
        "Type or paste any URL or text into the input.",
        "Adjust the size and pick foreground & background colors.",
        "Click Download to save the QR code as a PNG.",
      ]}
      faqs={[
        {
          q: "Are these QR codes free to use commercially?",
          a: "Yes — QR codes generated here are free for personal and commercial use, with no attribution required.",
        },
        {
          q: "Do the QR codes ever expire?",
          a: "No. The codes are static and will work as long as the destination URL is online.",
        },
        {
          q: "What's the maximum size?",
          a: "You can generate codes up to 1000 pixels wide. For print, we recommend at least 600px.",
        },
        {
          q: "Why do colors with low contrast not scan well?",
          a: "QR scanners need high contrast between the foreground and background. Stick close to dark-on-light for the most reliable scans.",
        },
      ]}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="qr-text">Text or URL</Label>
            <Input
              id="qr-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://example.com"
              data-testid="input-qr-text"
            />
          </div>

          <div className="space-y-2">
            <Label>Size: {size}px</Label>
            <Slider
              min={100}
              max={1000}
              step={20}
              value={[size]}
              onValueChange={([v]) => setSize(v)}
              data-testid="slider-qr-size"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="qr-fg">Foreground</Label>
              <div className="flex gap-2 items-center">
                <input
                  id="qr-fg"
                  type="color"
                  value={fg}
                  onChange={(e) => setFg(e.target.value)}
                  className="h-10 w-12 rounded-md border cursor-pointer"
                />
                <Input value={fg} onChange={(e) => setFg(e.target.value)} className="font-mono" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="qr-bg">Background</Label>
              <div className="flex gap-2 items-center">
                <input
                  id="qr-bg"
                  type="color"
                  value={bg}
                  onChange={(e) => setBg(e.target.value)}
                  className="h-10 w-12 rounded-md border cursor-pointer"
                />
                <Input value={bg} onChange={(e) => setBg(e.target.value)} className="font-mono" />
              </div>
            </div>
          </div>

          <Button onClick={onDownload} className="w-full" data-testid="button-download-qr">
            <Download className="h-4 w-4 mr-2" /> Download PNG
          </Button>
        </div>

        <div className="flex items-center justify-center bg-secondary rounded-xl p-6 min-h-[320px]">
          <canvas ref={canvasRef} className="max-w-full h-auto rounded-md" />
        </div>
      </div>
    </ToolPageLayout>
  );
}
