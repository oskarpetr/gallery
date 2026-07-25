"use client";

import { IDisplayArtwork } from "@/types/Artwork";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { sharedTransition } from "@/lib/constants/animation";
import ArtworkModal from "./ArtworkModal";
import Button from "./Button";
import { BinocularsIcon } from "@phosphor-icons/react";

const MotionImage = m.create(Image);

interface Props {
  artwork: IDisplayArtwork;
}

export default memo(function ArtworkItem({ artwork }: Props) {
  const [selected, setSelected] = useState(false);

  const [videoInView, setVideoInView] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (artwork.artwork.type === "image" || videoInView) return;

    const el = videoContainerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVideoInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [artwork.artwork.type, videoInView]);

  return (
    <div>
      <m.div
        initial={{ opacity: 0, filter: "blur(5px)" }}
        animate={{ opacity: 1, filter: "none" }}
        transition={{
          delay: artwork.displayIndex * 0.02,
          ...sharedTransition,
        }}
        className="flex flex-col gap-2"
      >
        <div>
          <div>{String(artwork.displayIndex + 1).padStart(2, "0")}</div>
          <div className="opacity-70 -mt-1">{artwork.artwork.description}</div>
        </div>

        <div
          className="relative group cursor-pointer flex"
          onClick={() => setSelected(true)}
        >
          <div>
            <m.div
              layoutId={`artwork-${artwork.index}`}
              className={cn(
                "relative z-10 w-full overflow-hidden rounded-md",
                artwork.artwork.needsBorder ? "border-2 border-black/5" : "",
              )}
              transition={sharedTransition}
            >
              {artwork.artwork.type === "image" ? (
                <MotionImage
                  src={artwork.artwork.src}
                  alt={`Artwork ${artwork.displayIndex + 1}`}
                  className="w-full h-full"
                  width={600}
                  height={600}
                  quality={50}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  priority={artwork.displayIndex < 4}
                  fetchPriority={artwork.displayIndex === 0 ? "high" : "auto"}
                  placeholder="blur"
                />
              ) : (
                <m.div ref={videoContainerRef} className="w-full h-full">
                  {videoInView && (
                    <m.video
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="none"
                      className="w-full h-full"
                    >
                      <source
                        src={artwork.artwork.src}
                        type="video/mp4"
                      ></source>
                    </m.video>
                  )}
                </m.div>
              )}
            </m.div>
            <div className="absolute inset-0 bg-black/10 rounded-md"></div>
          </div>

          <div className="group-hover:opacity-100 flex transition opacity-0 absolute rounded-md bg-black/50 inset-0 pointer-events-none justify-center items-center z-20">
            <Button
              text="Expand"
              icon={<BinocularsIcon weight="fill" />}
              onClick={() => {}}
              color="white"
            />
          </div>
        </div>
      </m.div>

      <AnimatePresence>
        {selected && (
          <ArtworkModal artwork={artwork} onClose={() => setSelected(false)} />
        )}
      </AnimatePresence>
    </div>
  );
});
