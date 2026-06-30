"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Check,
  ChevronRight,
  Crown,
  Gem,
  Lock,
  Mic,
  Settings,
  Star,
  Trophy,
  User,
} from "lucide-react";
import { useSectionReveal } from "@/components/hooks/useSectionReveal";
import { useLandingI18n } from "@/components/landing/i18n";

const menuIcons = [
  { icon: BookOpen, active: true },
  { icon: Mic },
  { icon: Star },
  { icon: Trophy },
  { icon: User },
  { icon: Settings },
];

export default function MiniLessonSection() {
  const ref = useSectionReveal();

  return (
    <section ref={ref} id="lessons" className="section-animate bg-[#fbfaff] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[210px_1fr_330px]">
          <SidebarMockup />
          <LessonsPanel />
          <StatsPanel />
        </div>
      </div>
    </section>
  );
}

function SidebarMockup() {
  const { t } = useLandingI18n();
  const copy = t.miniLesson;

  return (
    <aside className="rounded-[22px] bg-[#27235d] p-5 text-white shadow-[0_24px_60px_rgba(39,35,93,0.23)]">
      <div className="flex items-center gap-2">
        <span className="relative grid h-10 w-10 place-items-center rounded-[14px] bg-[linear-gradient(135deg,#5b48e8,#29b8c8)] text-white shadow-[0_8px_24px_rgba(91,72,232,0.22)]">
          <BookOpen className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-accent" />
        </span>
        <span className="text-sm font-black">FluentFlow</span>
      </div>

      <nav className="mt-8 grid gap-2">
        {menuIcons.map((item, index) => {
          const Icon = item.icon;
          const label = copy.menu[index];

          return (
            <button
              key={label}
              className={`flex h-11 items-center gap-3 rounded-lg px-3 text-left text-xs font-black transition-colors ${
                item.active ? "bg-primary text-white" : "text-white/82 hover:bg-white/10"
              }`}
              type="button"
            >
              <span className="grid h-7 w-7 place-items-center rounded-md bg-white text-[#27235d]">
                <Icon className="h-4 w-4" />
              </span>
              {label}
            </button>
          );
        })}
      </nav>

      <div className="mt-10 rounded-xl bg-primary p-4">
        <div className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-[#ffd36a]" />
          <p className="text-xs font-black">{copy.premiumTitle}</p>
        </div>
        <p className="mt-2 text-[11px] font-bold leading-5 text-white/76">
          {copy.premiumDescription}
        </p>
        <button className="mt-4 flex h-9 w-full items-center justify-between rounded-lg bg-white/14 px-3 text-[11px] font-black text-white">
          $9.99
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}

function LessonsPanel() {
  const { t } = useLandingI18n();
  const copy = t.miniLesson;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-foreground">{copy.heading}</h2>
        <Link href="#courses" className="text-xs font-black text-primary">
          {copy.viewAll}
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-[#f2f0ff] shadow-[0_14px_36px_rgba(45,35,103,0.07)]">
        <div className="grid min-h-[236px] gap-4 p-6 sm:grid-cols-[1fr_245px]">
          <div>
            <div className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-[#ffdce8] text-accent">
              <Star className="h-5 w-5 fill-current" />
            </div>
            <p className="text-sm font-black text-foreground">{copy.unit}</p>
            <h3 className="mt-1 text-xl font-black text-foreground">{copy.activeLesson}</h3>
            <p className="mt-4 max-w-sm text-sm font-medium leading-6 text-muted">
              {copy.activeDescription}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <span className="text-xs font-black text-foreground">{copy.activeProgress}</span>
              <div className="h-2 w-36 overflow-hidden rounded-full bg-white">
                <div className="h-full w-3/4 rounded-full bg-primary" />
              </div>
            </div>
            <button className="mt-5 rounded-lg bg-primary px-8 py-3 text-xs font-black text-white shadow-[0_12px_26px_rgba(91,72,232,0.23)]">
              {copy.continue}
            </button>
          </div>
          <TutorIllustration />
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {copy.lessons.map((lesson) => (
          <div
            key={lesson.title}
            className="flex items-center gap-4 rounded-lg border border-border bg-white px-5 py-4 shadow-[0_8px_20px_rgba(45,35,103,0.04)]"
          >
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                lesson.state === "done"
                  ? "bg-green-50 text-success"
                  : lesson.state === "locked"
                    ? "bg-slate-100 text-slate-500"
                    : "bg-sky-50 text-sky-500"
              }`}
            >
              {lesson.state === "done" ? (
                <Check className="h-5 w-5" />
              ) : lesson.state === "locked" ? (
                <Lock className="h-4 w-4" />
              ) : (
                <BookOpen className="h-4 w-4" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-black text-foreground">{lesson.unit}</p>
              <p className="mt-1 truncate text-xs font-bold text-muted">{lesson.title}</p>
            </div>
            <span
              className={`w-12 text-right text-xs font-black ${
                lesson.state === "done" ? "text-success" : "text-muted"
              }`}
            >
              {lesson.progress}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsPanel() {
  const { t } = useLandingI18n();
  const copy = t.miniLesson;

  return (
    <aside className="grid content-start gap-4">
      <div className="rounded-lg border border-border bg-white p-5 shadow-[0_12px_30px_rgba(45,35,103,0.05)]">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-xl bg-[#fff2dc] text-amber-500">
            <Gem className="h-7 w-7" />
          </span>
          <div>
            <h3 className="text-sm font-black text-foreground">{copy.unlockTitle}</h3>
            <p className="mt-1 text-xs font-medium leading-5 text-muted">
              {copy.unlockDescription}
            </p>
          </div>
        </div>
        <button className="mt-5 h-10 w-full rounded-lg bg-[linear-gradient(90deg,#5b48e8,#ff6b70)] text-xs font-black text-white">
          {copy.upgrade}
        </button>
      </div>

      <div className="rounded-lg border border-border bg-white p-5 shadow-[0_12px_30px_rgba(45,35,103,0.05)]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-foreground">{copy.dailyGoal}</h3>
          <button className="text-xs font-black text-muted">{copy.edit}</button>
        </div>
        <div className="mt-5 flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-[conic-gradient(#5b48e8_60%,#ece9f8_0)]">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-xs font-black text-primary">
              60%
            </span>
          </div>
          <div>
            <p className="text-xl font-black text-foreground">{copy.goalProgress}</p>
            <p className="mt-1 text-xs font-bold text-muted">{copy.keepItUp}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-white p-5 shadow-[0_12px_30px_rgba(45,35,103,0.05)]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-black text-foreground">{copy.leaderboard}</h3>
          <p className="text-xs font-bold text-muted">{copy.thisWeek}</p>
        </div>
        {[
          ["Emma", "2100 XP"],
          ["You", "1840 XP"],
          ["Liam", "1520 XP"],
        ].map(([name, xp], index) => (
          <div
            key={name}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
              name === "You" ? "bg-[#f2f0ff]" : ""
            }`}
          >
            <span className="w-4 text-xs font-black text-muted">{index + 1}</span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ffe4d8] text-xs font-black text-foreground">
              {name.charAt(0)}
            </span>
            <span className="flex-1 text-xs font-black text-foreground">{name}</span>
            <span className="text-xs font-bold text-muted">{xp}</span>
          </div>
        ))}
        <Link href="/signup" className="mt-3 block text-center text-xs font-black text-primary">
          {copy.fullLeaderboard}
        </Link>
      </div>
    </aside>
  );
}

function TutorIllustration() {
  const { t } = useLandingI18n();
  const copy = t.miniLesson;

  return (
    <div className="relative hidden min-h-[188px] overflow-hidden rounded-lg sm:block">
      <Image
        src="/landing/fluentflow-tutor-cafe.png"
        alt="Friendly English tutor holding coffee"
        fill
        sizes="(max-width: 1024px) 48vw, 360px"
        quality={100}
        unoptimized
        className="object-cover object-[64%_48%]"
      />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-[linear-gradient(90deg,rgba(242,240,255,0.3),rgba(242,240,255,0))]" />
      <div className="absolute left-3 top-[4.25rem] rounded-xl bg-white px-4 py-3 text-center text-xs font-black text-foreground shadow-[0_10px_24px_rgba(45,35,103,0.12)]">
        {copy.tutorBubble[0]}
        <br />
        {copy.tutorBubble[1]}
      </div>
    </div>
  );
}
