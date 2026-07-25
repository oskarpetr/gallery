"use client";

import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { IDisplayArtwork } from "@/types/Artwork";
import ArtworkItems from "./ArtworkItems";
import ScrollIndicator from "./ScrollIndicator";
import { useMotionValue } from "framer-motion";
import { allArtworks } from "./Artworks";

export default function ArtworksFlow() {
  const [page, setPage] = useState(1);

  const artworksRef = useRef<HTMLDivElement>(null);
  const artworksEndRef = useRef<HTMLDivElement>(null);

  const scrollProgress = useMotionValue(0);

  const artworkItems: IDisplayArtwork[] = useMemo(
    () =>
      Array.from({ length: allArtworks.length * page }, (_, index) => ({
        artwork: allArtworks[index % allArtworks.length],
        displayIndex: index % allArtworks.length,
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
    const visibleRect = visibleEl.getBoundingClientRect();
    const gridColumns =
      getComputedStyle(artworksEl).gridTemplateColumns.split(" ").length;

    // Row visibility, value between 0-1
    const rowScrollRatio = Math.max(0, -visibleRect.top) / visibleRect.height;

    //
    const exactPosition = visibleIndex + rowScrollRatio * gridColumns;

    scrollProgress.set(exactPosition / allArtworks.length);
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
