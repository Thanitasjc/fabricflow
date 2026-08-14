"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { authApi } from "@/lib/auth";
import { Button } from "@/components/ui/Button";

export default function AccountProfilePage() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);
    try {
      const res = await authApi.updateProfile({ name, phone: phone || undefined });
      setUser(res.user);
      setMessage("บันทึกโปรไฟล์เรียบร้อย");
    } catch (err) {
      setError(err instanceof Error ? err.message : "บันทึกไม่สำเร็จ");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
      <h2 className="font-display text-xl font-semibold text-deep-blue">โปรไฟล์</h2>
      <p className="mt-1 text-sm text-muted">ข้อมูลบัญชีและการติดต่อ</p>

      <form onSubmit={onSubmit} className="mt-6 max-w-lg space-y-4">
        {message && (
          <div className="rounded-lg border border-success/20 bg-success/5 px-3 py-2 text-sm text-success">
            {message}
          </div>
        )}
        {error && (
          <div className="rounded-lg border border-danger/20 bg-danger/5 px-3 py-2 text-sm text-danger">
            {error}
          </div>
        )}

        <label className="block text-sm font-medium text-deep-blue">
          ชื่อ
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-[10px] border border-border px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="block text-sm font-medium text-deep-blue">
          อีเมล
          <input
            disabled
            value={user?.email ?? ""}
            className="mt-1.5 h-11 w-full rounded-[10px] border border-border bg-bg-light px-3 text-sm text-muted"
          />
        </label>

        <label className="block text-sm font-medium text-deep-blue">
          เบอร์โทร
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-[10px] border border-border px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        {user?.customer && (
          <div className="rounded-xl bg-bg-light p-4 text-sm">
            <p className="font-medium text-deep-blue">{user.customer.name}</p>
            <p className="mt-1 text-muted">
              {user.customer.code} · ระดับราคา {user.customer.priceTier}
            </p>
          </div>
        )}

        <Button type="submit" disabled={submitting}>
          {submitting ? "กำลังบันทึก..." : "บันทึก"}
        </Button>
      </form>
    </div>
  );
}
