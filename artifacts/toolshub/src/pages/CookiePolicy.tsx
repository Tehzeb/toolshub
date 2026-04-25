import { useDocumentMeta } from "@/hooks/use-document-meta";

export default function CookiePolicy() {
  useDocumentMeta({
    title: "Cookie Policy",
    description:
      "ToolsHub Cookie Policy — what cookies we use, why we use them, and how you can control them.",
  });

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Cookie Policy — ToolsHub</h1>
      <p className="text-sm text-muted-foreground mt-2">Last updated: April 25, 2026</p>

      <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
        <h2>1. Introduction</h2>
        <p>
          This Cookie Policy explains how ToolsHub ("we", "our", "us") uses cookies and similar
          tracking technologies on our website at{" "}
          <a href="https://tools-hub--tehzeebx51214.replit.app">
            tools-hub--tehzeebx51214.replit.app
          </a>
          . It explains what these technologies are, why we use them, and your rights to control
          our use of them. Please read this policy together with our{" "}
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>

        <h2>2. What are cookies?</h2>
        <p>
          Cookies are small text files that are stored on your device (computer, tablet, or
          mobile phone) when you visit a website. They are widely used to make websites work, or
          to work more efficiently, as well as to provide information to the owners of the site.
          We also use similar technologies such as local storage and pixels, which work in a
          similar way.
        </p>

        <h2>3. Types of cookies we use</h2>
        <p>We use the following categories of cookies on ToolsHub:</p>
        <ul>
          <li>
            <strong>Strictly necessary cookies:</strong> Required for the website to function
            properly. These include cookies that remember your cookie consent choice and your
            theme preference (light/dark mode). The site cannot work properly without these.
          </li>
          <li>
            <strong>Analytics cookies:</strong> Help us understand how visitors interact with our
            website by collecting and reporting information anonymously. We use Google Analytics
            for this purpose.
          </li>
          <li>
            <strong>Advertising cookies:</strong> Used by Google AdSense and our advertising
            partners to show you relevant ads based on your browsing activity on this and other
            websites.
          </li>
        </ul>

        <h2>4. Specific cookies we set</h2>
        <ul>
          <li>
            <strong>toolshub-cookie-consent</strong> (local storage) — remembers whether you
            accepted or declined cookies. Persists until you clear your browser storage.
          </li>
          <li>
            <strong>toolshub-theme</strong> (local storage) — remembers your light/dark theme
            preference. Persists until you clear your browser storage.
          </li>
        </ul>

        <h2>5. Third-party cookies</h2>
        <p>
          In addition to the cookies we set ourselves, the following third-party services may
          set their own cookies on your device when you visit our site:
        </p>
        <ul>
          <li>
            <strong>Google Analytics</strong> — for website traffic analysis. Learn more in
            Google's{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              privacy policy
            </a>
            .
          </li>
          <li>
            <strong>Google AdSense</strong> — for displaying personalized advertisements. You can
            manage your ad preferences at{" "}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>
            .
          </li>
        </ul>

        <h2>6. How you can control cookies</h2>
        <p>You have several options for controlling or limiting how we and our partners use cookies:</p>
        <ul>
          <li>
            <strong>Cookie banner:</strong> When you first visit ToolsHub, you can accept all
            cookies or only the strictly necessary ones using our cookie banner. You can change
            your choice anytime by clearing the <code>toolshub-cookie-consent</code> entry from
            your browser's local storage.
          </li>
          <li>
            <strong>Browser settings:</strong> Most browsers let you refuse or delete cookies
            through their settings. Visit your browser's help pages for instructions. Note that
            if you disable cookies entirely, some parts of our site may not work as expected.
          </li>
          <li>
            <strong>Opt out of personalized ads:</strong> You can opt out of personalized ads
            from Google by visiting{" "}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>{" "}
            or from many other ad networks at{" "}
            <a
              href="https://www.youronlinechoices.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Your Online Choices
            </a>
            .
          </li>
        </ul>

        <h2>7. Children's privacy</h2>
        <p>
          Our website is not directed to children under the age of 13, and we do not knowingly
          collect personal information from children through cookies or any other means.
        </p>

        <h2>8. Changes to this policy</h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes in our practices
          or for other operational, legal, or regulatory reasons. When we do, we will revise the
          "Last updated" date at the top of this page. We encourage you to review this page
          periodically.
        </p>

        <h2>9. Contact us</h2>
        <p>
          If you have any questions about our use of cookies, please contact us at:{" "}
          <a href="mailto:tehzeeb.x51214@gmail.com">tehzeeb.x51214@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
