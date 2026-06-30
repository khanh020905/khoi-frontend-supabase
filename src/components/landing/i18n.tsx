"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type LandingLocale = "en" | "vi";

const dictionaries = {
  en: {
    header: {
      homeLabel: "FluentFlow home",
      nav: [
        { label: "Features", href: "#features" },
        { label: "Courses", href: "#courses" },
        { label: "Pricing", href: "#pricing" },
        { label: "Blog", href: "#stories" },
        { label: "About", href: "#footer" },
      ],
      languageLabel: "Change language",
      dashboard: "Dashboard",
      login: "Log in",
      signup: "Get started",
      toggleMenu: "Toggle menu",
    },
    hero: {
      eyebrow: "Personalized English lessons",
      titleLines: ["Speak English", "with confidence.", "Bloom every day."],
      description:
        "Personalized lessons, real conversations, and instant feedback in one calm learning dashboard.",
      primaryCta: "Start learning free",
      secondaryCta: "Explore courses",
      stats: ["Happy Learners", "Countries", "App Rating"],
      dashboard: {
        greeting: "Good morning, Alex!",
        subGreeting: "Let's make today count.",
        streak: "Day streak",
        xp: "XP today",
        planTitle: "Today's Plan",
        level: "Level 3 - Intermediate",
        unit: "Unit 4: Everyday Life",
        lesson: "Lesson 2",
        cafe: "At the Cafe",
        continue: "Continue",
        speakingTitle: "Speaking Practice",
        speakingPrompt: "Talk about your weekend",
        startSpeaking: "Start speaking",
        progressTitle: "Weekly Progress",
        progressNote: "You're doing great!",
        progressCount: "4 / 7 lessons completed",
      },
    },
    features: {
      heading: "Everything you need to grow your English",
      items: [
        {
          title: "Speaking Practice",
          description: "Real conversations with AI and native-style prompts.",
        },
        {
          title: "Listening Drills",
          description: "Sharpen your ear with realistic audio exercises.",
        },
        {
          title: "AI Feedback",
          description: "Get instant corrections and personalized tips.",
        },
        {
          title: "Vocabulary Review",
          description: "Smart review keeps new phrases fresh.",
        },
        {
          title: "Study Streaks",
          description: "Build habits, earn badges, and stay motivated.",
        },
      ],
    },
    miniLesson: {
      menu: ["Learn", "Practice", "Vocabulary", "Leaderboard", "Profile", "Settings"],
      premiumTitle: "Go Premium",
      premiumDescription: "Unlock all lessons and advanced feedback.",
      heading: "My Lessons",
      viewAll: "View all",
      unit: "Unit 4: Everyday Life",
      activeLesson: "Lesson 2 - At the Cafe",
      activeDescription:
        "Learn useful phrases to order food, ask questions, and keep the conversation going.",
      activeProgress: "75% complete",
      continue: "Continue",
      lessons: [
        {
          unit: "Unit 4: Everyday Life",
          title: "Lesson 1 - Meeting People",
          progress: "100%",
          state: "done",
        },
        {
          unit: "Unit 3: Work & Study",
          title: "Lesson 3 - Office Conversations",
          progress: "60%",
          state: "progress",
        },
        {
          unit: "Unit 3: Work & Study",
          title: "Lesson 2 - Email & Messages",
          progress: "0%",
          state: "locked",
        },
      ],
      unlockTitle: "Unlock Premium",
      unlockDescription: "Get unlimited feedback, advanced lessons, and more.",
      upgrade: "Upgrade now",
      dailyGoal: "Daily Goal",
      edit: "Edit",
      goalProgress: "18 / 30 min",
      keepItUp: "Keep it up!",
      leaderboard: "Leaderboard",
      thisWeek: "This week",
      fullLeaderboard: "View full leaderboard",
      tutorBubble: ["How was", "your day?"],
    },
    courses: {
      heading: "Explore learning paths",
      viewAll: "View all courses",
      paths: [
        {
          title: "Beginner Start Strong",
          description: "Build your foundation with essential words and phrases.",
          lessons: "24 lessons",
        },
        {
          title: "Everyday Conversations",
          description: "Speak naturally in daily situations.",
          lessons: "36 lessons",
        },
        {
          title: "Business English",
          description: "Communicate confidently at work.",
          lessons: "28 lessons",
        },
        {
          title: "Travel Essentials",
          description: "Speak with confidence wherever you go.",
          lessons: "20 lessons",
        },
      ],
      storiesHeading: "Loved by learners worldwide",
      ratingLabel: "Five star rating",
      stories: [
        {
          quote:
            "FluentFlow helped me speak English confidently at work. The lessons are practical and fun.",
          name: "Maria G.",
          role: "Marketing Manager, Spain",
        },
        {
          quote:
            "The speaking practice is amazing. I never thought learning online could be this effective.",
          name: "James T.",
          role: "Software Engineer, Canada",
        },
        {
          quote: "I love the daily goals and streaks. They keep me motivated every day.",
          name: "Priya S.",
          role: "Student, India",
        },
      ],
    },
    pricing: {
      heading: "Simple pricing for everyone",
      subheading: "Start free. Upgrade anytime.",
      popular: "Most popular",
      periodPrefix: "/",
      plans: [
        {
          name: "Free",
          price: "$0",
          period: "month",
          features: ["5 lessons per day", "Basic vocabulary review", "Standard exercises"],
          cta: "Get started",
        },
        {
          name: "Premium",
          price: "$9.99",
          period: "month",
          features: [
            "Unlimited lessons",
            "AI feedback & corrections",
            "Speaking with AI",
            "Progress insights",
          ],
          cta: "Start 7-day free trial",
        },
        {
          name: "Premium Plus",
          price: "$14.99",
          period: "month",
          features: [
            "Everything in Premium",
            "Priority feedback",
            "Live group sessions",
            "Certificate of completion",
          ],
          cta: "Start 7-day free trial",
        },
      ],
    },
    footer: {
      description:
        "Helping millions of learners around the world speak English with confidence.",
      socialLabel: "Social link",
      columns: [
        {
          title: "Product",
          links: ["Features", "Courses", "Pricing", "Mobile App"],
        },
        {
          title: "Learn",
          links: ["Blog", "Study Tips", "Help Center", "Community"],
        },
        {
          title: "Company",
          links: ["About Us", "Careers", "Press", "Contact"],
        },
        {
          title: "Legal",
          links: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
        },
      ],
      newsletterTitle: "Stay in the loop",
      newsletterDescription: "Get learning tips and updates delivered to your inbox.",
      emailLabel: "Email address",
      emailPlaceholder: "Enter your email",
      subscribeLabel: "Subscribe",
      copyright: "All rights reserved.",
    },
  },
  vi: {
    header: {
      homeLabel: "Trang chủ FluentFlow",
      nav: [
        { label: "Tính năng", href: "#features" },
        { label: "Khóa học", href: "#courses" },
        { label: "Bảng giá", href: "#pricing" },
        { label: "Câu chuyện", href: "#stories" },
        { label: "Giới thiệu", href: "#footer" },
      ],
      languageLabel: "Đổi ngôn ngữ",
      dashboard: "Bảng điều khiển",
      login: "Đăng nhập",
      signup: "Bắt đầu",
      toggleMenu: "Mở menu",
    },
    hero: {
      eyebrow: "Bài học tiếng Anh cá nhân hóa",
      titleLines: ["Nói tiếng Anh", "tự tin hơn.", "Tiến bộ mỗi ngày."],
      description:
        "Bài học cá nhân hóa, hội thoại thực tế và phản hồi tức thì trong một dashboard học tập dễ chịu.",
      primaryCta: "Học miễn phí",
      secondaryCta: "Xem khóa học",
      stats: ["Người học vui vẻ", "Quốc gia", "Đánh giá app"],
      dashboard: {
        greeting: "Chào buổi sáng, Alex!",
        subGreeting: "Hôm nay mình học thật tốt nhé.",
        streak: "Chuỗi ngày",
        xp: "XP hôm nay",
        planTitle: "Kế hoạch hôm nay",
        level: "Cấp độ 3 - Trung cấp",
        unit: "Bài 4: Đời sống hằng ngày",
        lesson: "Bài học 2",
        cafe: "Ở quán cà phê",
        continue: "Tiếp tục",
        speakingTitle: "Luyện nói",
        speakingPrompt: "Kể về cuối tuần của bạn",
        startSpeaking: "Bắt đầu nói",
        progressTitle: "Tiến độ tuần",
        progressNote: "Bạn đang làm rất tốt!",
        progressCount: "Đã hoàn thành 4 / 7 bài",
      },
    },
    features: {
      heading: "Mọi thứ bạn cần để nâng trình tiếng Anh",
      items: [
        {
          title: "Luyện nói",
          description: "Hội thoại thật với AI và gợi ý tự nhiên.",
        },
        {
          title: "Luyện nghe",
          description: "Rèn tai với các bài nghe sát thực tế.",
        },
        {
          title: "Phản hồi AI",
          description: "Nhận sửa lỗi và mẹo học cá nhân hóa tức thì.",
        },
        {
          title: "Ôn từ vựng",
          description: "Lịch ôn thông minh giúp nhớ cụm từ mới lâu hơn.",
        },
        {
          title: "Chuỗi học tập",
          description: "Xây thói quen, nhận huy hiệu và giữ động lực.",
        },
      ],
    },
    miniLesson: {
      menu: ["Học", "Luyện tập", "Từ vựng", "Xếp hạng", "Hồ sơ", "Cài đặt"],
      premiumTitle: "Nâng cấp",
      premiumDescription: "Mở khóa toàn bộ bài học và phản hồi nâng cao.",
      heading: "Bài học của tôi",
      viewAll: "Xem tất cả",
      unit: "Bài 4: Đời sống hằng ngày",
      activeLesson: "Bài 2 - Ở quán cà phê",
      activeDescription:
        "Học các mẫu câu hữu ích để gọi món, đặt câu hỏi và duy trì cuộc trò chuyện.",
      activeProgress: "Hoàn thành 75%",
      continue: "Tiếp tục",
      lessons: [
        {
          unit: "Bài 4: Đời sống hằng ngày",
          title: "Bài 1 - Làm quen",
          progress: "100%",
          state: "done",
        },
        {
          unit: "Bài 3: Công việc & học tập",
          title: "Bài 3 - Hội thoại văn phòng",
          progress: "60%",
          state: "progress",
        },
        {
          unit: "Bài 3: Công việc & học tập",
          title: "Bài 2 - Email & tin nhắn",
          progress: "0%",
          state: "locked",
        },
      ],
      unlockTitle: "Mở khóa Premium",
      unlockDescription: "Học không giới hạn, phản hồi nâng cao và nhiều hơn nữa.",
      upgrade: "Nâng cấp ngay",
      dailyGoal: "Mục tiêu ngày",
      edit: "Sửa",
      goalProgress: "18 / 30 phút",
      keepItUp: "Cứ tiếp tục nhé!",
      leaderboard: "Bảng xếp hạng",
      thisWeek: "Tuần này",
      fullLeaderboard: "Xem bảng đầy đủ",
      tutorBubble: ["Hôm nay", "của bạn thế nào?"],
    },
    courses: {
      heading: "Khám phá lộ trình học",
      viewAll: "Xem tất cả khóa học",
      paths: [
        {
          title: "Nền tảng cho người mới",
          description: "Xây nền với từ và mẫu câu thiết yếu.",
          lessons: "24 bài học",
        },
        {
          title: "Hội thoại hằng ngày",
          description: "Nói tự nhiên trong các tình huống quen thuộc.",
          lessons: "36 bài học",
        },
        {
          title: "Tiếng Anh công việc",
          description: "Giao tiếp tự tin tại nơi làm việc.",
          lessons: "28 bài học",
        },
        {
          title: "Tiếng Anh du lịch",
          description: "Tự tin nói chuyện ở bất cứ đâu.",
          lessons: "20 bài học",
        },
      ],
      storiesHeading: "Được người học trên toàn thế giới yêu thích",
      ratingLabel: "Đánh giá năm sao",
      stories: [
        {
          quote:
            "FluentFlow giúp tôi tự tin nói tiếng Anh ở nơi làm việc. Bài học thực tế và rất vui.",
          name: "Maria G.",
          role: "Quản lý Marketing, Tây Ban Nha",
        },
        {
          quote:
            "Phần luyện nói thật sự tuyệt vời. Tôi không nghĩ học online lại hiệu quả như vậy.",
          name: "James T.",
          role: "Kỹ sư phần mềm, Canada",
        },
        {
          quote: "Tôi thích mục tiêu hằng ngày và streak. Chúng giúp tôi có động lực mỗi ngày.",
          name: "Priya S.",
          role: "Sinh viên, Ấn Độ",
        },
      ],
    },
    pricing: {
      heading: "Bảng giá đơn giản cho mọi người",
      subheading: "Bắt đầu miễn phí. Nâng cấp bất cứ lúc nào.",
      popular: "Phổ biến nhất",
      periodPrefix: "/",
      plans: [
        {
          name: "Miễn phí",
          price: "$0",
          period: "tháng",
          features: ["5 bài học mỗi ngày", "Ôn từ vựng cơ bản", "Bài tập tiêu chuẩn"],
          cta: "Bắt đầu",
        },
        {
          name: "Premium",
          price: "$9.99",
          period: "tháng",
          features: [
            "Bài học không giới hạn",
            "AI sửa lỗi & góp ý",
            "Luyện nói với AI",
            "Phân tích tiến độ",
          ],
          cta: "Dùng thử 7 ngày",
        },
        {
          name: "Premium Plus",
          price: "$14.99",
          period: "tháng",
          features: [
            "Tất cả trong Premium",
            "Ưu tiên phản hồi",
            "Buổi học nhóm trực tiếp",
            "Chứng nhận hoàn thành",
          ],
          cta: "Dùng thử 7 ngày",
        },
      ],
    },
    footer: {
      description:
        "Giúp hàng triệu người học trên thế giới nói tiếng Anh tự tin hơn.",
      socialLabel: "Liên kết mạng xã hội",
      columns: [
        {
          title: "Sản phẩm",
          links: ["Tính năng", "Khóa học", "Bảng giá", "Ứng dụng di động"],
        },
        {
          title: "Học tập",
          links: ["Blog", "Mẹo học", "Trung tâm hỗ trợ", "Cộng đồng"],
        },
        {
          title: "Công ty",
          links: ["Về chúng tôi", "Tuyển dụng", "Báo chí", "Liên hệ"],
        },
        {
          title: "Pháp lý",
          links: ["Điều khoản", "Quyền riêng tư", "Chính sách cookie"],
        },
      ],
      newsletterTitle: "Nhận tin mới",
      newsletterDescription: "Nhận mẹo học và cập nhật mới qua email.",
      emailLabel: "Địa chỉ email",
      emailPlaceholder: "Nhập email của bạn",
      subscribeLabel: "Đăng ký",
      copyright: "Đã đăng ký bản quyền.",
    },
  },
};

