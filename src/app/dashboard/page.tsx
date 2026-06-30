"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LogOut,
  Loader2,
  AlertCircle,
  CheckCircle2,
  User,
  MessageSquare,
  Clock,
  Pencil,
  Send,
  Inbox,
  BookOpen,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

type UserStatus = {
  id: string;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export default function DashboardPage() {
  const router = useRouter();

  // Auth state
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Status state
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusInput, setStatusInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Feedback
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // ── Fetch user status from Supabase ──
  const fetchStatus = useCallback(async (userId: string) => {
    if (!supabase) return;
    setStatusLoading(true);

    const { data, error: fetchError } = await supabase
      .from("user_statuses")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    setStatusLoading(false);

    if (fetchError) {
      setError(fetchError.message);
      return;
    }

    if (data) {
      setUserStatus(data);
      setStatusInput(data.status);
    }
  }, []);

  // ── Check auth on mount + listen for auth changes ──
  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return;
    }

    // Get the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchStatus(session.user.id);
      } else {
        router.push("/login");
      }
      setAuthLoading(false);
    });

    // Listen for auth state changes (handles refresh, tab switch, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
        router.push("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router, fetchStatus]);

  // ── Logout ──
  async function handleLogout() {
    if (!supabase) return;
    setLogoutLoading(true);
    await supabase.auth.signOut();
    setLogoutLoading(false);
    router.push("/login");
  }

  // ── Create or Update status ──
  async function handleSaveStatus(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!supabase || !user) return;

    const trimmed = statusInput.trim();
    if (!trimmed) {
      setError("Status cannot be empty.");
      return;
    }
    if (trimmed.length > 180) {
      setError("Status must be 180 characters or fewer.");
      return;
    }

    setStatusLoading(true);

    if (userStatus) {
      // Update existing
      const { data, error: updateError } = await supabase
        .from("user_statuses")
        .update({ status: trimmed, updated_at: new Date().toISOString() })
        .eq("user_id", user.id)
        .select()
        .single();

      setStatusLoading(false);

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setUserStatus(data);
      setSuccess("Status updated!");
      setIsEditing(false);
    } else {
      // Insert new
      const { data, error: insertError } = await supabase
        .from("user_statuses")
        .insert({ user_id: user.id, status: trimmed })
        .select()
        .single();

      setStatusLoading(false);

      if (insertError) {
        setError(insertError.message);
        return;
      }

      setUserStatus(data);
      setSuccess("Status created!");
      setIsEditing(false);
    }

    // Auto-clear success message
    setTimeout(() => setSuccess(null), 3000);
  }

  // ── Loading state (checking auth) ──
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // ── Not configured state ──
  if (!supabase) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md animate-fade-in-up">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Supabase Not Configured</h1>
          <p className="text-muted text-sm">
            Please add your Supabase URL and anon key to the{" "}
            <code className="px-1.5 py-0.5 bg-surface-secondary rounded text-xs">
              .env
            </code>{" "}
            file.
          </p>
        </div>
      </div>
    );
  }

  const displayName =
    user?.user_metadata?.full_name || user?.email || "User";
  const displayEmail = user?.email || "";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border/50 bg-surface/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary group">
            <BookOpen className="w-7 h-7" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              FluentFlow
            </span>
          </Link>

          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted hover:text-red-600 hover:bg-red-50 rounded-xl transition-all disabled:opacity-50"
          >
            {logoutLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome card */}
        <div className="bg-gradient-to-br from-[#6366f1] via-[#4f46e5] to-[#7c3aed] rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-xl shadow-primary/15 animate-fade-in-up">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold flex-shrink-0">
              {initial}
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight truncate">
                Welcome, {displayName}!
              </h1>
              <p className="text-white/70 text-sm truncate">{displayEmail}</p>
            </div>
          </div>
        </div>

        {/* Feedback messages */}
        {error && (
          <div className="flex items-start gap-3 p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm animate-fade-in-up">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-600"
            >
              ×
            </button>
          </div>
        )}

        {success && (
          <div className="flex items-start gap-3 p-4 mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm animate-fade-in-up">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Profile info card */}
        <div className="bg-surface rounded-2xl border border-border/50 shadow-sm p-6 mb-6 animate-fade-in-up delay-100">
          <h2 className="text-base font-bold flex items-center gap-2 mb-4">
            <User className="w-4 h-4 text-primary" />
            Profile Information
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-surface-secondary/50 rounded-xl p-4">
              <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1">
                Full Name
              </p>
              <p className="text-sm font-semibold truncate">{displayName}</p>
            </div>
            <div className="bg-surface-secondary/50 rounded-xl p-4">
              <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1">
                Email
              </p>
              <p className="text-sm font-semibold truncate">{displayEmail}</p>
            </div>
            <div className="bg-surface-secondary/50 rounded-xl p-4">
              <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1">
                User ID
              </p>
              <p className="text-xs font-mono text-muted truncate">{user?.id}</p>
            </div>
            <div className="bg-surface-secondary/50 rounded-xl p-4">
              <p className="text-xs font-medium text-muted uppercase tracking-wider mb-1">
                Joined
              </p>
              <p className="text-sm font-semibold">
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Status card */}
        <div className="bg-surface rounded-2xl border border-border/50 shadow-sm p-6 animate-fade-in-up delay-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              My Status
            </h2>
            {userStatus && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                <Pencil className="w-3 h-3" />
                Edit
              </button>
            )}
          </div>

          {/* Loading status */}
          {statusLoading && !userStatus && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
          )}

          {/* Empty state — no status yet */}
          {!statusLoading && !userStatus && !isEditing && (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-2xl bg-surface-secondary flex items-center justify-center mx-auto mb-3">
                <Inbox className="w-6 h-6 text-muted" />
              </div>
              <p className="text-sm text-muted mb-4">
                You haven&apos;t set a status yet.
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#6366f1] to-[#4f46e5] rounded-xl shadow-lg shadow-[#6366f1]/25 hover:shadow-[#6366f1]/40 hover:scale-[1.02] transition-all active:scale-[0.98]"
              >
                <Pencil className="w-3.5 h-3.5" />
                Set your status
              </button>
            </div>
          )}

          {/* Display current status */}
          {userStatus && !isEditing && (
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-5 border border-primary/10">
              <p className="text-base leading-relaxed">
                &ldquo;{userStatus.status}&rdquo;
              </p>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-muted">
                <Clock className="w-3 h-3" />
                Updated{" "}
                {new Date(userStatus.updated_at).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          )}

          {/* Edit / Create form */}
          {(isEditing || (!userStatus && !statusLoading && isEditing)) && (
            <form onSubmit={handleSaveStatus}>
              <div className="relative">
                <textarea
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value)}
                  placeholder="What's on your mind? (max 180 characters)"
                  maxLength={180}
                  rows={3}
                  disabled={statusLoading}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface-secondary/50 text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none disabled:opacity-50"
                />
                <span className="absolute bottom-3 right-3 text-xs text-muted">
                  {statusInput.length}/180
                </span>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <button
                  type="submit"
                  disabled={statusLoading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#6366f1] to-[#4f46e5] rounded-xl shadow-lg shadow-[#6366f1]/25 hover:shadow-[#6366f1]/40 hover:scale-[1.02] transition-all active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                >
                  {statusLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  {userStatus ? "Update status" : "Save status"}
                </button>
                {userStatus && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setStatusInput(userStatus.status);
                      setError(null);
                    }}
                    className="px-4 py-2.5 text-sm font-medium text-muted hover:text-foreground rounded-xl hover:bg-surface-secondary transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
