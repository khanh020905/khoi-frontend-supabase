"use client";

import Link from "next/link";
import { ArrowRight, Volume2, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Text */}
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
              Build your English habit in{" "}
              <span className="text-primary">10 minutes a day.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed">
              Practice vocabulary, grammar, listening, and speaking with simple daily lessons designed to make you fluent.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors"
              >
                Start learning
              </Link>
              <Link
                href="#lessons"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-foreground bg-surface border border-border rounded-xl hover:bg-surface-secondary transition-colors"
              >
                View lessons
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-muted">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>For all levels</span>
              </div>
            </div>
          </div>

          {/* Right — Realistic Lesson Mockup */}
          <div className="relative animate-fade-in-up delay-200 flex justify-center lg:justify-end">
            <LessonMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function LessonMockup() {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-border p-6 relative overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold text-muted uppercase tracking-wider">
            Today&apos;s Lesson
          </p>
          <p className="text-sm font-medium text-primary mt-1">
            Everyday Conversations
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 rounded-full">
          <span className="text-sm font-bold">🔥 12</span>
        </div>
      </div>

      {/* Vocabulary Card */}
      <div className="bg-surface-secondary rounded-xl p-5 mb-6 text-center">
        <button className="mx-auto w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm hover:scale-105 transition-transform mb-3">
          <Volume2 className="w-5 h-5" />
        </button>
        <h3 className="text-2xl font-bold text-foreground mb-1">fluent</h3>
        <p className="text-sm text-muted mb-4">/ˈfluː.ənt/</p>
        <p className="text-sm text-foreground">
          Able to speak a language easily and very well.
        </p>
      </div>

      {/* Example */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
          Example
        </p>
        <p className="text-sm text-foreground italic border-l-2 border-primary pl-3">
          &quot;She is <span className="font-semibold text-primary">fluent</span> in French and English.&quot;
        </p>
      </div>

      {/* Mini Quiz */}
      <div>
        <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
          Quick Check
        </p>
        <div className="space-y-2">
          <button className="w-full text-left px-4 py-3 text-sm border border-border rounded-xl hover:border-primary hover:bg-blue-50 transition-colors">
            Struggling to speak
          </button>
          <button className="w-full text-left px-4 py-3 text-sm border-2 border-success bg-green-50 text-green-800 rounded-xl flex items-center justify-between transition-colors">
            <span>Speaking naturally</span>
            <CheckCircle2 className="w-4 h-4 text-success" />
          </button>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-6 pt-4 border-t border-border flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-surface-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full w-[40%]" />
        </div>
        <span className="text-xs text-muted font-medium">4/10</span>
      </div>
    </div>
  );
}