type LandingCopy = (typeof dictionaries)["en"];

type LandingI18nContextValue = {
  locale: LandingLocale;
  setLocale: (locale: LandingLocale) => void;
  toggleLocale: () => void;
  t: LandingCopy;
};

const LandingI18nContext = createContext<LandingI18nContextValue | null>(null);

export function LandingI18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LandingLocale>("en");

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("fluentflow-locale");
    if (savedLocale === "en" || savedLocale === "vi") {
      const timer = window.setTimeout(() => {
        setLocaleState(savedLocale);
        document.documentElement.lang = savedLocale;
      }, 0);

      return () => window.clearTimeout(timer);
    }

    document.documentElement.lang = "en";
  }, []);

  const setLocale = useCallback((nextLocale: LandingLocale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem("fluentflow-locale", nextLocale);
    document.documentElement.lang = nextLocale;
  }, []);

  const value = useMemo<LandingI18nContextValue>(() => {
    return {
      locale,
      setLocale,
      toggleLocale: () => setLocale(locale === "en" ? "vi" : "en"),
      t: dictionaries[locale],
    };
  }, [locale, setLocale]);

  return (
    <LandingI18nContext.Provider value={value}>
      {children}
    </LandingI18nContext.Provider>
  );
}

export function useLandingI18n() {
  const context = useContext(LandingI18nContext);

  if (!context) {
    throw new Error("useLandingI18n must be used inside LandingI18nProvider");
  }

  return context;
}
