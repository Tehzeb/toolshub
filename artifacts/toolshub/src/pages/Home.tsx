import { useEffect, useMemo, useState } from "react";
import { Link, useSearch } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Check, ExternalLink, Mail, Search, Sparkles, Shield, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { TOOLS, CATEGORIES } from "@/lib/tools";
import { AdSlot } from "@/components/AdSlot";
import { useToast } from "@/hooks/use-toast";
import { subscribeEmail } from "@/lib/newsletter";

export default function Home() {
  useDocumentMeta({
    title: "ToolsHub — Free utilities for everyday work",
    description:
      "ToolsHub bundles a resume builder, file converters, downloaders, image compressor, and QR code generator in one polished, free toolkit.",
  });

  const searchString = useSearch();
  const initialQ = new URLSearchParams(searchString).get("q") ?? "";
  const [query, setQuery] = useState(initialQ);
  const [email, setEmail] = useState("");
  const [submittingEmail, setSubmittingEmail] = useState(false);
  const [proOpen, setProOpen] = useState(false);
  const { toast } = useToast();

  const scrollToTools = () => {
    const el = document.getElementById("tools");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => setQuery(initialQ), [initialQ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TOOLS;
    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }, [query]);

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || submittingEmail) return;
    setSubmittingEmail(true);
    const result = await subscribeEmail(email);
    setSubmittingEmail(false);
    if (result.ok) {
      toast({
        title: "You're on the list",
        description: result.message,
      });
      setEmail("");
    } else {
      toast({
        title: "Hmm, that didn't work",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      {/* HERO */}
      <section className="gradient-bg border-b">
        <div className="container mx-auto max-w-7xl px-4 py-20 md:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
              <Sparkles className="h-3 w-3 text-primary" /> 7 essential tools, all in one place
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto">
              Free everyday tools, <span className="gradient-text">beautifully made</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mt-5 max-w-2xl mx-auto">
              Convert files, compress images, generate QR codes, and craft a polished resume — all
              in one toolbox. No signup, no clutter.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="relative max-w-xl mx-auto mt-10">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search 7 tools — try 'pdf' or 'qr'…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 h-14 text-base rounded-2xl shadow-sm"
                data-testid="input-hero-search"
              />
            </form>
            <div className="flex justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Shield className="h-4 w-4" /> Files stay on your device</span>
              <span className="hidden sm:flex items-center gap-1.5"><Zap className="h-4 w-4" /> Instant, no signup</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Browse by category</h2>
            <p className="text-muted-foreground mt-1">Find the right tool for the job.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <button
                onClick={() => setQuery(cat.name)}
                className="w-full text-left p-4 rounded-xl border bg-card hover-elevate"
                data-testid={`category-${cat.name.toLowerCase()}`}
              >
                <p className="font-semibold text-sm">{cat.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4">
        <AdSlot />
      </div>

      {/* TOOLS GRID */}
      <section className="container mx-auto max-w-7xl px-4 py-16 scroll-mt-24" id="tools">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">All tools</h2>
            <p className="text-muted-foreground mt-1">
              {filtered.length} tool{filtered.length === 1 ? "" : "s"}
              {query ? ` matching "${query}"` : ""}
            </p>
          </div>
          {query && (
            <Button variant="ghost" onClick={() => setQuery("")}>Clear filter</Button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            No tools matched your search.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <Link href={`/tool/${tool.slug}`}>
                    <article
                      className="group h-full p-6 rounded-2xl border bg-card hover-elevate cursor-pointer"
                      data-testid={`tool-card-${tool.slug}`}
                    >
                      <div
                        className={`h-12 w-12 rounded-xl bg-gradient-to-br ${tool.accent} grid place-items-center shadow-sm mb-4`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-lg leading-tight">{tool.name}</h3>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all mt-1" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{tool.description}</p>
                      <div className="mt-5 inline-flex items-center text-xs font-medium text-muted-foreground bg-secondary rounded-full px-2.5 py-1">
                        {tool.category}
                      </div>
                    </article>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* RECOMMENDED TOOLS (affiliate-friendly) */}
      <section className="container mx-auto max-w-7xl px-4 py-16 border-t">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground mb-3">
            <Star className="h-3 w-3 text-amber-500" /> Recommended for power users
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Tools we love</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            When our free tools aren't enough, here are paid apps we genuinely use and recommend.
            Some links may be affiliate links.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { name: "Notion", tag: "Notes & Docs", desc: "All-in-one workspace for notes, docs, and project tracking.", cta: "Try Notion", href: "https://www.notion.so/?ref=toolshub", accent: "from-slate-500 to-slate-700" },
            { name: "Canva Pro", tag: "Design", desc: "Pro design templates for social, presentations, and print.", cta: "Get Canva Pro", href: "https://www.canva.com/pro/?ref=toolshub", accent: "from-cyan-500 to-blue-500" },
            { name: "Grammarly", tag: "Writing", desc: "Smart writing assistant for cleaner emails, docs, and posts.", cta: "Try Grammarly", href: "https://www.grammarly.com/?ref=toolshub", accent: "from-emerald-500 to-green-600" },
            { name: "NordVPN", tag: "Privacy", desc: "Fast, no-logs VPN for safer browsing on any network.", cta: "See NordVPN", href: "https://nordvpn.com/?ref=toolshub", accent: "from-blue-600 to-indigo-700" },
            { name: "Adobe Acrobat", tag: "PDF Pro", desc: "The professional standard for PDF editing and signing.", cta: "Try Acrobat", href: "https://www.adobe.com/acrobat.html?ref=toolshub", accent: "from-red-500 to-rose-600" },
            { name: "Figma", tag: "Design", desc: "Collaborative interface design tool used by modern teams.", cta: "Open Figma", href: "https://www.figma.com/?ref=toolshub", accent: "from-fuchsia-500 to-pink-500" },
          ].map((rec, i) => (
            <motion.a
              key={rec.name}
              href={rec.href}
              target="_blank"
              rel="sponsored noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="group p-6 rounded-2xl border bg-card hover-elevate flex flex-col"
              data-testid={`recommended-${rec.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${rec.accent} grid place-items-center text-white font-bold text-sm shadow-sm`}>
                  {rec.name.charAt(0)}
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-secondary rounded-full px-2.5 py-1">
                  {rec.tag}
                </span>
              </div>
              <h3 className="font-semibold text-lg">{rec.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 flex-1">{rec.desc}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 gap-1 transition-all">
                {rec.cta} <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </motion.a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-6">
          Disclosure: Some links above are affiliate links. If you buy through them, ToolsHub may earn a small commission at no extra cost to you.
        </p>
      </section>

      {/* FREE VS PRO */}
      <section className="container mx-auto max-w-7xl px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Free or Pro — your call</h2>
          <p className="text-muted-foreground mt-2">
            Everything works for free. Upgrade for power features when you need them.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              name: "Free",
              price: "$0",
              tagline: "For everyday use.",
              features: [
                "All 7 tools, unlimited use",
                "Files up to 25 MB",
                "Browser-side processing",
                "Standard download speed",
              ],
              cta: "Start using",
              onClick: scrollToTools,
              highlight: false,
            },
            {
              name: "Pro",
              price: "$5/mo",
              tagline: "For pros and teams.",
              features: [
                "Files up to 500 MB",
                "Batch processing",
                "Priority queue & faster servers",
                "No ads, ever",
                "Save and reuse resumes",
              ],
              cta: "Get Pro",
              onClick: () => setProOpen(true),
              highlight: true,
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl border bg-card ${
                plan.highlight
                  ? "border-primary shadow-lg ring-1 ring-primary/40"
                  : "shadow-sm"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Most popular
                </span>
              )}
              <h3 className="font-semibold text-lg">{plan.name}</h3>
              <p className="text-3xl font-bold mt-2">{plan.price}</p>
              <p className="text-sm text-muted-foreground mt-1">{plan.tagline}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full mt-8 transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                variant={plan.highlight ? "default" : "outline"}
                onClick={plan.onClick}
                data-testid={`button-plan-${plan.name.toLowerCase()}`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container mx-auto max-w-7xl px-4 pb-20">
        <div className="rounded-3xl border bg-gradient-to-br from-primary/10 via-card to-accent/10 p-10 md:p-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Get new tools, straight to your inbox
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            One short email a month. New tools, tips, and updates. Unsubscribe any time.
          </p>
          <form onSubmit={onSignup} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12"
              data-testid="input-newsletter"
            />
            <Button
              type="submit"
              size="lg"
              className="h-12"
              disabled={submittingEmail}
              data-testid="button-newsletter"
            >
              {submittingEmail ? "Subscribing…" : "Subscribe"}
            </Button>
          </form>
        </div>
      </section>

      {/* PRO ACCESS MODAL */}
      <Dialog open={proOpen} onOpenChange={setProOpen}>
        <DialogContent className="sm:max-w-md" data-testid="dialog-pro-access">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-center text-xl">Pro access coming soon!</DialogTitle>
            <DialogDescription className="text-center pt-2">
              We're putting the finishing touches on the Pro plan. Email us to get early access
              and a launch discount when it goes live.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border bg-muted/40 p-4 flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary shrink-0" />
            <a
              href="mailto:tehzeeb.x51214@gmail.com?subject=ToolsHub%20Pro%20%E2%80%94%20Early%20access%20request"
              className="text-sm font-medium hover:underline break-all"
              data-testid="link-pro-email"
            >
              tehzeeb.x51214@gmail.com
            </a>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setProOpen(false)}
              className="w-full sm:w-auto"
              data-testid="button-pro-close"
            >
              Maybe later
            </Button>
            <Button
              asChild
              className="w-full sm:w-auto"
              data-testid="button-pro-email"
            >
              <a href="mailto:tehzeeb.x51214@gmail.com?subject=ToolsHub%20Pro%20%E2%80%94%20Early%20access%20request">
                Email for early access
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
