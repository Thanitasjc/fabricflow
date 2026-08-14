"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authApi, type PortalDashboard } from "@/lib/auth";
import { useAuth } from "@/components/auth/AuthProvider";

function formatMoney(value: string | number | null | undefined) {
  const n = Number(value ?? 0);
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function AccountDashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<PortalDashboard | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    authApi
      .dashboard()
      .then(setData)
      .catch((e: Error) => setError(e.message));
  }, []);

  if (error) {
    return (
      <div className="rounded-2xl border border-danger/20 bg-white p-6 text-sm text-danger">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 text-center text-muted">
        กำลังโหลด...
      </div>
    );
  }

  const cards = [
    { label: "คำสั่งซื้อทั้งหมด", value: data.stats.orders, href: "/account/orders" },
    { label: "ออเดอร์ที่เปิดอยู่", value: data.stats.openOrders, href: "/account/orders" },
    { label: "ใบเสนอราคา", value: data.stats.quotations, href: "/account/quotations" },
    { label: "ใบแจ้งหนี้", value: data.stats.invoices, href: "/account/invoices" },
  ];

  return (
    <div className="space-y-6">
      {user?.customer && (
        <div className="rounded-2xl border border-border bg-gradient-to-br from-primary to-navy-dark p-6 text-white">
          <p className="text-sm text-white/70">เครดิตคงเหลือ</p>
          <p className="mt-1 font-display text-3xl font-semibold">
            {formatMoney(user.customer.availableCredit)}
          </p>
          <p className="mt-2 text-xs text-white/60">
            วงเงิน {formatMoney(user.customer.creditLimit)} · ใช้ไป{" "}
            {formatMoney(user.customer.creditUsed)} · เครดิต{" "}
            {user.customer.paymentTermsDays} วัน
          </p>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-border bg-white p-5 transition hover:border-primary/40 hover:shadow-sm"
          >
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold text-deep-blue">
              {card.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-deep-blue">
              คำสั่งซื้อล่าสุด
            </h2>
            <Link href="/account/orders" className="text-sm text-primary hover:underline">
              ดูทั้งหมด
            </Link>
          </div>
          {data.recentOrders.length === 0 ? (
            <p className="text-sm text-muted">ยังไม่มีคำสั่งซื้อ</p>
          ) : (
            <ul className="divide-y divide-border">
              {data.recentOrders.map((order) => (
                <li key={order.id} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <p className="font-medium text-deep-blue">{order.number}</p>
                    <p className="text-xs text-muted">{order.status}</p>
                  </div>
                  <p className="font-medium">{formatMoney(order.total)}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-border bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-deep-blue">
              ใบเสนอราคาล่าสุด
            </h2>
            <Link
              href="/account/quotations"
              className="text-sm text-primary hover:underline"
            >
              ดูทั้งหมด
            </Link>
          </div>
          {data.recentQuotations.length === 0 ? (
            <p className="text-sm text-muted">ยังไม่มีใบเสนอราคา</p>
          ) : (
            <ul className="divide-y divide-border">
              {data.recentQuotations.map((q) => (
                <li key={q.id} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <p className="font-medium text-deep-blue">{q.number}</p>
                    <p className="text-xs text-muted">{q.status}</p>
                  </div>
                  <p className="font-medium">{formatMoney(q.total)}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
