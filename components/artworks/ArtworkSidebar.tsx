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
      className="pointer-events-auto relative top-0 right-0 flex h-screen w-full flex-col gap-12 overflow-scroll rounded-t-4xl bg-white p-3 md:w-96 md:min-w-96 md:rounded-t-none md:rounded-l-4xl"
    >
      <Button
        text="Collapse"
        icon={<ArrowsInSimpleIcon weight="bold" />}
        color="black"
        onClick={onClose}
      />

      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-0 text-4xl font-bold opacity-50">
            {String(item.displayIndex + 1)
              .padStart(2, "0")
              .split("")
              .map((char, charIndex) =>
                char === "0" ? (
                  <div
                    key={`${item.index}-${charIndex}`}
                    className="h-6.5 w-5.5 rounded-full bg-black"
                  ></div>
                ) : (
                  <div key={`${item.index}-${charIndex}`}>{char}</div>
                ),
              )}
          </div>
          <h2 className="text-3xl">{item.artwork.title}</h2>
          {/* <div className="relative -mx-3 mt-3 h-1 w-[calc(100%+24px)] bg-black/20"></div> */}
        </div>

        {/* <div className="text- opacity-50">About artwork</div> */}

        <div className="text-xl">
          <RotatingText
            text={item.artwork.description || "No description yet..."}
          />
        </div>

        <RotatingText
          text={`Artwork from ${item.artwork.date.toLocaleDateString()}`}
          delay={item.artwork.description.split(" ").length * 0.01}
        />
      </div>

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
