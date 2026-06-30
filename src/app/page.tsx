import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import MiniLessonSection from "@/components/landing/MiniLessonSection";
import DailyHabitSection from "@/components/landing/DailyHabitSection";
import PricingSection from "@/components/landing/PricingSection";
import Footer from "@/components/landing/Footer";
import { LandingI18nProvider } from "@/components/landing/i18n";

export default function LandingPage() {
  return (
    <LandingI18nProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <MiniLessonSection />
          <DailyHabitSection />
          <PricingSection />
        </main>
        <Footer />
      </div>
    </LandingI18nProvider>
  );
}
