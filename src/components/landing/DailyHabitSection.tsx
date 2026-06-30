"use client";

import Link from "next/link";
import { Flame, BookOpen, Target, TrendingUp, ArrowRight } from "lucide-react";
import { useSectionReveal } from "@/components/hooks/useSectionReveal";

export default function DailyHabitSection() {
  const ref = useSectionReveal();
  const stats = [
    {
      icon: Flame,
      value: "7-day streak",
      subtext: "Keep it going!",
      color: "text-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-100"
    },
    {
      icon: BookOpen,
      value: "120 words",
      subtext: "Mastered",
      color: "text-primary",
      bg: "bg-blue-50",
      border: "border-blue-100"
    },
    {
      icon: Target,
      value: "85% accuracy",
      subtext: "Great job!",
      color: "text-success",
      bg: "bg-green-50",
      border: "border-green-100"
    },
    {
      icon: TrendingUp,
      value: "Level A2 → B1",
      subtext: "Almost there",
      color: "text-purple-500",
      bg: "bg-purple-50",
      border: "border-purple-100"
    },
  ];

  return (
    <section ref={ref} className="section-animate py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left text */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Build a habit you can be proud of.
            </h2>
            <p className="text-lg text-muted mb-8 leading-relaxed">
              Language learning isn&apos;t about studying for hours on the weekend. It&apos;s about showing up every day. Track your consistency, celebrate small wins, and watch your skills compound over time.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors"
            >
              Start your first streak
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right — Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className={`rounded-2xl p-6 border ${stat.border} ${stat.bg} flex flex-col items-center sm:items-start text-center sm:text-left hover:-translate-y-1 transition-transform`}
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-lg font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-sm text-muted">{stat.subtext}</p>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}
