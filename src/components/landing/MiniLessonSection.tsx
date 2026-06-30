"use client";

import { CheckCircle2, Volume2, ArrowRight } from "lucide-react";
import { useSectionReveal } from "@/components/hooks/useSectionReveal";

export default function MiniLessonSection() {
  const ref = useSectionReveal();

  return (
    <section ref={ref} id="lessons" className="section-animate py-24 bg-surface-secondary/50 border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Interactive Lesson UI */}
          <div className="order-2 lg:order-1 bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-sm max-w-md mx-auto w-full">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
              <span className="text-sm font-semibold text-muted">Daily Lesson 4/5</span>
              <span className="text-sm font-bold text-primary">Vocabulary</span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-foreground mb-2">improve</h3>
              <p className="text-sm text-muted flex items-center justify-center gap-2">
                /ɪmˈpruːv/
                <button className="text-primary hover:bg-blue-50 p-1 rounded-full transition-colors">
                  <Volume2 className="w-4 h-4" />
                </button>
              </p>
            </div>

            <div className="bg-surface-secondary rounded-xl p-4 mb-6">
              <p className="text-sm font-semibold text-muted uppercase tracking-wider mb-2 text-center">Meaning</p>
              <p className="text-base text-foreground text-center">to become better, or to make something better</p>
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold text-muted uppercase tracking-wider mb-2 text-center">Example</p>
              <p className="text-base text-foreground text-center italic">
                &quot;I want to <span className="font-semibold text-primary">improve</span> my speaking skills.&quot;
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-sm font-bold text-foreground mb-4">Choose the correct sentence:</p>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 text-sm border-2 border-border rounded-xl hover:border-primary transition-colors flex items-center justify-between">
                  <span>She improves to learning English.</span>
                </button>
                <button className="w-full text-left px-4 py-3 text-sm border-2 border-success bg-green-50 text-green-800 rounded-xl flex items-center justify-between transition-colors ring-2 ring-success/20 ring-offset-1">
                  <span className="font-medium">He is trying to improve his English.</span>
                  <CheckCircle2 className="w-5 h-5 text-success" />
                </button>
              </div>
            </div>
            
            <button className="mt-8 w-full py-3.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Real lessons. Real progress.
            </h2>
            <p className="text-lg text-muted mb-8 leading-relaxed">
              Don&apos;t just memorize words. Learn how to use them in real-world contexts through interactive examples, pronunciation guides, and immediate practice.
            </p>
            
            <ul className="space-y-4 text-left inline-block lg:block">
              {[
                "Contextual vocabulary cards",
                "Native speaker audio",
                "Interactive mini-quizzes",
                "Immediate feedback"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
}
