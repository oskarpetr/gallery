import { IDisplayArtwork } from "@/types/Artwork";
import ArtworkItem from "./ArtworkItem";
import { forwardRef, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ArtworkModal from "./ArtworkModal";

interface Props {
  artworks: IDisplayArtwork[];
}

const ArtworkItems = forwardRef<HTMLDivElement, Props>(function Artworks(
  { artworks },
  ref,
) {
  const [selected, setSelected] = useState<number | null>(null);
  const selectedItem = artworks.find((item) => item.index === selected);

  useEffect(() => {
    if (selected !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selected]);

  return (
    <div>
      <div
        ref={ref}
        className="grid grid-cols-2 gap-x-3 gap-y-16 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6"
      >
        {artworks.map((item) => (
          <ArtworkItem
            key={`artwork-${item.index}`}
            item={item}
            setSelected={setSelected}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && selectedItem && (
          <ArtworkModal
            key={`modal-${selected}`}
            item={selectedItem}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
});

export default ArtworkItems;
