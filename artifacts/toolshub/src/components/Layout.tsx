import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";
import { AdSlot } from "./AdSlot";
import { ExitIntentPopup } from "./ExitIntentPopup";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto max-w-7xl px-4 pt-4">
        <AdSlot slot="1111111111" label="Header Ad" />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieBanner />
      <ExitIntentPopup />
    </div>
  );
}
