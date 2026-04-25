import { useDocumentMeta } from "@/hooks/use-document-meta";

export default function Terms() {
  useDocumentMeta({
    title: "Terms of Service",
    description:
      "ToolsHub Terms of Service — the rules and conditions for using our website and tools.",
  });

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Terms of Service — ToolsHub</h1>
      <p className="text-sm text-muted-foreground mt-2">Last updated: April 25, 2026</p>

      <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
        <h2>1. Introduction</h2>
        <p>
          Welcome to ToolsHub ("we", "our", "us"). These Terms of Service ("Terms") govern your
          access to and use of our website at{" "}
          <a href="https://tools-hub--tehzeebx51214.replit.app">
            tools-hub--tehzeebx51214.replit.app
          </a>{" "}
          and all tools, features, and content we provide (collectively, the "Service"). By
          accessing or using the Service, you agree to be bound by these Terms. If you do not
          agree, please do not use the Service.
        </p>

        <h2>2. Eligibility</h2>
        <p>
          You must be at least 13 years old to use the Service. By using ToolsHub, you represent
          and warrant that you meet this age requirement and that you have the legal capacity to
          enter into these Terms.
        </p>

        <h2>3. Use of our tools</h2>
        <p>
          ToolsHub provides free online utilities such as a resume builder, file converters, an
          image compressor, a QR code generator, and similar tools. You agree to use these tools
          only for lawful purposes and in accordance with these Terms. Specifically, you agree
          not to:
        </p>
        <ul>
          <li>Use the Service in any way that violates applicable laws or regulations</li>
          <li>
            Upload or process content you do not have the right to use, including copyrighted
            material, trademarks, or private personal data of others
          </li>
          <li>
            Attempt to gain unauthorized access to the Service, our servers, or related systems
          </li>
          <li>
            Interfere with, disrupt, or place an unreasonable load on the Service (e.g.,
            scraping, flooding, or automated abuse)
          </li>
          <li>
            Use the Service to create or distribute spam, malware, or any harmful or deceptive
            content
          </li>
        </ul>

        <h2>4. Intellectual property</h2>
        <p>
          All content on ToolsHub — including the website design, branding, logos, text,
          graphics, and underlying source code — is owned by ToolsHub or its licensors and is
          protected by copyright, trademark, and other intellectual property laws. You may not
          copy, modify, distribute, sell, or lease any part of the Service without our prior
          written permission.
        </p>
        <p>
          You retain ownership of any files or content you process through our tools. Because
          most tools run entirely in your browser, we do not claim any rights to your files.
        </p>

        <h2>5. User-generated content</h2>
        <p>
          Some tools allow you to create, edit, or download content (such as resumes, QR codes,
          or compressed images). You are solely responsible for the content you create and for
          ensuring it does not infringe the rights of any third party. We do not store or
          monitor the content processed through our tools.
        </p>

        <h2>6. Advertising and third-party services</h2>
        <p>
          The Service is supported by advertising. We use Google AdSense and may use other
          third-party advertising partners who may set cookies and collect information as
          described in our{" "}
          <a href="/privacy-policy">Privacy Policy</a>. Ads displayed on the Service do not
          constitute an endorsement of the advertised products or services.
        </p>
        <p>
          The Service may contain links to third-party websites or services that we do not own or
          control. We are not responsible for the content, policies, or practices of any
          third-party websites.
        </p>

        <h2>7. Disclaimer of warranties</h2>
        <p>
          The Service is provided "as is" and "as available", without warranties of any kind,
          either express or implied, including but not limited to warranties of merchantability,
          fitness for a particular purpose, non-infringement, or accuracy. We do not warrant
          that the Service will be uninterrupted, secure, error-free, or that any output (such
          as converted files) will meet your specific requirements.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, ToolsHub and its operators shall not be liable
          for any indirect, incidental, special, consequential, or punitive damages, or any loss
          of data, profits, or revenue, arising out of or related to your use of (or inability
          to use) the Service. Your sole remedy for dissatisfaction with the Service is to stop
          using it.
        </p>

        <h2>9. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless ToolsHub, its operators, and affiliates from
          any claims, damages, losses, liabilities, and expenses (including reasonable legal
          fees) arising out of your use of the Service, your violation of these Terms, or your
          violation of any rights of another party.
        </p>

        <h2>10. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to the Service at any time,
          without notice, for conduct that we believe violates these Terms or is otherwise
          harmful to the Service, other users, or third parties.
        </p>

        <h2>11. Changes to these Terms</h2>
        <p>
          We may update these Terms from time to time. When we do, we will revise the "Last
          updated" date at the top of this page. Your continued use of the Service after any
          changes constitutes your acceptance of the updated Terms. We encourage you to review
          this page periodically.
        </p>

        <h2>12. Governing law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws of your local
          jurisdiction, without regard to its conflict of law provisions. Any disputes arising
          out of or related to these Terms or the Service shall be resolved in the competent
          courts of that jurisdiction.
        </p>

        <h2>13. Contact us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:{" "}
          <a href="mailto:tehzeeb.x51214@gmail.com">tehzeeb.x51214@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
