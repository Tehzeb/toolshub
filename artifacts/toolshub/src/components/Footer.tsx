import { Link } from "wouter";
import { Logo } from "./Logo";
import { TOOLS } from "@/lib/tools";
import { FaXTwitter, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { AdSlot } from "./AdSlot";

export function Footer() {
  return (
    <footer className="border-t mt-24 bg-card/30">
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <AdSlot className="mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="text-sm text-muted-foreground mt-4 max-w-xs">
              The everyday utility hub. Free tools to make your work easier — fast, private, and
              built for the modern web.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaXTwitter className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/Tehzeb"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaGithub className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/tehzeeb.tech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-tehzeeb-ul-hassan/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Tools</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {TOOLS.slice(0, 5).map((t) => (
                <li key={t.slug}>
                  <Link href={`/tool/${t.slug}`} className="hover:text-foreground">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><a href="#" className="hover:text-foreground">Blog</a></li>
              <li><a href="#" className="hover:text-foreground">Pro plan</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground">Privacy</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-foreground">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ToolsHub. All rights reserved.</p>
          <p>Made with care, no signup required.</p>
        </div>
      </div>
    </footer>
  );
}
