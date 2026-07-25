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
import artwork16 from "@/public/artworks/salvation.webp";

const unsortedArtworks: IArtwork[] = [
  {
    type: "image",
    src: artwork16,
    description: "Salvation",
    date: new Date("2026-06-29"),
  },
  {
    type: "image",
    src: artwork15,
    description: "Art demands yourself",
    date: new Date("2026-05-20"),
  },
  {
    type: "image",
    src: artwork10,
    description: "哭泣",
    needsBorder: true,
    date: new Date("2026-05-05"),
  },
  {
    type: "image",
    src: artwork8,
    description: "Not giving up",
    date: new Date("2026-04-08"),
  },
  {
    type: "video",
    src: "/artworks/circles.mp4",
    description: "Circles",
    aspectRatio: 1 / 1,
    date: new Date("2026-03-25"),
  },
  {
    type: "image",
    src: artwork5,
    description: "Seznamovák",
    date: new Date("2026-03-19"),
  },
  {
    type: "image",
    src: artwork2,
    description: "What's next?",
    date: new Date("2026-03-10"),
  },
  {
    type: "video",
    src: "/artworks/toruses.mp4",
    description: "Toruses",
    aspectRatio: 1 / 1,
    date: new Date("2026-02-15"),
  },
  {
    type: "image",
    src: artwork3,
    description: "Business card",
    needsBorder: true,
    date: new Date("2026-02-08"),
  },
  {
    type: "image",
    src: artwork4,
    description: "Percentages",
    date: new Date("2026-02-07"),
  },
  {
    type: "image",
    src: artwork7,
    description: "Adobe's expensive",
    date: new Date("2026-02-06"),
  },
  {
    type: "image",
    src: artwork14,
    description: "Stickers",
    date: new Date("2026-01-31"),
  },
  {
    type: "image",
    src: artwork13,
    description: "Not conformed",
    date: new Date("2026-01-28"),
  },
  {
    type: "image",
    src: artwork9,
    description: "Est. 2005",
    date: new Date("2026-01-27"),
  },
  {
    type: "image",
    src: artwork6,
    description: "Seriously",
    date: new Date("2026-01-26"),
  },
  {
    type: "image",
    src: artwork1,
    description: "Stillness",
    date: new Date("2025-07-10"),
  },
];

export const allArtworks = unsortedArtworks.sort(
  (a, b) => b.date.getTime() - a.date.getTime(),
);
