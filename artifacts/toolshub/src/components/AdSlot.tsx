import { useEffect } from "react";

type AdFormat = "auto" | "rectangle" | "horizontal" | "vertical";

interface AdSlotProps {
  label?: string;
  className?: string;
  slot?: string;
  format?: AdFormat;
  vertical?: boolean;
  height?: number;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({
  label = "Advertisement",
  className = "",
  slot = "0000000000",
  format = "horizontal",
  vertical = false,
  height,
}: AdSlotProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        (window.adsbygoogle as unknown[]).push({});
      }
    } catch {
      /* AdSense not yet configured */
    }
  }, []);

  const boxHeight = height ?? (vertical ? 600 : 100);

  return (
    <div
      className={`ad-slot ${className}`}
      data-testid="ad-slot"
      aria-label={label}
      style={{ height: boxHeight, minHeight: boxHeight }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="false"
      />
      <span className="relative z-10 opacity-60 text-[10px] tracking-widest pointer-events-none">
        {label}
      </span>
    </div>
  );
}
