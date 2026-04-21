import { Link } from "wouter";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group" data-testid="link-logo">
      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center shadow-md group-hover:scale-105 transition-transform">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-primary-foreground"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      </div>
      <span className="font-bold text-lg tracking-tight">
        Tools<span className="gradient-text">Hub</span>
      </span>
    </Link>
  );
}
