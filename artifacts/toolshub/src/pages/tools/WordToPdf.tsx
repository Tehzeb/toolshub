import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileType, Upload, RefreshCw } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { getToolBySlug } from "@/lib/tools";
import { useToast } from "@/hooks/use-toast";

export default function WordToPdf() {
  const tool = getToolBySlug("word-to-pdf")!;
  useDocumentMeta({ title: tool.name, description: tool.description });
  const { toast } = useToast();

  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ url: string; name: string } | null>(null);

  const handleFile = (f: File) => {
    if (!/\.docx?$/i.test(f.name)) {
      toast({ title: "Invalid file", description: "Please upload a .docx file.", variant: "destructive" });
      return;
    }
    setFile(f);
    setResult(null);
  };

  const convert = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const mammoth: any = await import("mammoth");
      const html = await mammoth.convertToHtml({ arrayBuffer });
      const text = await mammoth.extractRawText({ arrayBuffer });
      const { jsPDF } = await import("jspdf");

      const pdf = new jsPDF({ unit: "pt", format: "letter" });
      const margin = 56;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const usableWidth = pageWidth - margin * 2;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);

      // Use raw text for reliable wrapping; HTML is available via html.value if needed.
      void html;
      const lines = pdf.splitTextToSize(text.value, usableWidth);
      let y = margin;
      const lineHeight = 16;
      for (const line of lines) {
        if (y + lineHeight > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, margin, y);
        y += lineHeight;
      }
      const blob = pdf.output("blob");
      const url = URL.createObjectURL(blob);
      const name = file.name.replace(/\.docx?$/i, ".pdf");
      setResult({ url, name });
      toast({ title: "Conversion complete", description: "Your PDF is ready to download." });
    } catch (err) {
      console.error(err);
      toast({
        title: "Conversion failed",
        description: "We couldn't read this Word document. Make sure it's a valid .docx file.",
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
        "Upload a .docx file — drag-and-drop or click to browse.",
        "Click Convert to render it as a multi-page PDF.",
        "Download the PDF and share it anywhere.",
      ]}
      faqs={[
        {
          q: "Will my formatting carry over?",
          a: "Text content is preserved with clean formatting. Complex layouts, embedded images, and tracked changes are simplified.",
        },
        {
          q: "Can I convert legacy .doc files?",
          a: "Only modern .docx files are supported. If you have a .doc file, open it in Word and save it as .docx first.",
        },
        {
          q: "Is there a file size limit?",
          a: "Free users can convert files up to 25 MB. Pro lifts the limit to 500 MB.",
        },
        {
          q: "Where do my files go?",
          a: "Conversion happens 100% in your browser. Your file never leaves your device.",
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
          data-testid="dropzone-docx"
        >
          <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium">Drop your Word file here, or click to browse</p>
          <p className="text-sm text-muted-foreground mt-1">.docx files only • up to 25 MB</p>
          <input
            ref={inputRef}
            type="file"
            accept=".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
            <FileType className="h-8 w-8 text-blue-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{file.name}</p>
              <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <Button variant="ghost" size="sm" onClick={reset}>
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Change
            </Button>
          </div>

          {!result ? (
            <Button onClick={convert} disabled={busy} size="lg" className="w-full" data-testid="button-convert-docx">
              {busy ? "Converting…" : "Convert to PDF"}
            </Button>
          ) : (
            <Button onClick={onDownload} size="lg" className="w-full" data-testid="button-download-pdf">
              <Download className="h-4 w-4 mr-2" /> Download {result.name}
            </Button>
          )}
        </div>
      )}
    </ToolPageLayout>
  );
}
