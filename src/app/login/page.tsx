"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/src/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (!supabase) {
      setCheckingAuth(false);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/dashboard");
      } else {
        setCheckingAuth(false);
      }
    });
  }, [router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!supabase) {
      setError("Supabase is not configured. Check your environment variables.");
      return;
    }

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    router.push("/dashboard");
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="bg-white rounded-3xl border border-border shadow-sm p-8 sm:p-10">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8 text-primary">
            <BookOpen className="w-7 h-7" />
            <span className="text-xl font-bold tracking-tight text-foreground">
              FluentFlow
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">
            Welcome back
          </h1>
          <p className="text-sm text-muted mb-8">
            Sign in to continue your daily English habit.
          </p>

          {/* Error state */}
          {error && (
            <div className="flex items-start gap-3 p-4 mb-6 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm animate-fade-in-up">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface-secondary text-sm placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-border bg-surface-secondary text-sm placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="text-sm text-muted text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
