"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, ArrowLeft, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!supabase) {
      setError("Supabase is not configured. Check your environment variables.");
      return;
    }

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    // If email confirmation is disabled, redirect directly
    // Otherwise show success message
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      router.push("/dashboard");
    } else {
      setSuccess(true);
    }
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
            Create your account
          </h1>
          <p className="text-sm text-muted mb-8">
            Start mastering English today — it&apos;s free to begin.
          </p>

          {/* Success state */}
          {success && (
            <div className="flex items-start gap-3 p-4 mb-6 rounded-xl bg-green-50 border border-green-100 text-green-800 text-sm animate-fade-in-up">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Account created!</p>
                <p className="mt-1">
                  Please check your email to confirm your account, then{" "}
                  <Link href="/login" className="font-semibold underline">
                    sign in
                  </Link>
                  .
                </p>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="flex items-start gap-3 p-4 mb-6 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm animate-fade-in-up">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!success && (
            <form className="space-y-4" onSubmit={handleSignup}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface-secondary text-sm placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="signup-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface-secondary text-sm placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="signup-password"
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
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </button>
            </form>
          )}

          <p className="text-sm text-muted text-center mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
