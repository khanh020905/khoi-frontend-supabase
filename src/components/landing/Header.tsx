"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Globe2, Menu, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLandingI18n } from "@/components/landing/i18n";

export default function Header() {
  const { locale, toggleLocale, t } = useLandingI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string; name?: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const displayName = user?.name || user?.email || "";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-200 ${
        scrolled
          ? "border-border bg-white/94 py-3 shadow-[0_12px_40px_rgba(35,25,95,0.08)] backdrop-blur-xl"
          : "border-transparent bg-white/78 py-4 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label={t.header.homeLabel}>
          <span className="relative grid h-10 w-10 place-items-center rounded-[14px] bg-[linear-gradient(135deg,#5b48e8,#29b8c8)] text-white shadow-[0_8px_24px_rgba(91,72,232,0.22)]">
            <BookOpen className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-accent" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-foreground">
            FluentFlow
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {t.header.nav.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-bold text-[#292549] transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleLocale}
            className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-bold text-[#292549] transition-colors hover:bg-surface-secondary"
            aria-label={`${t.header.languageLabel}: ${locale.toUpperCase()}`}
          >
            <Globe2 className="h-4 w-4" />
            {locale.toUpperCase()}
          </button>

          {user ? (
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(91,72,232,0.26)] transition-colors hover:bg-primary-dark"
            >
              <span className="grid h-6 w-6 place-items-center rounded-md bg-white/18 text-xs">
                {initial}
              </span>
              {t.header.dashboard}
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex h-11 items-center rounded-lg border border-border bg-white px-5 text-sm font-bold text-[#292549] shadow-[0_8px_22px_rgba(38,30,90,0.05)] transition-colors hover:bg-surface-secondary"
              >
                {t.header.login}
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-11 items-center rounded-lg bg-primary px-6 text-sm font-bold text-white shadow-[0_10px_24px_rgba(91,72,232,0.28)] transition-colors hover:bg-primary-dark"
              >
                {t.header.signup}
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-white text-foreground md:hidden"
          aria-label={t.header.toggleMenu}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute inset-x-0 top-full border-b border-border bg-white shadow-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {t.header.nav.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-bold text-foreground hover:bg-surface-secondary"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 grid gap-3 border-t border-border pt-4">
              <button
                type="button"
                onClick={toggleLocale}
                className="flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 py-3 text-sm font-bold text-foreground"
                aria-label={`${t.header.languageLabel}: ${locale.toUpperCase()}`}
              >
                <Globe2 className="h-4 w-4" />
                {locale.toUpperCase()}
              </button>
              {user ? (
                <Link
                  href="/dashboard"
                  className="rounded-lg bg-primary px-4 py-3 text-center text-sm font-bold text-white"
                >
                  {t.header.dashboard}
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-lg border border-border bg-white px-4 py-3 text-center text-sm font-bold text-foreground"
                  >
                    {t.header.login}
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-lg bg-primary px-4 py-3 text-center text-sm font-bold text-white"
                  >
                    {t.header.signup}
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
