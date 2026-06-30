import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-secondary/30 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <Link href="/" className="flex items-center gap-2 justify-center md:justify-start text-primary">
              <BookOpen className="w-6 h-6" />
              <span className="text-lg font-bold tracking-tight text-foreground">
                FluentFlow
              </span>
            </Link>
            <p className="text-sm text-muted mt-2 max-w-xs">
              Build your English habit in 10 minutes a day with daily lessons designed to make you fluent.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-muted hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-sm font-medium text-muted hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-sm font-medium text-muted hover:text-primary transition-colors">Contact</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center md:text-left">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} FluentFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
