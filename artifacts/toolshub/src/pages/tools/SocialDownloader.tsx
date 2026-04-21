import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Download, ExternalLink, Info } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { getToolBySlug } from "@/lib/tools";

type Platform = "facebook" | "instagram" | null;

function detectPlatform(url: string): Platform {
  if (!url) return null;
  if (/facebook\.com|fb\.watch|fb\.com/i.test(url)) return "facebook";
  if (/instagram\.com/i.test(url)) return "instagram";
  return null;
}

export default function SocialDownloader() {
  const tool = getToolBySlug("social-downloader")!;
  useDocumentMeta({ title: tool.name, description: tool.description });

  const [url, setUrl] = useState("");
  const [showNotice, setShowNotice] = useState(false);

  const platform = useMemo(() => detectPlatform(url), [url]);

  return (
    <ToolPageLayout
      tool={tool}
      steps={[
        "Copy a Facebook or Instagram video URL.",
        "Paste it below — we'll detect the platform and prepare a preview.",
        "Continue to the download flow.",
      ]}
      faqs={[
        {
          q: "Which platforms are supported?",
          a: "Facebook (including fb.watch links) and Instagram. We add new platforms regularly.",
        },
        {
          q: "Can I download Reels and Stories?",
          a: "Public Reels are supported once Pro is enabled. Stories are not supported because of platform restrictions.",
        },
        {
          q: "Why a notice before downloading?",
          a: "Facebook and Instagram require authenticated, paid APIs to fetch videos reliably. We're shipping that integration via Pro.",
        },
        {
          q: "Is the URL I paste tracked?",
          a: "No. URL detection happens entirely in your browser.",
        },
      ]}
    >
      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="social-url">Video URL</Label>
          <Input
            id="social-url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setShowNotice(false);
            }}
            placeholder="https://www.facebook.com/… or https://www.instagram.com/p/…"
            data-testid="input-social-url"
          />
        </div>

        {url && !platform && (
          <p className="text-sm text-destructive">
            We couldn't detect a Facebook or Instagram link. Double-check the URL.
          </p>
        )}

        {platform && (
          <div className="space-y-5">
            <div className="rounded-xl border bg-secondary p-8 flex flex-col items-center text-center">
              {platform === "facebook" ? (
                <FaFacebook className="h-16 w-16 text-blue-500" />
              ) : (
                <FaInstagram className="h-16 w-16 text-pink-500" />
              )}
              <p className="mt-4 font-semibold capitalize">{platform} video detected</p>
              <p className="text-sm text-muted-foreground mt-1 break-all max-w-md">
                {url}
              </p>
            </div>

            <Button onClick={() => setShowNotice(true)} size="lg" className="w-full" data-testid="button-download-social">
              <Download className="h-4 w-4 mr-2" /> Download MP4
            </Button>

            {showNotice && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Direct download requires Pro</AlertTitle>
                <AlertDescription>
                  Facebook and Instagram require an authenticated download service, which we're
                  finishing for Pro. For now, you can open the original post.
                  <Button asChild variant="outline" size="sm" className="mt-3">
                    <a href={url} target="_blank" rel="noreferrer noopener">
                      Open original post <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
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
