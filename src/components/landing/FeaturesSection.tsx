"use client";

import Image from "next/image";
import { Brain, Flame, Headphones, MessageCircle, NotebookTabs } from "lucide-react";
import { useSectionReveal } from "@/components/hooks/useSectionReveal";

const features = [
  {
    icon: MessageCircle,
    title: "Speaking Practice",
    description: "Real conversations with AI and native-style prompts.",
    bg: "bg-[#f0ebff]",
    color: "text-primary",
    image: "/feature section/ChatGPT Image Jun 30, 2026, 04_10_53 PM (1).png",
    imageAlt: "Speak with confidence pronunciation practice feature card",
  },
  {
    icon: Headphones,
    title: "Listening Drills",
    description: "Sharpen your ear with realistic audio exercises.",
    bg: "bg-[#eef8ff]",
    color: "text-sky-500",
    image: "/feature section/ChatGPT Image Jun 30, 2026, 04_10_53 PM (2).png",
    imageAlt: "Listen actively audio lessons feature card",
  },
  {
    icon: Brain,
    title: "AI Feedback",
    description: "Get instant corrections and personalized tips.",
    bg: "bg-[#eefbf5]",
    color: "text-success",
    image: "/feature section/ChatGPT Image Jun 30, 2026, 04_10_53 PM (3).png",
    imageAlt: "AI-powered feedback corrections feature card",
  },
  {
    icon: NotebookTabs,
    title: "Vocabulary Review",
    description: "Smart review keeps new phrases fresh.",
    bg: "bg-[#fff4e7]",
    color: "text-amber-500",
    image: "/feature section/ChatGPT Image Jun 30, 2026, 04_10_54 PM (4).png",
    imageAlt: "Expand vocabulary spaced repetition feature card",
  },
  {
    icon: Flame,
    title: "Study Streaks",
    description: "Build habits, earn badges, and stay motivated.",
    bg: "bg-[#fff0f1]",
    color: "text-accent",
    image: "/feature section/ChatGPT Image Jun 30, 2026, 04_10_54 PM (5).png",
    imageAlt: "Stay motivated streaks and learning goals feature card",
  },
];

export default function FeaturesSection() {
  const ref = useSectionReveal();

  return (
    <section ref={ref} id="features" className="section-animate bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Everything you need to grow your English
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="relative aspect-square overflow-hidden rounded-lg border border-border bg-white shadow-[0_12px_30px_rgba(45,35,103,0.08)] transition-transform hover:-translate-y-1"
              >
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc((100vw - 56px) / 2), 240px"
                  quality={100}
                  unoptimized
                  className="object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/70" />
                <div
                  className={`absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-lg border border-white/70 bg-white/82 shadow-[0_10px_22px_rgba(45,35,103,0.12)] backdrop-blur ${feature.bg}`}
                  aria-hidden="true"
                >
                  <Icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <div className="sr-only">
                  <h3>{feature.title}</h3>
                  <p>
                    {feature.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
