import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import MiniLessonSection from "@/components/landing/MiniLessonSection";
import DailyHabitSection from "@/components/landing/DailyHabitSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <MiniLessonSection />
        <DailyHabitSection />
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
