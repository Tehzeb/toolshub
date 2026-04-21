import { useDocumentMeta } from "@/hooks/use-document-meta";
import { Heart, Lock, Zap } from "lucide-react";

export default function About() {
  useDocumentMeta({
    title: "About",
    description:
      "ToolsHub is a free toolkit of utilities for everyday work — built with care for speed, privacy, and a great experience.",
  });

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About ToolsHub</h1>
      <p className="text-xl text-muted-foreground mt-4">
        A small, focused toolkit for the things you do every week.
      </p>

      <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
        <p>
          The web is full of free utilities — most of them buried under ads, popups, and confusing
          interfaces. ToolsHub started as a simple idea: take the tools we reach for again and
          again, and make versions that we'd genuinely enjoy using ourselves.
        </p>
        <p>
          Every tool here is designed around three rules: it should be fast, it should respect your
          privacy, and it should look like something built in this decade. Most of our tools run
          entirely in your browser — your files never leave your device.
        </p>
        <h2>Our mission</h2>
        <p>
          To make the small jobs of everyday work feel effortless. Whether you're applying for a new
          role, sharing a video link, or compressing a photo for a form, you shouldn't have to fight
          your tools.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-12">
        {[
          { icon: Zap, title: "Fast", text: "Tools that load instantly and run in your browser." },
          { icon: Lock, title: "Private", text: "Your files stay on your device whenever possible." },
          { icon: Heart, title: "Crafted", text: "Designed by people who use these tools daily." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="p-5 rounded-xl border bg-card">
            <Icon className="h-5 w-5 text-primary" />
            <h3 className="font-semibold mt-3">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
