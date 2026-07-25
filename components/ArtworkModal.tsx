"use client";

import { IDisplayArtwork } from "@/types/Artwork";
import Image from "next/image";
import { m } from "framer-motion";
import { sharedTransition } from "@/lib/animation";

interface Props {
  artwork: IDisplayArtwork;
  onClose: () => void;
}

export default function ArtworkModal({ artwork, onClose }: Props) {
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
        className="w-auto h-auto max-h-[90vh] max-w-[90vw] rounded-md relative pointer-events-auto shadow-2xl overflow-hidden z-50"
        transition={sharedTransition}
      >
        {!artwork.artwork.isVideo ? (
          <Image
            src={artwork.artwork.src}
            alt={`Artwork ${artwork.displayIndex + 1}`}
            className="w-auto h-auto object-contain max-h-[90vh] max-w-[90vw]"
            width={1920}
            height={1080}
            quality={85}
            priority
          />
        ) : (
          <m.div className="w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-auto h-auto object-contain max-h-[90vh] max-w-[90vw]"
            >
              <source src={artwork.artwork.src} type="video/mp4"></source>
            </video>
          </m.div>
        )}
      </m.div>
    </m.div>
  );
}
