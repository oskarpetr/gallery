"use client";

import { startTransition, useEffect, useMemo, useRef, useState } from "react";
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
import { IArtwork, IDisplayArtwork } from "@/types/Artwork";
import ArtworkItems from "./ArtworkItems";
import ScrollIndicator from "./ScrollIndicator";
import { useMotionValue } from "framer-motion";

const allArtworks: IArtwork[] = [
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
];

const BASE_COUNT = allArtworks.length;

export default function ArtworksGrid() {
  const [page, setPage] = useState(2);

  const artworksRef = useRef<HTMLDivElement>(null);
  const artworksEndRef = useRef<HTMLDivElement>(null);

  const scrollProgress = useMotionValue(0);

  const artworkItems: IDisplayArtwork[] = useMemo(
    () =>
      Array.from({ length: BASE_COUNT * page }, (_, index) => ({
        artwork: allArtworks[index % BASE_COUNT],
        displayIndex: index % BASE_COUNT,
        index,
      })),
    [page],
  );

  // useEffect(() => {
  //   if (lenis) {
  //     requestAnimationFrame(() => {
  //       lenis.resize();
  //     });
  //   }
  // }, [multiplier, lenis]);

  const handleScroll = () => {
    const artworksEl = artworksRef.current;
    if (!artworksEl || artworksEl.children.length === 0) return;

    const children = Array.from(artworksEl.children);
    const visibleIndex = children.findIndex(
      (child) => child.getBoundingClientRect().bottom > 0,
    );

    if (visibleIndex === -1) return;

    const visibleEl = children[visibleIndex] as HTMLElement;
    const rect = visibleEl.getBoundingClientRect();
    const gridColumns =
      getComputedStyle(artworksEl).gridTemplateColumns.split(" ").length;

    // Row visibility, value between 0-1
    const rowScrollRatio = Math.max(0, -rect.top) / rect.height;

    //
    const exactPosition = visibleIndex + rowScrollRatio * gridColumns;

    scrollProgress.set(exactPosition / BASE_COUNT);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startTransition(() => {
            setPage((prev) => prev + 1);
          });
        }
      },
      { rootMargin: "1000px" },
    );

    if (artworksEndRef.current) {
      observer.observe(artworksEndRef.current);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <ArtworkItems ref={artworksRef} artworks={artworkItems} />
      <div ref={artworksEndRef} className="h-1 w-full" aria-hidden="true" />

      <ScrollIndicator progress={scrollProgress} />
    </div>
  );
}
