"use client";

import Image from "next/image";
import { Briefcase, Coffee, GraduationCap, Plane, Sprout, Star } from "lucide-react";
import { useSectionReveal } from "@/components/hooks/useSectionReveal";
import { useLandingI18n } from "@/components/landing/i18n";

const paths = [
  {
    icon: Sprout,
    tone: "bg-[#e7f5da] text-[#1f8e62]",
    image: "/daily habit/9b6dca29-fc3e-49e4-8c7e-985035b0b0d2.png",
    imageAlt: "Beginner Essentials A1 learning path with 20 units",
  },
  {
    icon: Coffee,
    tone: "bg-[#fff0e8] text-[#dd5d2f]",
    image: "/daily habit/68f30c35-8a2a-4798-978c-3eb156e3d028.png",
    imageAlt: "Daily Conversation A2 learning path with 24 units",
    imageClassName: "scale-[0.92]",
  },
  {
    icon: Briefcase,
    tone: "bg-[#eaf3ff] text-[#2569d8]",
    image: "/daily habit/f69e677f-657b-4b59-ba6c-9ab8b7ca583c.png",
    imageAlt: "Business English B1 learning path with 28 units",
  },
  {
    icon: Plane,
    tone: "bg-[#f4e8ff] text-[#6d39c7]",
    image: "/daily habit/7b50040c-0a74-49b9-82af-5b76488e5729.png",
    imageAlt: "Travel Abroad A2 learning path with 18 units",
  },
];

export default function DailyHabitSection() {
  const ref = useSectionReveal();
  const { t } = useLandingI18n();
  const copy = t.courses;

  return (
    <section ref={ref} id="courses" className="section-animate bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xl font-black text-foreground">{copy.heading}</h2>
          <a href="#pricing" className="text-xs font-black text-primary">
            {copy.viewAll}
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {paths.map((path, index) => {
            const Icon = path.icon;
            const localizedPath = copy.paths[index];

            return (
              <article
                key={localizedPath.title}
                className="relative aspect-square overflow-hidden rounded-lg border border-white/70 bg-white shadow-[0_14px_34px_rgba(45,35,103,0.08)] transition-transform hover:-translate-y-1"
              >
                <Image
                  src={path.image}
                  alt={path.imageAlt}
                  fill
                  sizes="(max-width: 768px) calc(100vw - 32px), (max-width: 1280px) calc((100vw - 64px) / 2), 292px"
                  quality={100}
                  unoptimized
                  className={`object-cover object-center ${path.imageClassName ?? ""}`}
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/65" />
                <span
                  className={`absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-lg border border-white/70 shadow-[0_10px_22px_rgba(23,21,51,0.13)] backdrop-blur ${path.tone}`}
                  aria-hidden="true"
                >
                  <Icon className="h-6 w-6" />
                </span>
                <div className="sr-only">
                  <h3>{localizedPath.title}</h3>
                  <p>{localizedPath.description}</p>
                  <p>{localizedPath.lessons}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div id="stories" className="mt-16">
          <div className="text-center">
            <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-xl bg-[#eefbf5] text-success">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-black text-foreground sm:text-3xl">
              {copy.storiesHeading}
            </h2>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {copy.stories.map((story) => (
              <article
                key={story.name}
                className="rounded-lg border border-border bg-white p-7 shadow-[0_12px_32px_rgba(45,35,103,0.05)]"
              >
                <div className="mb-4 flex gap-1 text-[#ffbf45]" aria-label={copy.ratingLabel}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="min-h-[88px] text-sm font-medium leading-7 text-foreground/78">
                  &quot;{story.quote}&quot;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[#ffe1d6] text-sm font-black text-foreground">
                    {story.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-black text-foreground">{story.name}</p>
                    <p className="text-xs font-bold text-muted">{story.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
