import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ออฟไลน์",
  description: "ไม่มีการเชื่อมต่ออินเทอร์เน็ต",
};

export default function OfflinePage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        Offline
      </p>
      <h1 className="mt-3 heading-display text-3xl text-deep-blue">
        ไม่มีการเชื่อมต่ออินเทอร์เน็ต
      </h1>
      <p className="mt-4 max-w-md text-muted">
        กรุณาตรวจสอบการเชื่อมต่อเครือข่าย แล้วลองใหม่อีกครั้ง
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center justify-center rounded-[10px] bg-primary px-6 text-sm font-medium text-white"
      >
        กลับหน้าแรก
      </Link>
    </div>
  );
}
