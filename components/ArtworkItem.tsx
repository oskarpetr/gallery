"use client";

import { IDisplayArtwork } from "@/types/Artwork";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useState } from "react";
import { cn } from "@/utils/cn";

interface Props {
  artwork: IDisplayArtwork;
}

export default memo(function ArtworkItem({ artwork }: Props) {
  const [selected, setSelected] = useState(false);

  const sharedTransition = {
    type: "spring",
    damping: 15,
    stiffness: 120,
    mass: 0.5,
  } as const;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "none" }}
        transition={{
          delay: artwork.displayIndex * 0.02,
          ...sharedTransition,
        }}
        className="flex flex-col gap-2"
      >
        <div>
          <div>{String(artwork.displayIndex + 1).padStart(2, "0")}</div>
          <div className="opacity-50 -mt-1">{artwork.artwork.description}</div>
        </div>

        <button
          className="relative group cursor-pointer flex"
          onClick={() => setSelected(true)}
        >
          <div>
            <motion.div
              layoutId={`artwork-${artwork.index}`}
              className={cn(
                "relative z-10 overflow-hidden rounded-md aspect-auto",
                artwork.artwork.needsBorder ? "border-2 border-black/5" : "",
              )}
              transition={sharedTransition}
            >
              {!artwork.artwork.isVideo ? (
                <Image
                  src={artwork.artwork.src}
                  alt={`Artwork ${artwork.displayIndex + 1}`}
                  className="object-cover w-full h-full"
                />
              ) : (
                <motion.div className="w-full h-full">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={artwork.artwork.src} type="video/mp4"></source>
                  </video>
                </motion.div>
              )}
            </motion.div>
            <div className="absolute inset-0 bg-black/10 rounded-md"></div>
          </div>

          <div className="group-hover:opacity-100 flex transition opacity-0 absolute rounded-md bg-black/40 inset-0 pointer-events-none justify-center items-center z-20">
            <div className="bg-white rounded-full px-4 py-2 flex items-center gap-1">
              <div>Expand</div>
              <div className="bg-black w-4 h-4 rounded-full"></div>
            </div>
          </div>
        </button>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            key="modal-root"
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80 pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={sharedTransition}
              onClick={() => setSelected(false)}
            />

            <motion.div
              layoutId={`artwork-${artwork.index}`}
              className="w-auto h-auto max-h-[90vh] max-w-[90vw] rounded-md relative pointer-events-auto shadow-2xl overflow-hidden z-50"
              transition={sharedTransition}
            >
              {!artwork.artwork.isVideo ? (
                <Image
                  src={artwork.artwork.src}
                  alt={`Artwork ${artwork.displayIndex + 1}`}
                  className="w-auto h-auto object-contain max-h-[90vh] max-w-[90vw]"
                  priority
                />
              ) : (
                <motion.div className="w-full h-full">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-auto h-auto object-contain max-h-[90vh] max-w-[90vw]"
                  >
                    <source src={artwork.artwork.src} type="video/mp4"></source>
                  </video>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
