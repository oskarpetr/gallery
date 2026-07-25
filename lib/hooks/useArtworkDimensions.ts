// lib/useConstrainedArtworkSize.ts
"use client";

import { useState, useEffect } from "react";
import { IArtwork } from "@/types/Artwork";

function getAspectRatio(artwork: IArtwork) {
  return artwork.type === "video"
    ? artwork.aspectRatio
    : artwork.src.width / artwork.src.height;
}

function computeSize(aspectRatio: number) {
  const maxW = Math.min(window.innerWidth * 0.5, 1400);
  const maxH = Math.min(window.innerHeight * 0.9, 1400);

  let width = maxW;
  let height = width / aspectRatio;

  if (height > maxH) {
    height = maxH;
    width = height * aspectRatio;
  }

  return { width: Math.round(width), height: Math.round(height) };
}

export function useArtworkDimensions(artwork: IArtwork) {
  const aspectRatio = getAspectRatio(artwork);
  const [size, setSize] = useState(() => computeSize(aspectRatio));

  useEffect(() => {
    const onResize = () => setSize(computeSize(aspectRatio));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [aspectRatio]);

  return size;
}
