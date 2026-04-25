import type { ReactNode } from "react";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AdSlot } from "./AdSlot";
import type { Tool } from "@/lib/tools";

interface FAQ {
  q: string;
  a: string;
}

interface Props {
  tool: Tool;
  steps: string[];
  faqs: FAQ[];
  children: ReactNode;
}

export function ToolPageLayout({ tool, steps, faqs, children }: Props) {
  const Icon = tool.icon;
  return (
    <div className="container mx-auto px-4 max-w-7xl py-10">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{tool.name}</span>
      </nav>

      <div className="flex items-start gap-4 mb-8">
        <div
          className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${tool.accent} grid place-items-center shadow-md shrink-0`}
        >
          <Icon className="h-7 w-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{tool.name}</h1>
          <p className="text-muted-foreground mt-1 text-lg">{tool.tagline}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        <div className="min-w-0">
          <section className="rounded-xl border bg-card p-6 md:p-8 shadow-sm mb-10">
            {children}
          </section>

          <section className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h2 className="text-xl font-semibold mb-4">How to use</h2>
              <ol className="space-y-3">
                {steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="h-7 w-7 rounded-full bg-primary text-primary-foreground text-sm font-semibold grid place-items-center shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-muted-foreground pt-0.5">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Why ToolsHub?</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Works in your browser — your files stay on your device.</li>
                <li>• Free, with no signup required.</li>
                <li>• Built for both desktop and mobile.</li>
                <li>• Polished interface, no ads-first clutter.</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="border rounded-xl bg-card">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="px-5 border-b last:border-0">
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <AdSlot slot="3333333333" label="In-Article Ad" />
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <AdSlot slot="2222222222" label="Sidebar Ad" vertical format="vertical" />
          </div>
        </aside>
      </div>
    </div>
  );
}
