"use client";

import { IDisplayArtwork } from "@/types/Artwork";
import Image from "next/image";
import { m } from "framer-motion";
import { sharedTransition } from "@/lib/constants/animation";
import { useArtworkDimensions } from "@/lib/hooks/useArtworkDimensions";
import Button from "./Button";
import { XIcon } from "@phosphor-icons/react";

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
        className="relative pointer-events-auto shadow-2xl overflow-hidden z-50"
        transition={sharedTransition}
      >
        {artwork.artwork.type === "image" ? (
          <Image
            src={artwork.artwork.src}
            alt={`Artwork ${artwork.displayIndex + 1}`}
            className="object-cover w-full h-full"
            sizes="70vw"
            quality={85}
            placeholder="blur"
            priority
          />
        ) : (
          <div className="w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={artwork.artwork.src} type="video/mp4" />
            </video>
          </div>
        )}
      </m.div>

      <m.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={sharedTransition}
        className="h-screen absolute flex flex-col gap-4 right-0 top-0 w-80 bg-white pointer-events-auto p-3 rounded-l-4xl"
      >
        <Button
          text="Close"
          icon={<XIcon weight="bold" />}
          color="black"
          onClick={onClose}
        />

        <h2 className="">{artwork.artwork.description}</h2>
      </m.div>
    </m.div>
  );
}
