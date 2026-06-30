"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSectionReveal } from "@/components/hooks/useSectionReveal";

const faqItems = [
  {
    question: "Is this app good for beginners?",
    answer: "Absolutely! FluentFlow is designed for all levels, from complete beginners to advanced learners. We assess your level and create a path just for you.",
  },
  {
    question: "Can I practice speaking?",
    answer: "Yes! Our AI-powered speaking practice lets you have real conversations and provides instant feedback on your pronunciation.",
  },
  {
    question: "Does it track my progress?",
    answer: "Yes. FluentFlow tracks your daily streaks, vocabulary size, grammar accuracy, and overall fluency level so you can always see your improvement.",
  },
  {
    question: "Can I use it for free?",
    answer: "Yes! The Free plan gives you access to 5 vocabulary words per day and basic grammar lessons. You can upgrade to Pro anytime for unlimited practice.",
  },
];

function FAQItem({ item, isOpen, toggle }: { item: (typeof faqItems)[0]; isOpen: boolean; toggle: () => void; }) {
  return (
    <div className={`border-b border-border transition-colors ${isOpen ? "bg-surface-secondary/50" : "bg-white"}`}>
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-5 px-4 sm:px-6 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-foreground">{item.question}</span>
        <div className="flex-shrink-0 ml-4">
          {isOpen ? <ChevronUp className="w-5 h-5 text-muted" /> : <ChevronDown className="w-5 h-5 text-muted" />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
        <p className="px-4 sm:px-6 pb-5 text-sm text-muted leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const ref = useSectionReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} id="faq" className="section-animate py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-muted">
            Have a different question? Reach out to our support team.
          </p>
        </div>

        <div className="border-t border-border">
          {faqItems.map((item, i) => (
            <FAQItem
              key={item.question}
              item={item}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
