import { IDisplayArtwork } from "@/types/Artwork";
import Image from "next/image";
import { m } from "framer-motion";
import { sharedTransition } from "@/lib/constants/animation";
import { useArtworkDimensions } from "@/lib/hooks/useArtworkDimensions";
import ArtworkSidebar from "./ArtworkSidebar";

interface Props {
  item: IDisplayArtwork;
  onClose: () => void;
}

export default function ArtworkModal({ item, onClose }: Props) {
  const { width, height } = useArtworkDimensions(item.artwork);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <m.div
        className="absolute inset-0 bg-black/80 pointer-events-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={sharedTransition}
        onClick={onClose}
      />

      <div className="flex">
        <div className="flex items-center justify-center w-full">
          <m.div
            layoutId={`artwork-${item.index}`}
            style={{ width, height }}
            className="relative z-10 pointer-events-auto shadow-2xl"
            transition={sharedTransition}
          >
            {item.artwork.type === "image" ? (
              <Image
                src={item.artwork.src}
                alt={`Artwork ${item.displayIndex + 1}`}
                className="object-cover w-full h-full"
                sizes="70vw"
                quality={85}
                placeholder="blur"
                priority
              />
            ) : (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={item.artwork.src} type="video/mp4" />
              </video>
            )}
          </m.div>
        </div>

        <ArtworkSidebar item={item} onClose={onClose} />
      </div>
    </div>
  );
}
