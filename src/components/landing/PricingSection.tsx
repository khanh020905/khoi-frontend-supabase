"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useSectionReveal } from "@/components/hooks/useSectionReveal";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Start learning with essential features",
    features: [
      "5 vocabulary words per day",
      "Basic grammar lessons",
      "Standard listening exercises",
      "Progress dashboard",
    ],
    cta: "Get started free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "Unlock the full learning experience",
    features: [
      "Unlimited daily vocabulary",
      "AI speaking practice & feedback",
      "Advanced grammar lessons",
      "Smart review system",
      "Detailed analytics",
    ],
    cta: "Start Pro trial",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "$19",
    period: "per month",
    description: "For serious learners and professionals",
    features: [
      "Everything in Pro",
      "1-on-1 AI tutor sessions",
      "Business English module",
      "IELTS/TOEFL preparation",
      "Priority email support",
    ],
    cta: "Go Premium",
    highlighted: false,
  },
];

export default function PricingSection() {
  const ref = useSectionReveal();
  
  return (
    <section ref={ref} id="pricing" className="section-animate py-24 bg-surface-secondary/50 border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted">
            Start free, upgrade when you&apos;re ready. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 flex flex-col bg-white transition-all ${
                plan.highlighted
                  ? "border-2 border-primary shadow-sm relative"
                  : "border border-border"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted mt-2 min-h-[40px]">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted ml-1">/{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.highlighted ? "text-primary" : "text-success"}`} />
                    <span className="text-sm text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className={`block w-full text-center py-3 rounded-xl text-sm font-medium transition-colors ${
                  plan.highlighted
                    ? "text-white bg-primary hover:bg-primary-dark"
                    : "text-foreground bg-surface-secondary hover:bg-border"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
