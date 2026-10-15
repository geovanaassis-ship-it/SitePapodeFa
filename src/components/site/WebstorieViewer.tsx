"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Slide = {
  id: string;
  mediaUrl: string;
  mediaType: string;
  title: string | null;
  text: string | null;
};

const SLIDE_DURATION = 6000;

export function WebstorieViewer({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const total = slides.length;

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return;
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (paused || total <= 1) return;
    const timer = setTimeout(() => goTo(index + 1), SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [index, paused, total, goTo]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, goTo]);

  if (total === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <p className="font-label text-sm text-ink/50">
          Nenhum slide publicado ainda. Adicione slides no painel administrativo em Webstorie.
        </p>
      </div>
    );
  }

  const slide = slides[index];

  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-ink px-4 py-10 sm:px-8">
      <div
        className="relative aspect-[9/16] w-full max-w-sm overflow-hidden rounded-[2rem] border border-paper/10 bg-navy shadow-2xl select-none"
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => setPaused(false)}
        onPointerLeave={() => setPaused(false)}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current !== null) {
            const delta = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(delta) > 40) {
              goTo(delta > 0 ? index - 1 : index + 1);
            }
          }
          touchX.current = null;
        }}
      >
        {/* progress bars */}
        <div className="absolute inset-x-3 top-3 z-20 flex gap-1.5">
          {slides.map((s, i) => (
            <div key={s.id} className="h-1 flex-1 overflow-hidden rounded-full bg-paper/25">
              {i === index && (
                <div
                  key={`${s.id}-${paused}`}
                  className="h-full origin-left bg-paper"
                  style={{
                    animation: paused ? "none" : `story-progress ${SLIDE_DURATION}ms linear forwards`,
                  }}
                />
              )}
              {i < index && <div className="h-full bg-paper" />}
            </div>
          ))}
        </div>

        {/* tap zones */}
        <button
          aria-label="Slide anterior"
          className="absolute inset-y-0 left-0 z-10 w-1/3"
          onClick={() => goTo(index - 1)}
        />
        <button
          aria-label="Próximo slide"
          className="absolute inset-y-0 right-0 z-10 w-1/3"
          onClick={() => goTo(index + 1)}
        />

        {/* media */}
        <div className="absolute inset-0">
          {slide.mediaUrl ? (
            slide.mediaType === "VIDEO" ? (
              <video
                src={slide.mediaUrl}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <Image src={slide.mediaUrl} alt={slide.title ?? ""} fill className="object-cover" />
            )
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-wine via-lilac to-teal opacity-80" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40" />
        </div>

        {/* texto */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-6">
          {slide.title && (
            <h2 className="font-display text-2xl font-bold leading-tight text-paper">{slide.title}</h2>
          )}
          {slide.text && <p className="mt-2 text-sm leading-relaxed text-paper/85">{slide.text}</p>}
          <p className="font-label mt-4 text-[10px] text-paper/50">
            {index + 1} / {total}
          </p>
        </div>
      </div>
    </div>
  );
}
