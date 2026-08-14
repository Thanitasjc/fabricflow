"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calculator, Info, Minus, Plus, Ruler, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  estimateFabricYards,
  fabricPatterns,
  yardsToMeters,
  type GarmentSize,
} from "@/data/fabric-calculator";
import { cn } from "@/lib/utils";

const sizes: GarmentSize[] = ["S", "M", "L", "XL"];

export function FabricCalculator() {
  const [patternId, setPatternId] = useState(fabricPatterns[0].id);
  const [size, setSize] = useState<GarmentSize>("M");
  const [quantity, setQuantity] = useState(1);
  const [result, setResult] = useState<{ yards: number; meters: number } | null>(
    null
  );

  const selected = useMemo(
    () => fabricPatterns.find((p) => p.id === patternId)!,
    [patternId]
  );

  const handleCalculate = () => {
    const yards = estimateFabricYards(patternId, size, quantity);
    setResult({ yards, meters: yardsToMeters(yards) });
  };

  const adjustQty = (delta: number) => {
    setQuantity((q) => Math.min(999, Math.max(1, q + delta)));
    setResult(null);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* Calculator panel */}
      <div className="lg:col-span-7">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-[0_4px_24px_rgba(3,31,61,0.04)] md:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Calculator className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="heading-display text-xl text-deep-blue md:text-2xl">
                เครื่องคำนวณผ้า
              </h2>
              <p className="text-sm text-muted">Fabric Yardage Estimator</p>
            </div>
          </div>

          {/* Step 1 */}
          <div className="mt-8">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                1
              </span>
              <h3 className="text-sm font-semibold text-deep-blue">
                เลือกแพทเทิร์น / Choose Pattern
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {fabricPatterns.map((pattern) => (
                <button
                  key={pattern.id}
                  type="button"
                  onClick={() => {
                    setPatternId(pattern.id);
                    setResult(null);
                  }}
                  className={cn(
                    "rounded-xl border px-3 py-3 text-left transition-all duration-200",
                    patternId === pattern.id
                      ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                      : "border-border bg-white hover:border-primary/40 hover:bg-bg-light"
                  )}
                >
                  <span className="block text-sm font-medium text-deep-blue">
                    {pattern.nameTh}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-muted">
                    {pattern.nameEn}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className="mt-8">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                2
              </span>
              <h3 className="text-sm font-semibold text-deep-blue">
                เลือกไซส์ / Choose Size
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSize(s);
                    setResult(null);
                  }}
                  className={cn(
                    "flex h-12 w-14 items-center justify-center rounded-xl border text-sm font-semibold transition-all",
                    size === s
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-white text-deep-blue hover:border-primary/40"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 */}
          <div className="mt-8">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                3
              </span>
              <h3 className="text-sm font-semibold text-deep-blue">
                จำนวนชุด / Quantity of Garments
              </h3>
            </div>
            <div className="inline-flex items-center rounded-xl border border-border bg-bg-light">
              <button
                type="button"
                aria-label="ลดจำนวน"
                onClick={() => adjustQty(-1)}
                className="flex h-12 w-12 items-center justify-center text-deep-blue transition-colors hover:text-primary"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                min={1}
                max={999}
                value={quantity}
                onChange={(e) => {
                  const n = parseInt(e.target.value, 10);
                  setQuantity(Number.isNaN(n) ? 1 : Math.min(999, Math.max(1, n)));
                  setResult(null);
                }}
                className="h-12 w-16 border-x border-border bg-white text-center text-base font-semibold text-deep-blue outline-none"
              />
              <button
                type="button"
                aria-label="เพิ่มจำนวน"
                onClick={() => adjustQty(1)}
                className="flex h-12 w-12 items-center justify-center text-deep-blue transition-colors hover:text-primary"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8">
            <Button
              type="button"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={handleCalculate}
            >
              <Calculator className="h-4 w-4" />
              คำนวณผ้า / Calculate
            </Button>
          </div>

          {/* Result */}
          <div
            className={cn(
              "mt-8 rounded-xl border p-5 transition-all md:p-6",
              result
                ? "border-accent/40 bg-gradient-to-br from-bg-light to-white"
                : "border-dashed border-border bg-bg-light/50"
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Estimate
            </p>
            {result ? (
              <>
                <div className="mt-3 flex flex-wrap items-end gap-6">
                  <div>
                    <p className="font-[family-name:var(--font-manrope)] text-4xl font-semibold text-deep-blue md:text-5xl">
                      {result.yards}
                    </p>
                    <p className="mt-1 text-sm font-medium text-muted">Yards*</p>
                  </div>
                  <div className="pb-1 text-muted">≈</div>
                  <div>
                    <p className="font-[family-name:var(--font-manrope)] text-3xl font-semibold text-primary md:text-4xl">
                      {result.meters}
                    </p>
                    <p className="mt-1 text-sm font-medium text-muted">เมตร</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted">
                  {selected.nameTh} · ไซส์ {size} · {quantity} ชุด
                </p>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <Link href="/products">
                    <Button variant="accent" size="md" className="w-full sm:w-auto">
                      <ShoppingBag className="h-4 w-4" />
                      ดูสินค้าผ้า
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="md" className="w-full sm:w-auto">
                      ปรึกษาฝ่ายขาย
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <p className="mt-2 text-sm text-muted">
                กดปุ่มคำนวณเพื่อดูประมาณการจำนวนผ้าที่ต้องใช้
              </p>
            )}
          </div>

          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
            *ประมาณการจากความกว้างผ้าประมาณ 150 ซม. ผลลัพธ์ขึ้นกับแพทเทิร์น
            ไซส์ ทิศลายผ้า และเทคนิคการตัด — หากต้องการความแม่นยำ
            แนะนำปรึกษาช่างหรือฝ่ายขาย FabricFlow
          </p>
        </div>
      </div>

      {/* Guide panel */}
      <aside className="lg:col-span-5">
        <div className="rounded-2xl border border-border bg-deep-blue p-6 text-white md:p-8 lg:sticky lg:top-28">
          <div className="flex items-center gap-3">
            <Ruler className="h-5 w-5 text-accent" />
            <h3 className="font-[family-name:var(--font-manrope)] text-lg font-semibold">
              คู่มือประมาณการผ้า
            </h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            อยากรู้ผ้า 1 หลา ตัดชุดได้กี่ตัว? จริง ๆ แล้วขึ้นกับแพทเทิร์น ไซส์
            และชนิดผ้า — ตารางด้านล่างเป็นค่าประมาณเบื้องต้นสำหรับไซส์ M
          </p>

          <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5 text-left text-xs uppercase tracking-wider text-accent">
                  <th className="px-4 py-3 font-semibold">ประเภทชุด</th>
                  <th className="px-4 py-3 font-semibold">ประมาณการ</th>
                </tr>
              </thead>
              <tbody>
                {fabricPatterns.map((p, i) => (
                  <tr
                    key={p.id}
                    className={cn(
                      "border-t border-white/10",
                      i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
                    )}
                  >
                    <td className="px-4 py-2.5 text-white/90">{p.nameTh}</td>
                    <td className="px-4 py-2.5 text-white/65">{p.rangeLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-white/50">
            สำหรับออเดอร์จำนวนมากหรือยูนิฟอร์มองค์กร
            สามารถขอใบเสนอราคาและคำนวณผ้าแบบแม่นยำจากทีม FabricFlow ได้
          </p>
          <Link href="/quotation" className="mt-4 inline-block">
            <Button variant="accent" size="md">
              ขอใบเสนอราคา
            </Button>
          </Link>
        </div>
      </aside>
    </div>
  );
}
