import { IDisplayArtwork } from "@/types/Artwork";
import ArtworkItem from "./ArtworkItem";
import { forwardRef } from "react";

interface Props {
  artworks: IDisplayArtwork[];
}

const ArtworkItems = forwardRef<HTMLDivElement, Props>(function Artworks(
  { artworks },
  ref,
) {
  return (
    <div
      ref={ref}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-x-3 gap-y-16"
    >
      {artworks.map((artwork, index) => (
        <ArtworkItem key={`artwork-${index}`} artwork={artwork} />
      ))}
    </div>
  );
});

export default ArtworkItems;
