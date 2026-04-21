import { useEffect, useMemo, useState } from "react";
import { Link, useSearch } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Check, Search, Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { TOOLS, CATEGORIES } from "@/lib/tools";
import { AdSlot } from "@/components/AdSlot";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

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

  const onSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast({
      title: "You're on the list",
      description: "We'll send you new tools and updates — never spam.",
    });
    setEmail("");
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
      <section className="container mx-auto max-w-7xl px-4 py-16" id="tools">
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
                className="w-full mt-8"
                variant={plan.highlight ? "default" : "outline"}
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
            <Button type="submit" size="lg" className="h-12" data-testid="button-newsletter">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
