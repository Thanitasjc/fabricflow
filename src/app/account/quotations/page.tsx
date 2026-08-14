"use client";

import { useEffect, useState } from "react";
import { authApi } from "@/lib/auth";

type QuotationRow = {
  id: number;
  number: string;
  status: string;
  total: string | number | null;
  valid_until: string | null;
};

function formatMoney(value: string | number | null | undefined) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(Number(value ?? 0));
}

export default function AccountQuotationsPage() {
  const [rows, setRows] = useState<QuotationRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi
      .quotations()
      .then((data) => setRows(data as QuotationRow[]))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
      <h2 className="font-display text-xl font-semibold text-deep-blue">ใบเสนอราคา</h2>
      <p className="mt-1 text-sm text-muted">ใบเสนอราคาที่ออกให้บัญชีของคุณ</p>

      {loading && <p className="mt-6 text-sm text-muted">กำลังโหลด...</p>}
      {error && <p className="mt-6 text-sm text-danger">{error}</p>}
      {!loading && !error && rows.length === 0 && (
        <p className="mt-6 text-sm text-muted">ยังไม่มีใบเสนอราคา</p>
      )}
      {!loading && rows.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="pb-3 font-medium">เลขที่</th>
                <th className="pb-3 font-medium">ใช้ได้ถึง</th>
                <th className="pb-3 font-medium">สถานะ</th>
                <th className="pb-3 text-right font-medium">ยอดรวม</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="py-3 font-medium text-deep-blue">{row.number}</td>
                  <td className="py-3 text-muted">{row.valid_until ?? "—"}</td>
                  <td className="py-3">
                    <span className="rounded-full bg-bg-light px-2.5 py-1 text-xs font-medium text-deep-blue">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 text-right font-medium">
                    {formatMoney(row.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
