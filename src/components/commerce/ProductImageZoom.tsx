"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  RotateCcw,
  X,
  ZoomIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImageZoomProps {
  open: boolean;
  images: string[];
  activeIndex: number;
  alt: string;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

export function ProductImageZoom({
  open,
  images,
  activeIndex,
  alt,
  onClose,
  onChangeIndex,
}: ProductImageZoomProps) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!open) return;
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, activeIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChangeIndex((activeIndex + 1) % images.length);
      if (e.key === "ArrowLeft") {
        onChangeIndex((activeIndex - 1 + images.length) % images.length);
      }
      if (e.key === "+" || e.key === "=") {
        setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
      }
      if (e.key === "-") {
        setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, activeIndex, images.length, onChangeIndex, onClose]);

  if (!open) return null;

  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(1)));
  const zoomOut = () => {
    setZoom((z) => {
      const next = Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(1));
      if (next === 1) setOffset({ x: 0, y: 0 });
      return next;
    });
  };
  const resetZoom = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-deep-blue/92 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="ขยายรูปสินค้า"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <p className="truncate text-sm text-white/80">
          {alt} · {activeIndex + 1}/{images.length}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="ย่อ"
            onClick={zoomOut}
            disabled={zoom <= MIN_ZOOM}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-40"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-14 text-center text-sm font-medium text-white">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            aria-label="ขยาย"
            onClick={zoomIn}
            disabled={zoom >= MAX_ZOOM}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="รีเซ็ตซูม"
            onClick={resetZoom}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="ปิด"
            onClick={onClose}
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-deep-blue transition-colors hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stage */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <button
          type="button"
          aria-label="รูปก่อนหน้า"
          onClick={() =>
            onChangeIndex((activeIndex - 1 + images.length) % images.length)
          }
          className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-deep-blue md:left-6"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div
          className={cn(
            "relative h-full max-h-[78vh] w-full max-w-5xl select-none",
            zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
          )}
          onDoubleClick={() => {
            if (zoom === 1) setZoom(2);
            else resetZoom();
          }}
          onWheel={(e) => {
            e.preventDefault();
            if (e.deltaY < 0) zoomIn();
            else zoomOut();
          }}
          onPointerDown={(e) => {
            if (zoom <= 1) return;
            setDragging(true);
            setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!dragging || zoom <= 1) return;
            setOffset({
              x: e.clientX - dragStart.x,
              y: e.clientY - dragStart.y,
            });
          }}
          onPointerUp={() => setDragging(false)}
          onPointerCancel={() => setDragging(false)}
        >
          <div
            className="absolute inset-0 transition-transform duration-150 ease-out"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            }}
          >
            <Image
              src={images[activeIndex]}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
              draggable={false}
            />
          </div>
        </div>

        <button
          type="button"
          aria-label="รูปถัดไป"
          onClick={() => onChangeIndex((activeIndex + 1) % images.length)}
          className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-deep-blue md:right-6"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Thumbs */}
      <div className="flex justify-center gap-2 px-4 pb-5">
        {images.map((src, index) => (
          <button
            key={src + index}
            type="button"
            onClick={() => onChangeIndex(index)}
            className={cn(
              "relative h-14 w-14 overflow-hidden rounded-lg border-2 transition-all md:h-16 md:w-16",
              activeIndex === index
                ? "border-accent"
                : "border-white/20 hover:border-white/50"
            )}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="64px" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function ZoomHint() {
  return (
    <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-deep-blue/70 px-3 py-1.5 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
      <ZoomIn className="h-3.5 w-3.5" />
      คลิกเพื่อซูม
    </span>
  );
}
