import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const STORAGE_KEY = "toolshub-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  if (!visible) return null;

  const accept = (value: "all" | "necessary") => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50">
      <div className="rounded-xl border bg-card text-card-foreground shadow-lg p-5 relative">
        <button
          onClick={() => accept("necessary")}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
        <h3 className="font-semibold mb-2">We value your privacy</h3>
        <p className="text-sm text-muted-foreground mb-4">
          We use cookies to improve your experience and show relevant ads. You can accept all
          cookies or only the ones strictly necessary.
        </p>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => accept("all")}>
            Accept all
          </Button>
          <Button size="sm" variant="outline" onClick={() => accept("necessary")}>
            Necessary only
          </Button>
        </div>
      </div>
    </div>
  );
}
