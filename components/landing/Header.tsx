"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";
import { supabase } from "@/src/lib/supabase";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string; name?: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check auth state
  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          email: session.user.email,
          name: session.user.user_metadata?.full_name,
        });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          email: session.user.email,
          name: session.user.user_metadata?.full_name,
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Lessons", href: "#lessons" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  const displayName = user?.name || user?.email || "";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-border shadow-sm py-3"
          : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-primary">
          <BookOpen className="w-7 h-7" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            FluentFlow
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
            >
              <span className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center text-xs font-bold">
                {initial}
              </span>
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
              >
                Start learning
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-muted hover:text-foreground transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-border absolute top-full left-0 right-0 shadow-lg animate-fade-in-up">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-muted hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-border flex flex-col gap-3">
              {user ? (
                <Link
                  href="/dashboard"
                  className="px-4 py-3 text-center text-sm font-medium text-white bg-primary rounded-lg"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-3 text-center text-sm font-medium text-muted bg-surface-secondary rounded-lg"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-3 text-center text-sm font-medium text-white bg-primary rounded-lg"
                  >
                    Start learning
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
