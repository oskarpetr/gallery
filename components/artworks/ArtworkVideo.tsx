"use client";

import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
import { AnimatePresence, m } from "framer-motion";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";

interface Props {
  src: string;
}

export default function ArtworkVideo({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isHoveringBar, setIsHoveringBar] = useState(false);
  const [hoverPct, setHoverPct] = useState(0);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isPlaying) return;

    let raf = rafRef.current;
    const tick = () => {
      if (!isScrubbing) setCurrentTime(video.currentTime);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isPlaying, isScrubbing]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onLoadedMetadata = () => setDuration(video.duration);
    const onProgress = () => {
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
    };
    const onSeeked = () => {
      if (!isScrubbing) setCurrentTime(video.currentTime);
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("progress", onProgress);
    video.addEventListener("seeked", onSeeked);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("progress", onProgress);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [isScrubbing]);

  const getPctFromEvent = useCallback((clientX: number) => {
    if (!progressRef.current) return 0;
    const rect = progressRef.current.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  }, []);

  const seekFromEvent = useCallback(
    (clientX: number) => {
      if (!videoRef.current || !duration) return;
      const pct = getPctFromEvent(clientX);
      const time = pct * duration;

      setCurrentTime(time);
      videoRef.current.currentTime = time;
    },
    [duration, getPctFromEvent],
  );

  const handlePointerDown = (e: MouseEvent) => {
    e.stopPropagation();
    setIsScrubbing(true);
    seekFromEvent(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    setHoverPct(getPctFromEvent(e.clientX) * 100);
  };

  useEffect(() => {
    if (!isScrubbing) return;

    const onMove = (e: PointerEvent) => seekFromEvent(e.clientX);
    const onUp = () => setIsScrubbing(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [isScrubbing, seekFromEvent]);

  const formatTime = (t: number) => {
    if (!isFinite(t)) return "0s";
    return Math.floor(t).toString().padStart(2, "0") + "s";
  };

  const playedPct = duration ? (currentTime / duration) * 100 : 0;
  const bufferedPct = duration ? (buffered / duration) * 100 : 0;
  const hoverTime = duration ? (hoverPct / 100) * duration : 0;

  return (
    <div
      ref={containerRef}
      className="group relative overflow-hidden rounded-lg bg-black"
    >
      <video
        ref={videoRef}
        onClick={togglePlay}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>

      <div className="absolute right-0 bottom-0 left-0 flex items-center gap-4 bg-black/80 p-4 text-white opacity-0 backdrop-blur-2xl transition-opacity group-hover:opacity-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          className="cursor-pointer"
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={isPlaying ? "pause" : "play"}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              {isPlaying ? (
                <PauseIcon size={24} weight="fill" />
              ) : (
                <PlayIcon size={24} weight="fill" />
              )}
            </m.div>
          </AnimatePresence>
        </button>

        <div
          ref={progressRef}
          onPointerDown={handlePointerDown}
          onMouseEnter={() => setIsHoveringBar(true)}
          onMouseLeave={() => setIsHoveringBar(false)}
          onMouseMove={handleMouseMove}
          className="relative flex w-full cursor-pointer items-center py-2"
        >
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/20">
            <m.div
              className="absolute h-full rounded-full bg-white/20"
              animate={{ width: `${bufferedPct}%` }}
              transition={{ duration: 0.3, ease: "linear" }}
            />

            {/* Hover preview line */}
            {/* {isHoveringBar && (
              <div
                className="absolute -translate-x-1/2 top-0 w-3 h-3 rounded-full bg-white/60 pointer-events-none"
                style={{ left: `${hoverPct}%` }}
              />
            )} */}

            <m.div
              className="absolute h-full rounded-full bg-white"
              animate={{ width: `${playedPct}%` }}
              transition={{ duration: 0 }}
            />
          </div>

          <AnimatePresence>
            {isHoveringBar && (
              <m.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.1 }}
                className="pointer-events-none absolute -top-6 isolate -translate-x-1/2 rounded border border-white/20 bg-black px-1.5 py-0.5 text-sm"
                style={{ left: `${hoverPct}%` }}
              >
                {formatTime(hoverTime)}
              </m.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex shrink-0 flex-nowrap items-center text-lg">
          <div>{formatTime(currentTime)}</div>
          <div className="mr-1 ml-1.5 h-1 w-1 rounded-full bg-white/50"></div>
          <div className="opacity-50">{formatTime(duration)}</div>
        </div>
      </div>
    </div>
  );
}
