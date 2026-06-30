"use client";

import type { Session, User } from "@supabase/supabase-js";
import {
  AlertCircle,
  CheckCircle2,
  Database,
  KeyRound,
  Loader2,
  LockKeyhole,
  LogIn,
  LogOut,
  Mail,
  RefreshCw,
  Save,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

type StatusRow = {
  id: string;
  status: string;
  updated_at: string;
};

type AuthMode = "signin" | "signup";

const suggestedStatuses = [
  "Dang hoc Supabase RLS",
  "San sang deploy Vercel",
  "Dang kiem tra user ownership",
];

export function SupabaseMiniProject() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [statusRow, setStatusRow] = useState<StatusRow | null>(null);
  const [statusText, setStatusText] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(isSupabaseConfigured);
  const [statusLoading, setStatusLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const user = session?.user ?? null;

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!mounted) {
        return;
      }

      if (sessionError) {
        setError(sessionError.message);
      }

      setSession(data.session);
      setSessionLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);

      if (!nextSession) {
        setStatusRow(null);
        setStatusText("");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      void loadStatus(user);
    }
  }, [user]);

  const friendlyName = useMemo(() => {
    if (!user?.email) {
      return "Guest";
    }

    return user.email.split("@")[0];
  }, [user]);

  const lastUpdated = statusRow
    ? new Intl.DateTimeFormat("vi-VN", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(statusRow.updated_at))
    : null;

  async function loadStatus(activeUser: User) {
    if (!supabase) {
      return;
    }

    setStatusLoading(true);
    setError("");

    const { data, error: statusError } = await supabase
      .from("user_statuses")
      .select("id,status,updated_at")
      .eq("user_id", activeUser.id)
      .maybeSingle();

    if (statusError) {
      setError(statusError.message);
      setStatusRow(null);
      setStatusText("");
    } else {
      setStatusRow(data);
      setStatusText(data?.status ?? "");
    }

    setStatusLoading(false);
  }

  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setError("Thieu NEXT_PUBLIC_SUPABASE_URL hoac NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      return;
    }

    setAuthLoading(true);
    setError("");
    setMessage("");

    const credentials = { email, password };
    const { error: authError } =
      mode === "signup"
        ? await supabase.auth.signUp(credentials)
        : await supabase.auth.signInWithPassword(credentials);

    if (authError) {
      setError(authError.message);
    } else {
      setMessage(
        mode === "signup"
          ? "Dang ky thanh cong. Kiem tra email neu project bat confirm email."
          : "Dang nhap thanh cong.",
      );
      setPassword("");
    }

    setAuthLoading(false);
  }

  async function handleSignOut() {
    if (!supabase) {
      return;
    }

    setError("");
    setMessage("");
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      setError(signOutError.message);
    }
  }

  async function handleSaveStatus(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase || !user) {
      return;
    }

    const cleanedStatus = statusText.trim();

    if (!cleanedStatus) {
      setError("Trang thai khong duoc de trong.");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    const { data, error: saveError } = await supabase
      .from("user_statuses")
      .upsert(
        {
          user_id: user.id,
          status: cleanedStatus,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      )
      .select("id,status,updated_at")
      .single();

    if (saveError) {
      setError(saveError.message);
    } else {
      setStatusRow(data);
      setStatusText(data.status);
      setMessage("Da cap nhat trang thai.");
    }

    setSaving(false);
  }

  if (!isSupabaseConfigured) {
    return (
      <section className="rounded-lg border border-[#f1c98b] bg-[#fff8ec] p-6 text-[#5b3a08] shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#f5b34d] text-white">
            <AlertCircle className="size-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-lg font-black">Chua cau hinh Supabase</h2>
            <p className="mt-2 text-sm leading-6">
              Tao file <code>.env.local</code> voi{" "}
              <code>NEXT_PUBLIC_SUPABASE_URL</code> va{" "}
              <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, sau do restart dev
              server.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (sessionLoading) {
    return (
      <section className="rounded-lg border border-[#d8e2df] bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 text-[#394946]">
          <Loader2 className="size-5 animate-spin text-[#1f8f6a]" aria-hidden="true" />
          <span className="text-sm font-semibold">
            Dang kiem tra phien dang nhap...
          </span>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-lg border border-[#d8e2df] bg-white shadow-xl shadow-[#6d8f84]/10">
      <div className="grid border-b border-[#d8e2df] bg-[#101817] text-white lg:grid-cols-[0.75fr_1.25fr]">
        <div className="border-b border-white/10 px-5 py-5 lg:border-b-0 lg:border-r">
          <p className="text-xs font-bold uppercase text-[#8ee2c0]">
            Supabase workspace
          </p>
          <h2 className="mt-2 text-2xl font-black">
            {user ? `Xin chao, ${friendlyName}` : "Dang nhap de cap nhat status"}
          </h2>
        </div>

        <div className="grid gap-0 sm:grid-cols-3">
          <HeaderMetric
            icon={<Mail className="size-4" aria-hidden="true" />}
            label="Auth"
            value={user ? "Authenticated" : "Guest"}
          />
          <HeaderMetric
            icon={<Database className="size-4" aria-hidden="true" />}
            label="Table"
            value="user_statuses"
          />
          <HeaderMetric
            icon={<LockKeyhole className="size-4" aria-hidden="true" />}
            label="Access"
            value="RLS enabled"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
        <aside className="border-b border-[#d8e2df] bg-[#f8faf9] p-5 lg:border-b-0 lg:border-r">
          {user ? (
            <div className="space-y-5">
              <div className="rounded-lg border border-[#cce8dd] bg-white p-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#dff5ec] text-[#146b50]">
                    <ShieldCheck className="size-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-[#101817]">
                      Session dang duoc luu
                    </p>
                    <p className="mt-1 break-all text-sm leading-6 text-[#586563]">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => loadStatus(user)}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#101817] px-4 text-sm font-bold text-white transition hover:bg-[#263331]"
              >
                <RefreshCw
                  className={`size-4 ${statusLoading ? "animate-spin" : ""}`}
                  aria-hidden="true"
                />
                Tai lai trang thai
              </button>

              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-[#cbd8d5] bg-white px-4 text-sm font-bold text-[#394946] transition hover:border-[#e05a47] hover:text-[#c94d3d]"
              >
                <LogOut className="size-4" aria-hidden="true" />
                Dang xuat
              </button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleAuth}>
              <div className="grid grid-cols-2 rounded-lg border border-[#d8e2df] bg-[#eef4f2] p-1">
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className={`h-10 rounded-md px-3 text-sm font-black transition ${
                    mode === "signin"
                      ? "bg-white text-[#101817] shadow-sm"
                      : "text-[#65716f] hover:text-[#101817]"
                  }`}
                >
                  Dang nhap
                </button>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className={`h-10 rounded-md px-3 text-sm font-black transition ${
                    mode === "signup"
                      ? "bg-white text-[#101817] shadow-sm"
                      : "text-[#65716f] hover:text-[#101817]"
                  }`}
                >
                  Dang ky
                </button>
              </div>

              <label className="block">
                <span className="text-sm font-bold text-[#394946]">Email</span>
                <div className="mt-2 flex h-12 items-center gap-2 rounded-md border border-[#cbd8d5] bg-white px-3 transition focus-within:border-[#1f8f6a] focus-within:ring-4 focus-within:ring-[#dff5ec]">
                  <Mail className="size-4 text-[#65716f]" aria-hidden="true" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#101817] outline-none placeholder:text-[#9aa8a5]"
                    placeholder="you@example.com"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-[#394946]">Mat khau</span>
                <div className="mt-2 flex h-12 items-center gap-2 rounded-md border border-[#cbd8d5] bg-white px-3 focus-within:border-[#1f8f6a] focus-within:ring-4 focus-within:ring-[#dff5ec]">
                  <KeyRound className="size-4 text-[#65716f]" aria-hidden="true" />
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    minLength={6}
                    required
                    className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#101817] outline-none placeholder:text-[#9aa8a5]"
                    placeholder="Toi thieu 6 ky tu"
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={authLoading}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#1f8f6a] px-4 text-sm font-black text-white shadow-sm transition hover:bg-[#146b50] disabled:cursor-not-allowed disabled:bg-[#9bd9c2]"
              >
                {authLoading ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : mode === "signup" ? (
                  <UserPlus className="size-4" aria-hidden="true" />
                ) : (
                  <LogIn className="size-4" aria-hidden="true" />
                )}
                {mode === "signup" ? "Tao tai khoan" : "Dang nhap"}
              </button>
            </form>
          )}
        </aside>

        <div className="p-5 sm:p-6">
          {user ? (
            <form className="space-y-5" onSubmit={handleSaveStatus}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-[#101817]">
                    Trang thai cua ban
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#65716f]">
                    Ban ghi nay duoc filter boi policy{" "}
                    <code>auth.uid() = user_id</code>.
                  </p>
                </div>
                <span className="rounded-md bg-[#fff0e5] px-3 py-1.5 text-xs font-black text-[#b24b18]">
                  Private row
                </span>
              </div>

              <label className="block">
                <span className="sr-only">Trang thai hien tai</span>
                <textarea
                  value={statusText}
                  onChange={(event) => setStatusText(event.target.value)}
                  maxLength={180}
                  rows={5}
                  className="min-h-36 w-full resize-none rounded-lg border border-[#cbd8d5] bg-[#fbfcfc] px-4 py-3 text-base leading-7 text-[#101817] outline-none transition placeholder:text-[#9aa8a5] focus:border-[#1f8f6a] focus:bg-white focus:ring-4 focus:ring-[#dff5ec]"
                  placeholder="Hom nay ban dang lam gi?"
                  required
                />
              </label>

              <div className="flex flex-wrap gap-2">
                {suggestedStatuses.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setStatusText(item)}
                    className="rounded-md border border-[#d8e2df] bg-white px-3 py-2 text-xs font-bold text-[#394946] transition hover:border-[#1f8f6a] hover:bg-[#dff5ec] hover:text-[#146b50]"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-11 items-center gap-2 rounded-md bg-[#e05a47] px-4 text-sm font-black text-white transition hover:bg-[#c94d3d] disabled:cursor-not-allowed disabled:bg-[#eda79d]"
                >
                  {saving ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Save className="size-4" aria-hidden="true" />
                  )}
                  Luu trang thai
                </button>

                <p className="text-xs font-semibold text-[#65716f]">
                  {statusText.length}/180 ky tu
                </p>
              </div>

              <div className="rounded-lg border border-[#d8e2df] bg-[#f8faf9] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-black uppercase text-[#65716f]">
                    Ban ghi hien tai
                  </p>
                  {lastUpdated ? (
                    <p className="text-xs font-semibold text-[#65716f]">
                      {lastUpdated}
                    </p>
                  ) : null}
                </div>

                {statusLoading ? (
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#586563]">
                    <Loader2 className="size-4 animate-spin text-[#1f8f6a]" aria-hidden="true" />
                    Dang tai du lieu...
                  </div>
                ) : statusRow ? (
                  <p className="mt-4 text-xl font-black leading-8 text-[#101817]">
                    {statusRow.status}
                  </p>
                ) : (
                  <div className="mt-4 border-l-4 border-[#f5b34d] bg-white px-4 py-3">
                    <p className="text-sm font-black text-[#101817]">
                      Chua co trang thai nao
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#65716f]">
                      Luu ban ghi dau tien de thay empty state chuyen thanh data
                      state.
                    </p>
                  </div>
                )}
              </div>
            </form>
          ) : (
            <div className="grid min-h-96 place-items-center rounded-lg border border-dashed border-[#cbd8d5] bg-[#fbfcfc] p-6 text-center">
              <div className="max-w-sm">
                <div className="mx-auto flex size-12 items-center justify-center rounded-md bg-[#dff5ec] text-[#146b50]">
                  <ShieldCheck className="size-6" aria-hidden="true" />
                </div>
                <p className="mt-4 text-lg font-black text-[#101817]">
                  RLS dang bao ve bang user_statuses
                </p>
                <p className="mt-2 text-sm leading-6 text-[#65716f]">
                  Dang nhap de tao row rieng. Khi doi sang user khac, row nay se
                  bien mat neu policy dung.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {(message || error) && (
        <div className="border-t border-[#d8e2df] bg-white px-5 py-4">
          <div
            className={`flex items-start gap-2 rounded-md p-3 text-sm font-semibold ${
              error
                ? "bg-[#fff1f2] text-[#be123c]"
                : "bg-[#eafaf3] text-[#146b50]"
            }`}
          >
            {error ? (
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            )}
            <span>{error || message}</span>
          </div>
        </div>
      )}
    </section>
  );
}

function HeaderMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-white/10 px-5 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div className="flex items-center gap-2 text-[#8ee2c0]">
        {icon}
        <p className="text-xs font-bold uppercase">{label}</p>
      </div>
      <p className="mt-2 text-sm font-black text-white">{value}</p>
    </div>
  );
}
