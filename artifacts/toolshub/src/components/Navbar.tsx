import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Sun, Moon, Menu, X, Wrench } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/hooks/use-theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TOOLS } from "@/lib/tools";

export function Navbar() {
  const [, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { theme, toggleTheme } = useTheme();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?q=${encodeURIComponent(search.trim())}`);
    } else {
      navigate("/");
    }
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" data-testid="nav-tools">
                  <Wrench className="h-4 w-4 mr-1.5" /> Tools
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {TOOLS.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <DropdownMenuItem key={tool.slug} asChild>
                      <Link href={`/tool/${tool.slug}`} className="cursor-pointer">
                        <Icon className="h-4 w-4 mr-2" /> {tool.name}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/about">
              <Button variant="ghost" size="sm" data-testid="nav-about">About</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="sm" data-testid="nav-contact">Contact</Button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <form onSubmit={onSearch} className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search tools…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-56 h-9"
              data-testid="input-search"
            />
          </form>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            data-testid="button-theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-3 max-w-7xl">
            <form onSubmit={onSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tools…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </form>
            <div className="grid grid-cols-2 gap-2">
              {TOOLS.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.slug}
                    href={`/tool/${tool.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover-elevate border"
                  >
                    <Icon className="h-4 w-4" /> {tool.name}
                  </Link>
                );
              })}
            </div>
            <div className="flex gap-2 pt-2 border-t">
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center py-2 rounded-md hover-elevate border text-sm"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center py-2 rounded-md hover-elevate border text-sm"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
