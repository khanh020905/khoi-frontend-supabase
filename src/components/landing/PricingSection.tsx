"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useSectionReveal } from "@/components/hooks/useSectionReveal";
import { useLandingI18n } from "@/components/landing/i18n";

const highlightedPlanIndex = 1;

export default function PricingSection() {
  const ref = useSectionReveal();
  const { t } = useLandingI18n();
  const copy = t.pricing;

  return (
    <section ref={ref} id="pricing" className="section-animate bg-[#fbfaff] py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-black text-foreground sm:text-3xl">
            {copy.heading}
          </h2>
          <p className="mt-2 text-sm font-bold text-muted">{copy.subheading}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {copy.plans.map((plan, index) => {
            const highlighted = index === highlightedPlanIndex;

            return (
              <article
                key={plan.name}
                className={`relative flex min-h-[316px] flex-col rounded-lg bg-white p-7 shadow-[0_12px_34px_rgba(45,35,103,0.05)] ${
                  highlighted
                    ? "border-2 border-primary pt-10"
                    : "border border-border"
                }`}
              >
                {highlighted && (
                  <div className="absolute inset-x-0 top-0 rounded-t-md bg-primary py-2 text-center text-xs font-black text-white">
                    {copy.popular}
                  </div>
                )}

                <h3 className="text-lg font-black text-foreground">{plan.name}</h3>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-3xl font-black text-foreground">{plan.price}</span>
                  <span className="pb-1 text-xs font-bold text-muted">
                    {copy.periodPrefix} {plan.period}
                  </span>
                </div>

                <ul className="mt-7 grid flex-1 gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm font-semibold text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/signup"
                  className={`mt-8 flex h-11 items-center justify-center rounded-lg border text-sm font-black transition-colors ${
                    highlighted
                      ? "border-primary bg-primary text-white hover:bg-primary-dark"
                      : "border-primary text-primary hover:bg-surface-secondary"
                  }`}
                >
                  {plan.cta}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
