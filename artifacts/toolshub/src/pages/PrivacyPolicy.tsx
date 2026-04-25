import { useDocumentMeta } from "@/hooks/use-document-meta";

export default function PrivacyPolicy() {
  useDocumentMeta({
    title: "Privacy Policy",
    description:
      "ToolsHub Privacy Policy — how we collect, use, and share information when you use our website.",
  });

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Privacy Policy — ToolsHub</h1>
      <p className="text-sm text-muted-foreground mt-2">Last updated: April 25, 2026</p>

      <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
        <h2>1. Introduction</h2>
        <p>
          Welcome to ToolsHub ("we", "our", "us"). We are committed to protecting your personal
          information and your right to privacy. This Privacy Policy explains how we collect, use,
          and share information when you use our website at{" "}
          <a href="https://tools-hub--tehzeebx51214.replit.app">
            tools-hub--tehzeebx51214.replit.app
          </a>
          .
        </p>

        <h2>2. Information we collect</h2>
        <p>
          We do not require you to create an account or log in to use our tools. However, we may
          automatically collect certain information when you visit our website, including:
        </p>
        <ul>
          <li>Browser type and version</li>
          <li>Pages you visit and time spent on each page</li>
          <li>Referring website address</li>
          <li>Device type (mobile or desktop)</li>
          <li>Approximate geographic location (country/city level only)</li>
        </ul>

        <h2>3. Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to improve your experience on our site.
          Cookies are small files stored on your device. You can instruct your browser to refuse
          all cookies or to indicate when a cookie is being sent. However, if you do not accept
          cookies, some parts of our site may not function properly. We use Google Analytics and
          Google AdSense, which may place their own cookies on your device.
        </p>

        <h2>4. Google AdSense &amp; advertising</h2>
        <p>
          We use Google AdSense to display advertisements on our website. Google uses cookies to
          show relevant ads based on your previous visits to this and other websites. You may opt
          out of personalized advertising by visiting{" "}
          <a
            href="https://adssettings.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </a>
          . Third-party vendors, including Google, use cookies to serve ads based on your prior
          visits to our website or other websites.
        </p>

        <h2>5. How we use your information</h2>
        <ul>
          <li>To operate and improve our website and tools</li>
          <li>To analyze website traffic and usage patterns</li>
          <li>To display relevant advertisements via Google AdSense</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2>6. Third-party services</h2>
        <p>
          We may use the following third-party services on our website. Each has its own privacy
          policy:
        </p>
        <ul>
          <li>Google Analytics — for website traffic analysis</li>
          <li>Google AdSense — for displaying advertisements</li>
        </ul>

        <h2>7. Children's privacy</h2>
        <p>
          Our website is not directed to children under the age of 13. We do not knowingly collect
          personal information from children. If you are a parent or guardian and believe your
          child has provided us with personal information, please contact us.
        </p>

        <h2>8. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes
          by posting the new Privacy Policy on this page with a new "Last updated" date. We
          encourage you to review this page periodically.
        </p>

        <h2>9. Contact us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:{" "}
          <a href="mailto:tehzeeb.x51214@gmail.com">tehzeeb.x51214@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
