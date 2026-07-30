import { sharedTransition } from "@/lib/constants/animation";
import { m } from "framer-motion";
import Button from "../ui/Button";
import { ArrowsInSimpleIcon } from "@phosphor-icons/react";
import { IDisplayArtwork } from "@/types/Artwork";
import RotatingText from "../animation/RotatingText";
import Tag from "../ui/Tag";

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
      className="pointer-events-auto relative top-0 right-0 flex h-screen w-full flex-col gap-8 overflow-scroll rounded-t-4xl bg-white p-3 md:w-96 md:min-w-96 md:rounded-t-none md:rounded-l-4xl"
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
        delay={desc.split(" ").length * 0.01}
      />

      {/* <div>
        <div className="text-xl">
          <RotatingText text="Poster" />
          <RotatingText text="Personal project" />
          <RotatingText text="Poster" />
        </div>
      </div>

      <div className="flex gap-1.5">
        <Tag text="2026" color="gray" />
        <Tag text="Poster" color="gray" />
      </div> */}
    </m.div>
  );
}
