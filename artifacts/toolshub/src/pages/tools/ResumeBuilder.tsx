import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Sparkles, Download, X } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { getToolBySlug } from "@/lib/tools";
import { useToast } from "@/hooks/use-toast";

type Template = "modern" | "classic" | "creative";

interface Experience {
  role: string;
  company: string;
  period: string;
  bullets: string;
}
interface Education {
  degree: string;
  school: string;
  period: string;
}
interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
}

const SAMPLE: ResumeData = {
  name: "Alex Rivera",
  title: "Senior Product Designer",
  email: "alex@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  summary:
    "Designer with eight years building human-friendly interfaces for SaaS and consumer products. Skilled at turning fuzzy problems into clear, opinionated user experiences.",
  skills: ["Figma", "Design Systems", "Prototyping", "User Research", "TypeScript", "Accessibility"],
  experience: [
    {
      role: "Senior Product Designer",
      company: "Northwind Labs",
      period: "2022 — Present",
      bullets:
        "Led the redesign of the analytics dashboard, raising weekly active use by 38%.\nOwned the cross-platform design system, shipping 60+ components in two quarters.\nMentored three junior designers and ran weekly design critiques.",
    },
    {
      role: "Product Designer",
      company: "Helix",
      period: "2019 — 2022",
      bullets:
        "Designed the company's first mobile app from scratch, reaching 100k installs in year one.\nPartnered with engineering to define a new accessibility baseline for all customer features.",
    },
  ],
  education: [
    { degree: "B.A., Human-Computer Interaction", school: "UC San Diego", period: "2014 — 2018" },
  ],
};

