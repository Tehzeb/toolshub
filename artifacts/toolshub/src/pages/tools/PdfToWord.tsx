import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileType, Upload, RefreshCw } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { getToolBySlug } from "@/lib/tools";
import { useToast } from "@/hooks/use-toast";

export default function PdfToWord() {
  const tool = getToolBySlug("pdf-to-word")!;
  useDocumentMeta({ title: tool.name, description: tool.description });
  const { toast } = useToast();

  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ url: string; name: string } | null>(null);

  const handleFile = (f: File) => {
    if (!f.name.toLowerCase().endsWith(".pdf")) {
      toast({ title: "Invalid file", description: "Please upload a PDF file.", variant: "destructive" });
      return;
    }
    setFile(f);
    setResult(null);
  };

  const convert = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const pdfjsLib: any = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString();

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const paragraphs: { children: any[] }[] = [];
      const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import("docx");

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((it: any) => it.str).join(" ").replace(/\s+/g, " ").trim();
        paragraphs.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: `Page ${i}`, bold: true })],
          })
        );
        if (pageText) {
          // Split rough sentences by period+space
          const chunks = pageText.split(/(?<=\.)\s+/);
          for (const c of chunks) {
            paragraphs.push(new Paragraph({ children: [new TextRun(c)] }));
          }
        } else {
          paragraphs.push(new Paragraph({ children: [new TextRun("[No extractable text on this page]")] }));
        }
        paragraphs.push(new Paragraph({ children: [new TextRun("")] }));
      }

      const doc = new Document({ sections: [{ children: paragraphs as any }] });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const name = file.name.replace(/\.pdf$/i, ".docx");
      setResult({ url, name });
      toast({ title: "Conversion complete", description: "Your Word document is ready to download." });
    } catch (err) {
      console.error(err);
      toast({
        title: "Conversion failed",
        description: "We couldn't read this PDF. It may be scanned or password-protected.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const onDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = result.name;
    a.click();
  };

  return (
    <ToolPageLayout
      tool={tool}
      steps={[
        "Upload your PDF — drag-and-drop or click to browse.",
        "Click Convert to extract text into a Word document.",
        "Download the .docx file and edit it in Word, Pages, or Google Docs.",
      ]}
      faqs={[
        {
          q: "Does this preserve the original layout?",
          a: "It preserves the text content. Complex layouts, columns, and images are simplified to plain paragraphs.",
        },
        {
          q: "What about scanned PDFs?",
          a: "Scanned PDFs need OCR to extract text. Our converter currently works only with text-based PDFs.",
        },
        {
          q: "Where do my files go?",
          a: "Nowhere. The conversion runs entirely in your browser — your PDF never leaves your device.",
        },
        {
          q: "Is there a page limit?",
          a: "No hard limit, but very large PDFs (200+ pages) may take a moment to process.",
        },
      ]}
    >
      {!file ? (
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
          data-testid="dropzone-pdf"
        >
          <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium">Drop your PDF here, or click to browse</p>
          <p className="text-sm text-muted-foreground mt-1">PDF files only • up to 25 MB</p>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex items-center gap-3 p-4 rounded-lg border bg-secondary">
            <FileType className="h-8 w-8 text-rose-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <Button variant="ghost" size="sm" onClick={reset}>
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Change
            </Button>
          </div>

          {!result ? (
            <Button onClick={convert} disabled={busy} size="lg" className="w-full" data-testid="button-convert-pdf">
              {busy ? "Converting…" : "Convert to Word"}
            </Button>
          ) : (
            <Button onClick={onDownload} size="lg" className="w-full" data-testid="button-download-docx">
              <Download className="h-4 w-4 mr-2" /> Download {result.name}
            </Button>
          )}
        </div>
      )}
    </ToolPageLayout>
  );
}
