import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";

interface Props {
  text: string;
  onClick: () => void;
  icon: ReactNode;
  color: "black" | "gray" | "white";
}

export default function Button({ text, onClick, icon, color }: Props) {
  return (
    <button
      className={cn(
        "rounded-full w-fit px-4 py-2 flex items-center gap-1 transition cursor-pointer",
        color === "black"
          ? "bg-black text-white"
          : color === "gray"
            ? "bg-black/10 text-black/80 hover:bg-black/15"
            : "bg-white",
      )}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}