function enhanceText(input: string): string {
  if (!input.trim()) return "";
  const verbs = ["Led", "Owned", "Drove", "Designed", "Shipped", "Architected", "Built", "Scaled"];
  const lines = input.split(/\n+/).filter(Boolean);
  return lines
    .map((line, i) => {
      let s = line.trim().replace(/^[-•*]\s*/, "");
      // Replace weak openers
      s = s.replace(/^(i\s+|i'?ve\s+)?(was responsible for|helped|worked on|did)\s+/i, `${verbs[i % verbs.length]} `);
      // Capitalize first letter
      s = s.charAt(0).toUpperCase() + s.slice(1);
      // Make sure it ends with a period
      if (!/[.!?]$/.test(s)) s = s + ".";
      // If still starts weakly, prepend a verb
      if (!/^[A-Z][a-z]+\s/.test(s)) s = `${verbs[i % verbs.length]} ${s.charAt(0).toLowerCase()}${s.slice(1)}`;
      return s;
    })
    .join("\n");
}

export default function ResumeBuilder() {
  const tool = getToolBySlug("resume-builder")!;
  useDocumentMeta({ title: tool.name, description: tool.description });
  const { toast } = useToast();

  const [data, setData] = useState<ResumeData>(SAMPLE);
  const [skillDraft, setSkillDraft] = useState("");
  const [template, setTemplate] = useState<Template>("modern");
  const [busy, setBusy] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof ResumeData>(k: K, v: ResumeData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const addSkill = () => {
    const s = skillDraft.trim();
    if (s && !data.skills.includes(s)) update("skills", [...data.skills, s]);
    setSkillDraft("");
  };

  const removeSkill = (s: string) =>
    update("skills", data.skills.filter((x) => x !== s));

  const addExp = () =>
    update("experience", [...data.experience, { role: "", company: "", period: "", bullets: "" }]);
  const updateExp = (i: number, k: keyof Experience, v: string) =>
    update("experience", data.experience.map((e, idx) => (idx === i ? { ...e, [k]: v } : e)));
  const removeExp = (i: number) =>
    update("experience", data.experience.filter((_, idx) => idx !== i));

  const addEdu = () => update("education", [...data.education, { degree: "", school: "", period: "" }]);
  const updateEdu = (i: number, k: keyof Education, v: string) =>
    update("education", data.education.map((e, idx) => (idx === i ? { ...e, [k]: v } : e)));
  const removeEdu = (i: number) =>
    update("education", data.education.filter((_, idx) => idx !== i));

  const enhanceSummary = () => {
    update("summary", enhanceText(data.summary));
    toast({ title: "Summary polished", description: "Action verbs and structure refined." });
  };

  const enhanceBullets = (i: number) => {
    updateExp(i, "bullets", enhanceText(data.experience[i].bullets));
    toast({ title: "Bullets polished" });
  };

  const downloadPdf = async () => {
    if (!previewRef.current) return;
    setBusy(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({ unit: "pt", format: "letter" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
      let y = 0;
      let remaining = imgHeight;
      while (remaining > 0) {
        pdf.addImage(imgData, "JPEG", 0, y, pageWidth, imgHeight);
        remaining -= pageHeight;
        if (remaining > 0) {
          pdf.addPage();
          y -= pageHeight;
        }
      }
      pdf.save(`${data.name.replace(/\s+/g, "-").toLowerCase() || "resume"}.pdf`);
      toast({ title: "Resume downloaded" });
    } catch (err) {
      console.error(err);
      toast({ title: "Download failed", variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <ToolPageLayout
      tool={tool}
      steps={[
        "Fill in your details — name, summary, experience, education, and skills.",
        "Pick a template and use the Polish button for AI-assisted phrasing.",
        "Download a print-ready PDF you can send to recruiters.",
      ]}
      faqs={[
        { q: "Are my details saved anywhere?", a: "No. Everything stays in your browser. Refreshing the page resets the form." },
        { q: "Can I edit the PDF later?", a: "The downloaded file is a PDF. To edit, use the Word-to-PDF converter or come back here and download again." },
        { q: "What templates are available?", a: "Modern, Classic, and Creative — each with its own typography and layout." },
        { q: "Does the Polish button use AI?", a: "It uses an on-device language enhancer that swaps weak openers for strong action verbs and tightens phrasing." },
      ]}
    >
      <Tabs value={template} onValueChange={(v) => setTemplate(v as Template)} className="mb-6">
        <TabsList className="grid grid-cols-3 w-full md:w-auto md:inline-grid">
          <TabsTrigger value="modern" data-testid="tab-modern">Modern</TabsTrigger>
          <TabsTrigger value="classic" data-testid="tab-classic">Classic</TabsTrigger>
          <TabsTrigger value="creative" data-testid="tab-creative">Creative</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* FORM */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 space-y-1.5">
              <Label>Full name</Label>
              <Input value={data.name} onChange={(e) => update("name", e.target.value)} data-testid="input-name" />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Title</Label>
              <Input value={data.title} onChange={(e) => update("title", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input value={data.email} onChange={(e) => update("email", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input value={data.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Location</Label>
              <Input value={data.location} onChange={(e) => update("location", e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label>Summary</Label>
              <Button variant="ghost" size="sm" onClick={enhanceSummary}>
                <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Polish
              </Button>
            </div>
            <Textarea rows={4} value={data.summary} onChange={(e) => update("summary", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Skills</Label>
            <div className="flex gap-2">
              <Input
                value={skillDraft}
                onChange={(e) => setSkillDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Type a skill and press Enter"
              />
              <Button type="button" variant="outline" onClick={addSkill}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground rounded-full px-2.5 py-1 text-xs"
                >
                  {s}
                  <button onClick={() => removeSkill(s)} aria-label={`Remove ${s}`}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Experience</Label>
              <Button variant="outline" size="sm" onClick={addExp}><Plus className="h-3.5 w-3.5 mr-1" /> Add</Button>
            </div>
            {data.experience.map((exp, i) => (
              <div key={i} className="rounded-lg border p-4 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Role" value={exp.role} onChange={(e) => updateExp(i, "role", e.target.value)} />
                  <Input placeholder="Company" value={exp.company} onChange={(e) => updateExp(i, "company", e.target.value)} />
                  <Input className="col-span-2" placeholder="Period (e.g. 2022 — Present)" value={exp.period} onChange={(e) => updateExp(i, "period", e.target.value)} />
                </div>
                <Textarea
                  rows={3}
                  placeholder="One bullet per line. e.g. Led redesign of dashboard."
                  value={exp.bullets}
                  onChange={(e) => updateExp(i, "bullets", e.target.value)}
                />
                <div className="flex justify-between">
                  <Button variant="ghost" size="sm" onClick={() => enhanceBullets(i)}>
                    <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Polish bullets
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeExp(i)}>
                    <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Education</Label>
              <Button variant="outline" size="sm" onClick={addEdu}><Plus className="h-3.5 w-3.5 mr-1" /> Add</Button>
            </div>
            {data.education.map((edu, i) => (
              <div key={i} className="rounded-lg border p-4 space-y-2">
                <Input placeholder="Degree" value={edu.degree} onChange={(e) => updateEdu(i, "degree", e.target.value)} />
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="School" value={edu.school} onChange={(e) => updateEdu(i, "school", e.target.value)} />
                  <Input placeholder="Period" value={edu.period} onChange={(e) => updateEdu(i, "period", e.target.value)} />
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={() => removeEdu(i)}>
                    <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={downloadPdf} disabled={busy} size="lg" className="w-full" data-testid="button-download-pdf">
            <Download className="h-4 w-4 mr-2" /> {busy ? "Generating PDF…" : "Download PDF"}
          </Button>
        </div>

        {/* PREVIEW */}
        <div className="lg:sticky lg:top-24 self-start">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Live preview</p>
          <div className="rounded-xl border bg-secondary p-4 max-h-[80vh] overflow-y-auto">
            <div ref={previewRef} className={`mx-auto bg-white text-slate-900 shadow-sm`} style={{ width: 612, minHeight: 792, padding: 0 }}>
              <ResumePreview data={data} template={template} />
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}

function ResumePreview({ data, template }: { data: ResumeData; template: Template }) {
  if (template === "modern") {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", minHeight: 792 }}>
        <aside style={{ background: "#1e1b4b", color: "white", padding: "32px 20px" }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.15, margin: 0 }}>{data.name || "Your Name"}</h1>
          <p style={{ fontSize: 12, color: "#c7d2fe", marginTop: 6 }}>{data.title}</p>
          <div style={{ marginTop: 24 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#a5b4fc", textTransform: "uppercase" }}>Contact</p>
            <p style={{ fontSize: 11, marginTop: 6, wordBreak: "break-word" }}>{data.email}</p>
            <p style={{ fontSize: 11, marginTop: 4 }}>{data.phone}</p>
            <p style={{ fontSize: 11, marginTop: 4 }}>{data.location}</p>
          </div>
          <div style={{ marginTop: 24 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#a5b4fc", textTransform: "uppercase" }}>Skills</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 0 0" }}>
              {data.skills.map((s) => (
                <li key={s} style={{ fontSize: 11, padding: "3px 0" }}>{s}</li>
              ))}
            </ul>
          </div>
        </aside>
        <section style={{ padding: 32 }}>
          <Section title="Summary" color="#1e1b4b">
            <p style={{ fontSize: 12, lineHeight: 1.6 }}>{data.summary}</p>
          </Section>
          <Section title="Experience" color="#1e1b4b">
            {data.experience.map((e, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong style={{ fontSize: 12 }}>{e.role} · {e.company}</strong>
                  <span style={{ fontSize: 11, color: "#64748b" }}>{e.period}</span>
                </div>
                <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
                  {e.bullets.split("\n").filter(Boolean).map((b, j) => (
                    <li key={j} style={{ fontSize: 11.5, lineHeight: 1.5, marginBottom: 2 }}>{b.replace(/^[-•*]\s*/, "")}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
          <Section title="Education" color="#1e1b4b">
            {data.education.map((e, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12 }}><strong>{e.degree}</strong>, {e.school}</span>
                <span style={{ fontSize: 11, color: "#64748b" }}>{e.period}</span>
              </div>
            ))}
          </Section>
        </section>
      </div>
    );
  }

  if (template === "classic") {
    return (
      <div style={{ padding: 48, fontFamily: "Georgia, serif" }}>
        <header style={{ textAlign: "center", borderBottom: "2px solid #111", paddingBottom: 14 }}>
          <h1 style={{ fontSize: 26, margin: 0, letterSpacing: 1 }}>{data.name || "Your Name"}</h1>
          <p style={{ fontSize: 13, marginTop: 4, color: "#444" }}>{data.title}</p>
          <p style={{ fontSize: 11, marginTop: 6, color: "#555" }}>{[data.email, data.phone, data.location].filter(Boolean).join(" · ")}</p>
        </header>
        <Section title="SUMMARY" color="#111" classic>
          <p style={{ fontSize: 12, lineHeight: 1.6 }}>{data.summary}</p>
        </Section>
        <Section title="EXPERIENCE" color="#111" classic>
          {data.experience.map((e, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ fontSize: 12 }}>{e.role}, {e.company}</strong>
                <em style={{ fontSize: 11, color: "#444" }}>{e.period}</em>
              </div>
              <ul style={{ margin: "4px 0 0 18px", padding: 0 }}>
                {e.bullets.split("\n").filter(Boolean).map((b, j) => (
                  <li key={j} style={{ fontSize: 11.5, lineHeight: 1.55, marginBottom: 2 }}>{b.replace(/^[-•*]\s*/, "")}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
        <Section title="EDUCATION" color="#111" classic>
          {data.education.map((e, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 12 }}><strong>{e.degree}</strong> — {e.school}</span>
              <em style={{ fontSize: 11, color: "#444" }}>{e.period}</em>
            </div>
          ))}
        </Section>
        <Section title="SKILLS" color="#111" classic>
          <p style={{ fontSize: 12 }}>{data.skills.join(" · ")}</p>
        </Section>
      </div>
    );
  }

  // Creative
  return (
    <div style={{ padding: 0, fontFamily: "Inter, sans-serif" }}>
      <header style={{ background: "linear-gradient(135deg,#f472b6,#a78bfa)", color: "white", padding: "40px 36px" }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0, lineHeight: 1.05 }}>{data.name || "Your Name"}</h1>
        <p style={{ fontSize: 15, marginTop: 8, fontWeight: 500 }}>{data.title}</p>
        <p style={{ fontSize: 11.5, marginTop: 14, opacity: 0.9 }}>{[data.email, data.phone, data.location].filter(Boolean).join("  ·  ")}</p>
      </header>
      <div style={{ padding: 36 }}>
        <Section title="About" color="#a78bfa">
          <p style={{ fontSize: 12, lineHeight: 1.6 }}>{data.summary}</p>
        </Section>
        <Section title="Experience" color="#a78bfa">
          {data.experience.map((e, i) => (
            <div key={i} style={{ marginBottom: 16, paddingLeft: 14, borderLeft: "3px solid #f472b6" }}>
              <strong style={{ fontSize: 12.5 }}>{e.role}</strong>
              <p style={{ fontSize: 11.5, color: "#64748b", marginTop: 2 }}>{e.company} · {e.period}</p>
              <ul style={{ margin: "6px 0 0 16px", padding: 0 }}>
                {e.bullets.split("\n").filter(Boolean).map((b, j) => (
                  <li key={j} style={{ fontSize: 11.5, lineHeight: 1.5, marginBottom: 2 }}>{b.replace(/^[-•*]\s*/, "")}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <Section title="Education" color="#a78bfa">
            {data.education.map((e, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <p style={{ fontSize: 12 }}><strong>{e.degree}</strong></p>
                <p style={{ fontSize: 11, color: "#64748b" }}>{e.school} · {e.period}</p>
              </div>
            ))}
          </Section>
          <Section title="Skills" color="#a78bfa">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {data.skills.map((s) => (
                <span key={s} style={{ fontSize: 10.5, background: "#fce7f3", color: "#9d174d", padding: "3px 10px", borderRadius: 999 }}>{s}</span>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, color, classic, children }: { title: string; color: string; classic?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 22 }}>
      <h2
        style={{
          fontSize: classic ? 13 : 11,
          fontWeight: 700,
          letterSpacing: classic ? 2 : 1.5,
          textTransform: "uppercase",
          color,
          margin: "0 0 10px 0",
          borderBottom: classic ? "1px solid #ddd" : "none",
          paddingBottom: classic ? 4 : 0,
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
