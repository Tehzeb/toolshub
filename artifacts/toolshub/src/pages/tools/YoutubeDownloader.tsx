import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExternalLink, Info, Youtube } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { getToolBySlug } from "@/lib/tools";

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export default function YoutubeDownloader() {
  const tool = getToolBySlug("youtube-downloader")!;
  useDocumentMeta({ title: tool.name, description: tool.description });

  const [url, setUrl] = useState("");
  const [quality, setQuality] = useState("720p");
  const [showNotice, setShowNotice] = useState(false);

  const videoId = useMemo(() => extractYouTubeId(url), [url]);
  const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
  const watchUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;

  return (
    <ToolPageLayout
      tool={tool}
      steps={[
        "Paste a YouTube video URL into the input below.",
        "We'll show the thumbnail and an embedded preview.",
        "Choose a quality and continue to the download.",
      ]}
      faqs={[
        {
          q: "Is downloading YouTube videos legal?",
          a: "Downloading is allowed for content you own, content licensed under Creative Commons, or videos with explicit creator permission. Always check YouTube's Terms of Service.",
        },
        {
          q: "Why does this preview but not download directly?",
          a: "Reliable YouTube downloading requires a paid third-party API. We're working on a Pro integration; for now we surface the source link.",
        },
        {
          q: "What qualities will be available?",
          a: "Once enabled, you'll be able to choose from 360p, 720p, and 1080p — depending on what the source video offers.",
        },
        {
          q: "Do you log the URLs I paste?",
          a: "No — the URL is parsed entirely in your browser and is never sent to our servers.",
        },
      ]}
    >
      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="yt-url">YouTube URL</Label>
          <Input
            id="yt-url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setShowNotice(false);
            }}
            placeholder="https://www.youtube.com/watch?v=…"
            data-testid="input-youtube-url"
          />
        </div>

        {url && !videoId && (
          <p className="text-sm text-destructive">That doesn't look like a valid YouTube URL.</p>
        )}

        {videoId && thumbnail && (
          <div className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-xl overflow-hidden border bg-secondary">
                <img
                  src={thumbnail}
                  alt="Video thumbnail"
                  loading="lazy"
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-xl overflow-hidden border bg-black aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 items-end">
              <div className="space-y-1.5">
                <Label>Quality</Label>
                <Select value={quality} onValueChange={setQuality}>
                  <SelectTrigger data-testid="select-quality"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="360p">360p (Standard)</SelectItem>
                    <SelectItem value="720p">720p (HD)</SelectItem>
                    <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => setShowNotice(true)} size="lg" data-testid="button-download-yt">
                <Youtube className="h-4 w-4 mr-2" /> Download {quality}
              </Button>
            </div>

            {showNotice && watchUrl && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Direct download requires Pro</AlertTitle>
                <AlertDescription>
                  Reliable YouTube downloads need a paid third-party API. While we finish that
                  integration, you can open the video on YouTube directly.
                  <Button asChild variant="outline" size="sm" className="mt-3">
                    <a href={watchUrl} target="_blank" rel="noreferrer noopener">
                      Open on YouTube <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                    </a>
                  </Button>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
