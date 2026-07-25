"use client";

import { useState } from "react";
import ArtworksFlow from "./ArtworksFlow";
import { InfinityIcon, RowsIcon } from "@phosphor-icons/react";
import Button from "./Button";
import ArtworksGrid from "./ArtworksGrid";

export default function Artworks() {
  const [type, setType] = useState<"flow" | "grid">("flow");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-1.5">
        <Button
          text="Flow"
          onClick={() => setType("flow")}
          icon={<InfinityIcon size={20} weight="bold" />}
          color={type === "flow" ? "black" : "gray"}
        />
        <Button
          text="Grid"
          onClick={() => setType("grid")}
          icon={<RowsIcon weight="fill" size={20} />}
          color={type === "grid" ? "black" : "gray"}
        />
      </div>

      {type === "flow" ? <ArtworksFlow /> : <ArtworksGrid />}
    </div>
  );
}
