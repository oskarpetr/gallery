import { sharedTransition } from "@/lib/constants/animation";
import { m } from "framer-motion";
import Button from "../ui/Button";
import { ArrowsInSimpleIcon } from "@phosphor-icons/react";
import { IDisplayArtwork } from "@/types/Artwork";
import RotatingText from "../animation/RotatingText";

interface Props {
  item: IDisplayArtwork;
  onClose: () => void;
}

export default function ArtworkSidebar({ item, onClose }: Props) {
  const desc =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

  return (
    <m.div
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      exit={{ x: "100%" }}
      transition={sharedTransition}
      className="h-screen relative flex flex-col gap-8 right-0 top-0 w-120 bg-white pointer-events-auto p-3 rounded-l-4xl"
    >
      <Button
        text="Collapse"
        icon={<ArrowsInSimpleIcon weight="bold" />}
        color="black"
        onClick={onClose}
      />

      <div className="flex flex-col gap-2">
        <h2>
          {String(item.displayIndex + 1).padStart(2, "0")}
          {" — "}
          {item.artwork.title}
        </h2>
        <div className="text-xl">
          <RotatingText text={desc || "No description yet..."} />
        </div>
      </div>

      <RotatingText
        text={`Artwork from ${item.artwork.date.toLocaleDateString()}`}
        delay={item.artwork.description.split(" ").length * 0.01}
      />
    </m.div>
  );
}
