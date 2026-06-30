"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Flame,
  Gem,
  Mic,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fbfaff_0%,#ffffff_58%,#fbfaff_100%)] pt-28 pb-12 sm:pt-32 lg:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e9e2ff] bg-white px-3.5 py-2 text-xs font-extrabold text-primary shadow-[0_10px_30px_rgba(91,72,232,0.08)]">
            <Sparkles className="h-4 w-4" />
            Personalized English lessons
          </div>

          <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[3.8rem] xl:text-[4.15rem]">
            <span className="block">Speak English</span>
            <span className="block text-primary">with confidence.</span>
            <span className="block text-primary">Bloom every day.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base font-medium leading-8 text-muted sm:text-lg">
            Personalized lessons, real conversations, and instant feedback in
            one calm learning dashboard.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-2 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(91,72,232,0.28)] transition-colors hover:bg-primary-dark"
            >
              Start learning free
            </Link>
            <Link
              href="#courses"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-white px-2 text-sm font-extrabold text-foreground shadow-[0_12px_26px_rgba(38,30,90,0.06)] transition-colors hover:bg-surface-secondary"
            >
              Explore courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 text-left">
            {[
              { icon: Trophy, value: "2.4M+", label: "Happy Learners", tone: "text-amber-500 bg-amber-50" },
              { icon: Gem, value: "150+", label: "Countries", tone: "text-primary bg-[#eeeaff]" },
              { icon: Star, value: "4.8/5", label: "App Rating", tone: "text-[#ffb23f] bg-[#fff4dd]" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="min-w-0">
                  <div className="flex items-center justify-center gap-2 lg:justify-start">
                    <span className={`grid h-8 w-8 place-items-center rounded-lg ${item.tone}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="text-base font-black text-foreground sm:text-lg">
                      {item.value}
                    </p>
                  </div>
                  <p className="mt-1 text-center text-[11px] font-bold text-muted lg:text-left">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto w-full max-w-3xl lg:mx-0">
          <LearningDashboard />
        </div>
      </div>
    </section>
  );
}

function LearningDashboard() {
  return (
    <div className="relative rounded-[28px] border border-[#ece7ff] bg-white/82 p-2 shadow-[0_24px_70px_rgba(50,39,117,0.13)]">
      <div className="rounded-[22px] border border-[#eeeaff] bg-[#fbfaff] p-5 sm:p-7">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-foreground sm:text-xl">
                Good morning, Alex!
              </h2>
              <Sparkles className="h-4 w-4 text-accent" />
            </div>
            <p className="mt-1 text-xs font-bold text-muted">Let&apos;s make today count.</p>
          </div>

          <div className="flex items-center gap-3">
            <MetricPill icon={Flame} label="Day streak" value="7" tone="text-orange-500 bg-orange-50" />
            <MetricPill icon={Gem} label="XP today" value="1250" tone="text-sky-500 bg-sky-50" />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-xl border border-border bg-white p-5 shadow-[0_12px_28px_rgba(45,35,103,0.06)]">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black text-foreground">Today&apos;s Plan</p>
                <p className="mt-2 text-[11px] font-bold text-muted">Level 3 - Intermediate</p>
              </div>
              <span className="text-lg font-black text-[#d8d2ef]">&rsaquo;</span>
            </div>
            <div className="mb-5 h-2 overflow-hidden rounded-full bg-[#ece9f8]">
              <div className="h-full w-[62%] rounded-full bg-primary" />
            </div>

            <div className="grid min-h-[156px] overflow-hidden rounded-xl bg-[#f1efff] sm:grid-cols-[1fr_150px]">
              <div className="p-5">
                <p className="text-xs font-black text-foreground">Unit 4: Everyday Life</p>
                <p className="mt-3 text-xs font-extrabold text-muted">Lesson 2</p>
                <h3 className="mt-1 text-xl font-black text-foreground">At the Cafe</h3>
                <button className="mt-6 rounded-lg bg-primary px-8 py-3 text-xs font-black text-white shadow-[0_10px_24px_rgba(91,72,232,0.24)]">
                  Continue
                </button>
              </div>
              <HeroLessonImage />
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-xl border border-border bg-white p-5 shadow-[0_12px_28px_rgba(45,35,103,0.06)]">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-xs font-black text-foreground">Speaking Practice</p>
                  <p className="mt-2 text-[11px] font-bold text-muted">Talk about your weekend</p>
                </div>
                <span className="text-lg font-black text-[#d8d2ef]">&rsaquo;</span>
              </div>
              <Waveform />
              <button className="mx-auto mt-5 flex h-10 items-center gap-2 rounded-lg bg-accent px-6 text-xs font-black text-white shadow-[0_10px_22px_rgba(255,107,112,0.24)]">
                <Mic className="h-4 w-4" />
                Start speaking
              </button>
            </div>

            <div className="rounded-xl border border-border bg-white p-5 shadow-[0_12px_28px_rgba(45,35,103,0.06)]">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-xs font-black text-foreground">Weekly Progress</p>
                  <p className="mt-2 text-[11px] font-bold text-muted">You&apos;re doing great!</p>
                </div>
                <span className="text-lg font-black text-[#d8d2ef]">&rsaquo;</span>
              </div>
              <p className="mb-3 text-[11px] font-extrabold text-muted">4 / 7 lessons completed</p>
              <div className="h-2 overflow-hidden rounded-full bg-[#ece9f8]">
                <div className="h-full w-[58%] rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricPill({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="flex h-12 items-center gap-2 rounded-xl bg-white px-3 shadow-sm">
      <span className={`grid h-8 w-8 place-items-center rounded-lg ${tone}`}>
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-sm font-black text-foreground">{value}</p>
        <p className="text-[9px] font-bold text-muted">{label}</p>
      </div>
    </div>
  );
}

function Waveform() {
  const bars = [22, 34, 18, 42, 54, 28, 48, 20, 36, 52, 26, 44, 18, 34, 56, 28, 40, 22, 50, 30, 46, 18, 36, 54];

  return (
    <div className="flex h-14 items-center justify-center gap-1.5">
      {bars.map((height, index) => (
        <span
          key={`${height}-${index}`}
          className={index > 15 ? "w-1 rounded-full bg-accent/70" : "w-1 rounded-full bg-primary/70"}
          style={{ height }}
        />
      ))}
    </div>
  );
}

function HeroLessonImage() {
  return (
    <div className="relative hidden bg-[#e7e3ff] sm:block">
      <Image
        src="/landing/fluentflow-hero.png"
        alt="Learner practicing English with audio and chat tools"
        fill
        sizes="(max-width: 1024px) 45vw, 320px"
        quality={100}
        unoptimized
        className="object-cover object-[56%_54%]"
        priority
      />
    </div>
  );
}
