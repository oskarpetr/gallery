"use client";

import { IDisplayArtwork } from "@/types/Artwork";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { sharedTransition } from "@/lib/constants/animation";
import ArtworkModal from "./ArtworkModal";
import Button from "../ui/Button";
import { BinocularsIcon } from "@phosphor-icons/react";

interface Props {
  item: IDisplayArtwork;
}

export default memo(function ArtworkItem({ item }: Props) {
  const [selected, setSelected] = useState(false);
  // const [hovered, setHovered] = useState(false);

  const [videoInView, setVideoInView] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (item.artwork.type === "image" || videoInView) return;

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
  }, [item.artwork.type, videoInView]);

  return (
    <div>
      <m.div
        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "none" }}
        transition={{
          delay: item.displayIndex * 0.02,
          ...sharedTransition,
        }}
        className="flex flex-col gap-2"
      >
        <div>
          <div>{String(item.displayIndex + 1).padStart(2, "0")}</div>
          <div className="-mt-1">{item.artwork.title}</div>
        </div>

        <m.div
          className="relative group cursor-pointer flex"
          onClick={() => setSelected(true)}
          // onMouseEnter={() => setHovered(true)}
          // onMouseLeave={() => setHovered(false)}
          // animate={{ rotateZ: hovered ? 1 : 0 }}
        >
          <div>
            <m.div
              layoutId={`artwork-${item.index}`}
              className={cn(
                "relative z-10 w-full overflow-hidden rounded-md",
                item.artwork.needsBorder ? "border-2 border-black/5" : "",
              )}
              transition={sharedTransition}
            >
              {item.artwork.type === "image" ? (
                <Image
                  src={item.artwork.src}
                  alt={`Artwork ${item.displayIndex + 1}`}
                  width={600}
                  height={600}
                  quality={50}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  priority={item.displayIndex < 4}
                  fetchPriority={item.displayIndex === 0 ? "high" : "auto"}
                  placeholder="blur"
                />
              ) : (
                <div ref={videoContainerRef}>
                  {videoInView && (
                    <video autoPlay loop muted playsInline preload="none">
                      <source src={item.artwork.src} type="video/mp4"></source>
                    </video>
                  )}
                </div>
              )}
            </m.div>
            <div className="absolute inset-0 bg-black/10 rounded-md"></div>
          </div>

          <div className="group-hover:opacity-100 flex transition opacity-0 absolute rounded-md bg-black/50 inset-0 pointer-events-none justify-center items-center z-20">
            <Button
              text="Explore"
              icon={<BinocularsIcon weight="fill" />}
              onClick={() => {}}
              color="white"
            />
          </div>
        </m.div>
      </m.div>

      <AnimatePresence>
        {selected && (
          <ArtworkModal item={item} onClose={() => setSelected(false)} />
        )}
      </AnimatePresence>
    </div>
  );
});
