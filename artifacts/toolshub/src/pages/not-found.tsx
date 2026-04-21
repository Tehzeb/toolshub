import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">404</p>
        <h1 className="text-4xl md:text-5xl font-bold mt-3">Page not found</h1>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button className="mt-6" data-testid="button-go-home">Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
