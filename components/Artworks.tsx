"use client";

import { IArtwork } from "@/types/Artwork";
import artwork1 from "@/public/artworks/stillness.webp";
import artwork2 from "@/public/artworks/whats-next.webp";
import artwork3 from "@/public/artworks/business-card.webp";
import artwork4 from "@/public/artworks/percentages.webp";
import artwork5 from "@/public/artworks/seznamovak.webp";
import artwork6 from "@/public/artworks/seriously.webp";
import artwork7 from "@/public/artworks/adobes-expensive.webp";
import artwork8 from "@/public/artworks/not-giving-up.webp";
import artwork9 from "@/public/artworks/est.webp";
import artwork10 from "@/public/artworks/crying.webp";
import artwork13 from "@/public/artworks/not-conformed.webp";
import artwork14 from "@/public/artworks/stickers.webp";
import artwork15 from "@/public/artworks/art-demands.webp";
import { useState } from "react";
import ArtworksFlow from "./ArtworksFlow";
import { InfinityIcon, RowsIcon } from "@phosphor-icons/react";
import Button from "./Button";
import ArtworksGrid from "./ArtworksGrid";

export const allArtworks: IArtwork[] = [
  { src: artwork1, description: "Stillness" },
  { src: artwork2, description: "What's next?" },
  { src: artwork3, description: "Business card", needsBorder: true },
  { src: artwork4, description: "Percentages" },
  { src: artwork5, description: "Seznamovák" },
  { src: artwork6, description: "Seriously" },
  { src: artwork7, description: "Adobe's Expensive" },
  { src: artwork8, description: "Not giving up" },
  { src: artwork9, description: "Est. 2005" },
  { src: artwork10, description: "哭泣", needsBorder: true },
  { src: "/artworks/toruses.mp4", description: "Toruses", isVideo: true },
  { src: "/artworks/circles.mp4", description: "Circles", isVideo: true },
  { src: artwork13, description: "Not conformed" },
  { src: artwork14, description: "Stickers" },
  { src: artwork15, description: "Art demands yourself" },
];

export default function Artworks() {
  const [type, setType] = useState<"flow" | "grid">("flow");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-1.5">
        <Button
          text="Flow"
          onClick={() => setType("flow")}
          icon={<InfinityIcon size={20} weight="bold" />}
          active={type === "flow"}
        />
        <Button
          text="Grid"
          onClick={() => setType("grid")}
          icon={<RowsIcon weight="fill" size={20} />}
          active={type === "grid"}
        />
      </div>

      {type === "flow" ? <ArtworksFlow /> : <ArtworksGrid />}
    </div>
  );
}
