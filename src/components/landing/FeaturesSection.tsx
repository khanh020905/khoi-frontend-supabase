"use client";

import { BookOpen, Mic, Brain, BarChart3 } from "lucide-react";
import { useSectionReveal } from "@/components/hooks/useSectionReveal";

const features = [
  {
    icon: BookOpen,
    title: "Daily Vocabulary",
    description: "Learn essential words every day with context, audio, and spaced repetition.",
  },
  {
    icon: Mic,
    title: "Speaking Practice",
    description: "Build confidence with AI roleplay and instant pronunciation feedback.",
  },
  {
    icon: Brain,
    title: "Smart Review",
    description: "Never forget what you learn. Our algorithm schedules reviews at the perfect time.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Watch your vocabulary grow and your fluency score rise day by day.",
  },
];

export default function FeaturesSection() {
  const ref = useSectionReveal();
  
  return (
    <section ref={ref} id="features" className="section-animate py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Everything you need in one place
          </h2>
          <p className="mt-4 text-lg text-muted">
            Focus on the four core skills of language learning with a clear, daily path to fluency.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="bg-surface-secondary rounded-2xl p-6 border border-border hover:border-primary/20 hover:shadow-sm transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center mb-5 text-primary shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
