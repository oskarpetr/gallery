"use client";

import { IDisplayArtwork } from "@/types/Artwork";
import Image from "next/image";
import { m } from "framer-motion";
import { sharedTransition } from "@/lib/constants/animation";
import { useArtworkDimensions } from "@/lib/hooks/useArtworkDimensions";

const MotionImage = m.create(Image);

interface Props {
  artwork: IDisplayArtwork;
  onClose: () => void;
}

export default function ArtworkModal({ artwork, onClose }: Props) {
  const { width, height } = useArtworkDimensions(artwork.artwork);

  return (
    <m.div
      key="modal-root"
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      exit={{ opacity: 0 }}
    >
      <m.div
        className="absolute inset-0 bg-black/80 pointer-events-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={sharedTransition}
        onClick={onClose}
      />

      <m.div
        layoutId={`artwork-${artwork.index}`}
        style={{ width, height }}
        className="rounded-md relative pointer-events-auto shadow-2xl overflow-hidden z-50"
        transition={sharedTransition}
      >
        {artwork.artwork.type === "image" ? (
          <MotionImage
            src={artwork.artwork.src}
            alt={`Artwork ${artwork.displayIndex + 1}`}
            className="object-cover w-full h-full"
            sizes="70vw"
            quality={85}
            priority
            transition={sharedTransition}
          />
        ) : (
          <m.div className="w-full h-full">
            <m.video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              transition={sharedTransition}
            >
              <source src={artwork.artwork.src} type="video/mp4" />
            </m.video>
          </m.div>
        )}
      </m.div>
    </m.div>
  );
}
