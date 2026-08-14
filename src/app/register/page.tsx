"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const { register, user, loading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accountType, setAccountType] = useState<"retail" | "wholesale">(
    "retail"
  );
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace("/account");
  }, [loading, user, router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== passwordConfirmation) {
      setError("รหัสผ่านยืนยันไม่ตรงกัน");
      return;
    }
    setSubmitting(true);
    try {
      await register({
        name,
        email,
        phone: phone || undefined,
        password,
        password_confirmation: passwordConfirmation,
        account_type: accountType,
      });
      router.push("/account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "สมัครสมาชิกไม่สำเร็จ");
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
              สมัครสมาชิก
            </h1>
            <p className="mt-2 text-sm text-muted">
              สร้างบัญชีเพื่อติดตามคำสั่งซื้อและใบเสนอราคา
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
              ชื่อ-นามสกุล / ชื่อบริษัท
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-[10px] border border-border px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="ชื่อของคุณ"
              />
            </label>

            <label className="mt-4 block text-sm font-medium text-deep-blue">
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
              เบอร์โทร
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-[10px] border border-border px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="08x-xxx-xxxx"
              />
            </label>

            <fieldset className="mt-4">
              <legend className="text-sm font-medium text-deep-blue">
                ประเภทบัญชี
              </legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(
                  [
                    ["retail", "ขายปลีก"],
                    ["wholesale", "ขายส่ง / B2B"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAccountType(value)}
                    className={`h-11 rounded-[10px] border text-sm font-medium transition ${
                      accountType === value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted hover:border-primary/40"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="mt-4 block text-sm font-medium text-deep-blue">
              รหัสผ่าน
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-[10px] border border-border px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                minLength={8}
              />
            </label>

            <label className="mt-4 block text-sm font-medium text-deep-blue">
              ยืนยันรหัสผ่าน
              <input
                type="password"
                required
                autoComplete="new-password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-[10px] border border-border px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                minLength={8}
              />
            </label>

            <Button
              type="submit"
              className="mt-6 w-full"
              disabled={submitting}
            >
              {submitting ? "กำลังสมัคร..." : "สมัครสมาชิก"}
            </Button>

            <p className="mt-5 text-center text-sm text-muted">
              มีบัญชีแล้ว?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                เข้าสู่ระบบ
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
