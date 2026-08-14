"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await api.contact({
        name: String(data.get("name") ?? ""),
        phone: String(data.get("phone") ?? ""),
        email: String(data.get("email") ?? "") || undefined,
        topic: String(data.get("topic") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      setSubmitted(true);
      form.reset();
    } catch {
      setError("ส่งไม่สำเร็จ กรุณาลองใหม่หรือติดต่อทางโทรศัพท์");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 text-center md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Thank You
        </p>
        <h3 className="mt-3 heading-display text-2xl text-deep-blue">
          รับข้อความเรียบร้อยแล้ว
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          ทีม FabricFlow จะติดต่อกลับโดยเร็วที่สุดในเวลาทำการ
        </p>
        <Button
          className="mt-6"
          variant="outline"
          onClick={() => setSubmitted(false)}
        >
          ส่งข้อความอีกครั้ง
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-white p-6 md:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Contact Form
      </p>
      <h2 className="mt-2 heading-display text-2xl text-deep-blue">
        ส่งข้อความถึงเรา
      </h2>
      <p className="mt-2 text-sm text-muted">
        กรอกข้อมูลเพื่อสอบถามสินค้า ราคาส่ง หรือขอใบเสนอราคา
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-deep-blue">
            ชื่อ-นามสกุล *
          </span>
          <input
            required
            name="name"
            className="h-12 w-full rounded-[10px] border border-border bg-bg-light px-4 text-deep-blue outline-none transition-colors focus:border-primary focus:bg-white"
            placeholder="ชื่อของคุณ"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-deep-blue">
            เบอร์โทร *
          </span>
          <input
            required
            name="phone"
            type="tel"
            className="h-12 w-full rounded-[10px] border border-border bg-bg-light px-4 text-deep-blue outline-none transition-colors focus:border-primary focus:bg-white"
            placeholder="08x-xxx-xxxx"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block font-medium text-deep-blue">
            อีเมล
          </span>
          <input
            name="email"
            type="email"
            className="h-12 w-full rounded-[10px] border border-border bg-bg-light px-4 text-deep-blue outline-none transition-colors focus:border-primary focus:bg-white"
            placeholder="you@company.com"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block font-medium text-deep-blue">
            หัวข้อ *
          </span>
          <select
            required
            name="topic"
            defaultValue=""
            className="h-12 w-full rounded-[10px] border border-border bg-bg-light px-4 text-deep-blue outline-none transition-colors focus:border-primary focus:bg-white"
          >
            <option value="" disabled>
              เลือกหัวข้อ
            </option>
            <option value="product">สอบถามสินค้า</option>
            <option value="wholesale">ราคาส่ง / สมัครค้าส่ง</option>
            <option value="quotation">ขอใบเสนอราคา</option>
            <option value="service">บริการจัดหาผ้า / สั่งผลิต</option>
            <option value="other">อื่น ๆ</option>
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block font-medium text-deep-blue">
            รายละเอียด *
          </span>
          <textarea
            required
            name="message"
            rows={5}
            className="w-full resize-y rounded-[10px] border border-border bg-bg-light px-4 py-3 text-deep-blue outline-none transition-colors focus:border-primary focus:bg-white"
            placeholder="บอกเราเกี่ยวกับชนิดผ้า จำนวน หรือความต้องการของคุณ"
          />
        </label>
      </div>

      {error ? (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="mt-6 w-full sm:w-auto"
        disabled={loading}
      >
        <Send className="h-4 w-4" />
        {loading ? "กำลังส่ง..." : "ส่งข้อความ"}
      </Button>
    </form>
  );
}
