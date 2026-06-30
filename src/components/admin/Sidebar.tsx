"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BookOpen, 
  LayoutDashboard, 
  Library, 
  Users, 
  Settings,
  LogOut 
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Vocabulary", href: "/admin/vocabulary", icon: Library },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/");
  };

  return (
    <aside className="w-64 bg-white border-r border-border h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative grid h-10 w-10 place-items-center rounded-[14px] bg-[linear-gradient(135deg,#5b48e8,#29b8c8)] text-white shadow-[0_8px_24px_rgba(91,72,232,0.22)]">
            <BookOpen className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-accent" />
          </span>
          <span className="text-xl font-bold tracking-tight text-foreground">
            FluentFlow
          </span>
        </Link>
        <span className="text-xs font-semibold text-muted uppercase tracking-wider mt-2 block">
          CMS Admin
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted hover:bg-surface-secondary hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </aside>
  );
}
