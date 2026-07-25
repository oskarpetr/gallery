import { IDisplayArtwork } from "@/types/Artwork";
import ArtworkItems from "./ArtworkItems";
import { allArtworks } from "@/lib/artworks";

export default function ArtworksGrid() {
  const artworkItems: IDisplayArtwork[] = Array.from(
    { length: allArtworks.length },
    (_, index) => ({
      artwork: allArtworks[index % allArtworks.length],
      displayIndex: index % allArtworks.length,
      index,
    }),
  );

  return <ArtworkItems artworks={artworkItems} />;
}
