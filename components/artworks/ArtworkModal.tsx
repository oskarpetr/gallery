import { IDisplayArtwork } from "@/types/Artwork";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { sharedTransition } from "@/lib/constants/animation";
import { useArtworkDimensions } from "@/lib/hooks/useArtworkDimensions";
import ArtworkSidebar from "./ArtworkSidebar";
import ArtworkVideo from "./ArtworkVideo";
import { useTransform3D } from "@/lib/hooks/useTransform3D";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import FadeIn from "../animation/FadeIn";

interface Props {
  item: IDisplayArtwork;
  onClose: () => void;
}

export default function ArtworkModal({ item, onClose }: Props) {
  const { width, height } = useArtworkDimensions(item.artwork);
  const { rotateX, rotateY, handle3DMove, handle3DLeave } = useTransform3D();

  const [transform3D, setTransform3D] = useState(item.artwork.type === "image");

  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <m.div
        className="pointer-events-auto absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={sharedTransition}
        onClick={onClose}
      />

      <div className="flex flex-col md:flex-row">
        <div className="relative flex w-full items-center justify-center p-12">
          <m.div
            layoutId={`artwork-${item.index}`}
            style={{ width, height }}
            className="pointer-events-auto relative z-10 perspective-distant transform-3d max-md:h-auto! max-md:w-full!"
            transition={sharedTransition}
            onMouseMove={transform3D ? handle3DMove : undefined}
            onMouseLeave={transform3D ? handle3DLeave : undefined}
          >
            {item.artwork.type === "image" ? (
              <m.div style={{ rotateX, rotateY }}>
                <Image
                  src={item.artwork.src}
                  alt={`Artwork ${item.displayIndex + 1}`}
                  className="h-full w-full rounded-lg object-cover"
                  sizes="70vw"
                  quality={85}
                  placeholder="blur"
                  priority
                />
              </m.div>
            ) : (
              <ArtworkVideo src={item.artwork.src} />
            )}
          </m.div>

          <FadeIn className="absolute bottom-6 left-6 hidden md:block">
            <button
              className={cn(
                "pointer-events-auto absolute bottom-0 left-0 flex cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-full px-4 py-2 whitespace-nowrap transition duration-400 ease-in-out disabled:cursor-not-allowed",
                transform3D ? "bg-white" : "bg-neutral-500 text-white",
              )}
              onClick={() => setTransform3D((prev) => !prev)}
              disabled={item.artwork.type === "video"}
            >
              <div className="z-10 tracking-tight">3D scene</div>
              {/* <CubeIcon className="z-10" size={20} weight="fill" /> */}
              {/* <div
              className={cn(
                "h-3 w-3 rounded-full",
                transform3D ? "bg-black" : "border border-white",
              )}
            ></div> */}
              <m.div
                animate={{ width: transform3D ? 0 : 100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute top-1.5 left-0 h-0.5 origin-top-left rotate-15 bg-neutral-400"
              ></m.div>
              <div
                className={cn(
                  "absolute h-4 w-18 rounded-full transition duration-400 ease-in-out",
                  transform3D ? "bg-white" : "bg-neutral-500",
                )}
              ></div>
            </button>
          </FadeIn>
        </div>

        <ArtworkSidebar item={item} onClose={onClose} />
      </div>
    </div>
  );
}
