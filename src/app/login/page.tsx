"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";

function LoginForm() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/account";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace(next);
  }, [loading, user, router, next]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.push(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "เข้าสู่ระบบไม่สำเร็จ");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative overflow-hidden bg-bg-light">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(7,59,115,0.12),_transparent_55%),linear-gradient(180deg,#f5f7fa_0%,#eef2f7_100%)]"
      />
      <div className="container-ff relative flex min-h-[70vh] items-center justify-center py-12 md:py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <p className="font-display text-2xl font-semibold tracking-tight text-deep-blue">
              FabricFlow
            </p>
            <h1 className="mt-2 font-thai text-xl font-medium text-deep-blue">
              เข้าสู่ระบบสมาชิก
            </h1>
            <p className="mt-2 text-sm text-muted">
              ดูออเดอร์ ใบเสนอราคา และโปรไฟล์ลูกค้าของคุณ
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8"
          >
            {error && (
              <div className="mb-4 rounded-lg border border-danger/20 bg-danger/5 px-3 py-2 text-sm text-danger">
                {error}
              </div>
            )}

            <label className="block text-sm font-medium text-deep-blue">
              อีเมล
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-[10px] border border-border px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="you@company.com"
              />
            </label>

            <label className="mt-4 block text-sm font-medium text-deep-blue">
              รหัสผ่าน
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-[10px] border border-border px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="••••••••"
              />
            </label>

            <div className="mt-3 flex justify-end">
              <span className="text-xs text-muted">ลืมรหัสผ่าน? ติดต่อฝ่ายขาย</span>
            </div>

            <Button
              type="submit"
              className="mt-6 w-full"
              disabled={submitting}
            >
              {submitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </Button>

            <p className="mt-5 text-center text-sm text-muted">
              ยังไม่มีบัญชี?{" "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                สมัครสมาชิก
              </Link>
            </p>

            <p className="mt-4 rounded-lg bg-bg-light px-3 py-2 text-center text-xs text-muted">
              ทดลอง: customer@fabricflow.test / password
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-muted">กำลังโหลด...</div>}>
      <LoginForm />
    </Suspense>
  );
}
