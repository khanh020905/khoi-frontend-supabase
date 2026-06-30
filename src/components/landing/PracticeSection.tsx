"use client";
import { Target, BookOpen, PenTool, Brain, BarChart3 } from "lucide-react";
import { useSectionReveal } from "@/components/hooks/useSectionReveal";

const steps = [
  {
    step: "01",
    title: "Learn new words",
    description:
      "Discover 10 new vocabulary words each day, curated for your level with audio pronunciation and example sentences.",
    icon: BookOpen,
    color: "from-primary to-primary-light",
  },
  {
    step: "02",
    title: "Practice with real examples",
    description:
      "Use new vocabulary in context through fill-in-the-blank exercises, sentence building, and conversation simulations.",
    icon: PenTool,
    color: "from-violet-500 to-purple-500",
  },
  {
    step: "03",
    title: "Review with spaced repetition",
    description:
      "Our smart algorithm schedules reviews at the optimal time so you retain what you learn long-term.",
    icon: Brain,
    color: "from-amber-500 to-orange-500",
  },
  {
    step: "04",
    title: "Track your improvement",
    description:
      "Watch your vocabulary grow, fluency improve, and streak build with detailed progress analytics.",
    icon: BarChart3,
    color: "from-emerald-500 to-teal-500",
  },
];

export default function PracticeSection() {
  const ref = useSectionReveal();
  return (
    <section
      ref={ref}
      id="practice"
      className="section-animate py-20 md:py-28 bg-gradient-to-b from-surface-secondary/30 to-transparent relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-medium mb-4">
            <Target className="w-4 h-4" />
            <span>How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            A proven path to{" "}
            <span className="gradient-text">fluency</span>
          </h2>
          <p className="mt-4 text-lg text-muted">
            Four simple steps. Practice daily for just 15 minutes and see real
            results.
          </p>
        </div>

        {/* Steps timeline */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="relative group">
                {/* Connector line (hidden on last item and mobile) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+32px)] w-[calc(100%-32px)] h-[2px] bg-gradient-to-r from-border to-transparent" />
                )}
                <div className="bg-surface rounded-2xl border border-border/50 p-6 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
                    Step {s.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
