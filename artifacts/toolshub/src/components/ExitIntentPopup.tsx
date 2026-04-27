import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { subscribeEmail } from "@/lib/newsletter";

const SESSION_KEY = "toolshub:exit-popup:shown";
const MIN_TIME_ON_PAGE_MS = 8000;
const MOBILE_SCROLL_DELAY_MS = 35000;

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem(SESSION_KEY) === "1") return;

    const startedAt = Date.now();
    let triggered = false;
    let mobileTimer: ReturnType<typeof setTimeout> | undefined;

    const trigger = () => {
      if (triggered) return;
      if (Date.now() - startedAt < MIN_TIME_ON_PAGE_MS) return;
      triggered = true;
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };

    const isTouch =
      window.matchMedia && window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) {
      mobileTimer = setTimeout(() => {
        let lastY = window.scrollY;
        let upScroll = 0;
        const onScroll = () => {
          const dy = lastY - window.scrollY;
          if (dy > 0) upScroll += dy;
          else upScroll = 0;
          lastY = window.scrollY;
          if (upScroll > 200) {
            window.removeEventListener("scroll", onScroll);
            trigger();
          }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
      }, MOBILE_SCROLL_DELAY_MS);
    } else {
      document.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      if (mobileTimer) clearTimeout(mobileTimer);
    };
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const result = await subscribeEmail(email);
    setSubmitting(false);
    if (result.ok) {
      toast({ title: "You're on the list", description: result.message });
      setEmail("");
      setOpen(false);
    } else {
      toast({
        title: "Hmm, that didn't work",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-popup-title"
          data-testid="exit-intent-popup"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative w-full max-w-md rounded-2xl border bg-card p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              data-testid="button-exit-popup-close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex justify-center">
              <div className="rounded-2xl bg-primary/10 p-3">
                <Mail className="h-6 w-6 text-primary" />
              </div>
            </div>

            <h2
              id="exit-popup-title"
              className="text-2xl font-bold text-center mt-4"
            >
              Wait — before you go!
            </h2>
            <p className="text-center text-muted-foreground mt-2">
              Get new free tools and productivity tips delivered once a month.
              No spam, unsubscribe any time.
            </p>

            <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                className="h-12"
                data-testid="input-exit-popup-email"
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full"
                disabled={submitting}
                data-testid="button-exit-popup-submit"
              >
                {submitting ? (
                  "Subscribing…"
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Send me free tools
                  </>
                )}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Join readers getting smarter tools every month.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
