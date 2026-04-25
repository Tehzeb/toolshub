import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { Mail, MessageSquare } from "lucide-react";

export default function Contact() {
  useDocumentMeta({
    title: "Contact",
    description: "Get in touch with the ToolsHub team. We read every message.",
  });

  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "Thanks for reaching out — we'll get back to you within 1–2 business days.",
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Contact us</h1>
      <p className="text-lg text-muted-foreground mt-4">
        Found a bug, have an idea for a new tool, or want to say hello? Drop us a line.
      </p>

      <div className="grid md:grid-cols-3 gap-4 mt-10">
        <div className="p-5 rounded-xl border bg-card">
          <Mail className="h-5 w-5 text-primary" />
          <p className="font-medium mt-2 text-sm">Email</p>
          <p className="text-sm text-muted-foreground">tehzeeb.x51214@gmail.com</p>
        </div>
        <div className="p-5 rounded-xl border bg-card">
          <MessageSquare className="h-5 w-5 text-primary" />
          <p className="font-medium mt-2 text-sm">Support</p>
          <p className="text-sm text-muted-foreground">Replies within 24h</p>
        </div>
        <div className="p-5 rounded-xl border bg-card">
          <p className="font-medium mt-2 text-sm">Office</p>
          <p className="text-sm text-muted-foreground">Remote-first, worldwide</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-10 space-y-5 p-6 md:p-8 rounded-2xl border bg-card">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              data-testid="input-name"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              data-testid="input-email"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            required
            rows={6}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            data-testid="input-message"
          />
        </div>
        <Button type="submit" size="lg" data-testid="button-send">Send message</Button>
      </form>
    </div>
  );
}
