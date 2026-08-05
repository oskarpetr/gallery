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
import artwork17 from "@/public/artworks/static.webp";
import artwork18 from "@/public/artworks/chladni.webp";

const unsortedArtworks: IArtwork[] = [
  {
    type: "image",
    src: artwork16,
    title: "Sal—va—tion",
    description: "",
    date: new Date("2026-06-29"),
  },
  {
    type: "image",
    src: artwork17,
    title: "Static",
    description: "",
    date: new Date("2026-06-27"),
  },
  {
    type: "image",
    src: artwork15,
    title: "Art demands yourself",
    description: "",
    date: new Date("2026-05-20"),
  },
  {
    type: "image",
    src: artwork10,
    title: "Blue",
    description: "",
    date: new Date("2026-05-05"),
  },
  {
    type: "image",
    src: artwork8,
    title: "Not giving up",
    description: "",
    date: new Date("2026-04-08"),
  },
  {
    type: "video",
    src: "/artworks/circles.mp4",
    title: "Circles in motion",
    description: "",
    aspectRatio: 1 / 1,
    date: new Date("2026-03-25"),
  },
  {
    type: "image",
    src: artwork18,
    title: "Chladni pattern",
    description:
      "Chladni patterns help us understand how sound propagates in waves through specific media. This artwork showcases a slightly customised Chladni pattern with the parameters n = 14 and m = 15.",
    date: new Date("2026-03-21"),
  },
  {
    type: "image",
    src: artwork5,
    title: "Seznamovák FIT",
    description: "",
    date: new Date("2026-03-19"),
  },
  {
    type: "image",
    src: artwork2,
    title: "What's next?",
    description: "",
    date: new Date("2026-03-10"),
  },
  {
    type: "video",
    src: "/artworks/toruses.mp4",
    title: "Toruses",
    description: "",
    aspectRatio: 1 / 1,
    date: new Date("2026-02-15"),
  },
  {
    type: "image",
    src: artwork3,
    title: "Business card",
    description:
      "It's quite sad that business cards aren't used as much as they used to be. Who doesn't need one? Bring business cards back!",
    needsBorder: true,
    date: new Date("2026-02-08"),
  },
  {
    type: "image",
    src: artwork4,
    title: "98% percent",
    description: "",
    date: new Date("2026-02-07"),
  },
  {
    type: "image",
    src: artwork7,
    title: "Adobe's expensive",
    description: "",
    date: new Date("2026-02-06"),
  },
  {
    type: "image",
    src: artwork14,
    title: "Stickers",
    description: "",
    date: new Date("2026-01-31"),
  },
  {
    type: "image",
    src: artwork13,
    title: "Not conformed",
    description: "",
    date: new Date("2026-01-28"),
  },
  {
    type: "image",
    src: artwork9,
    title: "Est.2005",
    description: "",
    date: new Date("2026-01-27"),
  },
  {
    type: "image",
    src: artwork6,
    title: "Seriously",
    description: "",
    date: new Date("2026-01-26"),
  },
  {
    type: "image",
    src: artwork1,
    title: "Soul—still",
    description: "",
    date: new Date("2025-07-10"),
  },
];

export const allArtworks = unsortedArtworks.sort(
  (a, b) => b.date.getTime() - a.date.getTime(),
);
