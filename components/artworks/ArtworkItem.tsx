"use client";

import { IDisplayArtwork } from "@/types/Artwork";
import Image from "next/image";
import { m } from "framer-motion";
import {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils/cn";
import { sharedTransition } from "@/lib/constants/animation";
import Button from "../ui/Button";
import { BinocularsIcon } from "@phosphor-icons/react";

interface Props {
  item: IDisplayArtwork;
  setSelected: Dispatch<SetStateAction<number | null>>;
}

export default function ArtworkItem({ item, setSelected }: Props) {
  const [hovered, setHovered] = useState(false);

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
    <m.div
      initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, filter: "none" }}
      transition={{
        delay: item.displayIndex * 0.02,
        ...sharedTransition,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col gap-2"
    >
      <div className="flex items-baseline gap-1.5">
        <div className="flex items-center gap-[0.5px] font-bold opacity-50">
          {String(item.displayIndex + 1)
            .padStart(2, "0")
            .split("")
            .map((char, charIndex) =>
              char === "0" ? (
                <div
                  key={`${item.index}-${charIndex}`}
                  className="h-3 w-2.5 rounded-full bg-black"
                ></div>
              ) : (
                <div key={`${item.index}-${charIndex}`}>{char}</div>
              ),
            )}
        </div>
        {/* <div className="opacity-30">{" / "}</div> */}
        <h2 className="-mt-1">{item.artwork.title}</h2>
      </div>

      <m.div
        className="group relative flex cursor-pointer"
        onClick={() => setSelected(item.index)}
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
                quality={30}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                priority={item.displayIndex < 4}
                fetchPriority={item.displayIndex < 4 ? "high" : "auto"}
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
          <div className="absolute inset-0 rounded-md bg-black/10"></div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center rounded-md bg-black/30 opacity-0 transition group-hover:opacity-100">
          <m.div
            initial={{ y: 10 }}
            animate={hovered ? { y: 0 } : { y: 10 }}
            exit={{ y: 10 }}
          >
            <Button
              text="Explore"
              icon={<BinocularsIcon weight="fill" />}
              onClick={() => {}}
              color="white"
            />
          </m.div>
        </div>
      </m.div>
    </m.div>
  );
}
