import { useDocumentMeta } from "@/hooks/use-document-meta";

export default function Privacy() {
  useDocumentMeta({
    title: "Privacy Policy",
    description: "How ToolsHub handles your data and protects your privacy.",
  });

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mt-2">Last updated: April 2026</p>

      <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
        <h2>Our approach</h2>
        <p>
          ToolsHub is built around a simple principle: the less of your data we have, the better.
          Most of our tools run entirely in your browser. Files you upload to converters,
          compressors, and generators are processed locally and never sent to our servers.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Anonymous analytics:</strong> page views, browser type, and referring sites,
            used to understand which tools are most useful.
          </li>
          <li>
            <strong>Cookies:</strong> we use a small number of cookies for theme preference, cookie
            consent, and (if you opt in) advertising personalization.
          </li>
          <li>
            <strong>Email (if you subscribe):</strong> only used to send tool updates. Unsubscribe
            anytime.
          </li>
        </ul>

        <h2>What we don't collect</h2>
        <ul>
          <li>The contents of files you process with our tools.</li>
          <li>Your name or contact details unless you explicitly send them via the contact form.</li>
          <li>Payment information — we use a third-party payment processor for our Pro plan.</li>
        </ul>

        <h2>Cookies and ads</h2>
        <p>
          We display ads to keep ToolsHub free. Ad partners may set cookies to personalize ads based
          on your visits. You can opt out at any time using the cookie banner.
        </p>

        <h2>Your rights</h2>
        <p>
          Under GDPR and similar laws, you have the right to access, correct, or delete the data we
          hold about you. Email us at tehzeeb.x51214@gmail.com and we'll respond within 30 days.
        </p>

        <h2>Contact</h2>
        <p>For privacy questions, reach us at tehzeeb.x51214@gmail.com.</p>
      </div>
    </div>
  );
}
