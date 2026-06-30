"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, MessageCircle, Music2, Send } from "lucide-react";
import { useLandingI18n } from "@/components/landing/i18n";

export default function Footer() {
  const { t } = useLandingI18n();
  const copy = t.footer;

  return (
    <footer id="footer" className="bg-[#27235d] py-9 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-9 lg:grid-cols-[1.2fr_2fr_1.5fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="relative grid h-10 w-10 place-items-center rounded-[14px] bg-[linear-gradient(135deg,#5b48e8,#29b8c8)] text-white shadow-[0_8px_24px_rgba(91,72,232,0.22)]">
                <BookOpen className="h-5 w-5" />
                <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-accent" />
              </span>
              <span className="text-lg font-black">FluentFlow</span>
            </Link>
            <p className="mt-4 max-w-xs text-xs font-semibold leading-6 text-white/68">
              {copy.description}
            </p>
            <div className="mt-5 flex gap-2">
              {[MessageCircle, Music2, Send].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white/76 transition-colors hover:bg-white/18 hover:text-white"
                  aria-label={copy.socialLabel}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-7 sm:grid-cols-4">
            {copy.columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-black text-white">{column.title}</h3>
                <ul className="mt-3 grid gap-2.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-xs font-semibold text-white/66 hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xs font-black text-white">{copy.newsletterTitle}</h3>
            <p className="mt-3 text-xs font-semibold leading-6 text-white/68">
              {copy.newsletterDescription}
            </p>
            <form className="mt-5 flex rounded-lg bg-white p-1">
              <label className="sr-only" htmlFor="footer-email">
                {copy.emailLabel}
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder={copy.emailPlaceholder}
                className="min-w-0 flex-1 rounded-md px-3 text-xs font-bold text-foreground outline-none placeholder:text-muted"
              />
              <button
                type="submit"
                className="grid h-9 w-10 place-items-center rounded-md bg-primary text-white"
                aria-label={copy.subscribeLabel}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <p className="mt-8 border-t border-white/12 pt-6 text-center text-xs font-semibold text-white/58">
          © {new Date().getFullYear()} FluentFlow. {copy.copyright}
        </p>
      </div>
    </footer>
  );
}
