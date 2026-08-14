"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("ff-pwa-dismissed");
    if (dismissed === "1") return;

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    return () =>
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  if (!visible || !deferred) return null;

  const install = async () => {
    await deferred.prompt();
    const choice = await deferred.userChoice;
    if (choice.outcome === "accepted") {
      setVisible(false);
    }
    setDeferred(null);
  };

  const dismiss = () => {
    localStorage.setItem("ff-pwa-dismissed", "1");
    setVisible(false);
  };

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-md rounded-2xl border border-border bg-white p-4 shadow-[0_12px_40px_rgba(3,31,61,0.18)] md:bottom-6 md:left-auto md:right-24">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-bold text-accent">
          F
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-[family-name:var(--font-manrope)] text-sm font-semibold text-deep-blue">
            ติดตั้ง FabricFlow
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            เพิ่มลงหน้าจอโฮมเพื่อใช้งานเร็วขึ้นแบบแอปบนมือถือ
          </p>
          <div className="mt-3 flex gap-2">
            <Button size="sm" variant="primary" onClick={install}>
              <Download className="h-3.5 w-3.5" />
              ติดตั้งแอป
            </Button>
            <Button size="sm" variant="ghost" onClick={dismiss}>
              ไว้ทีหลัง
            </Button>
          </div>
        </div>
        <button
          type="button"
          aria-label="ปิด"
          onClick={dismiss}
          className="rounded-lg p-1 text-muted hover:bg-bg-light hover:text-deep-blue"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
