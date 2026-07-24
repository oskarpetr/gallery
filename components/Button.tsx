import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface Props {
  text: string;
  onClick: () => void;
  icon: ReactNode;
  active: boolean;
}

export default function Button({ text, onClick, icon, active }: Props) {
  return (
    <button
      className={cn(
        "rounded-lg px-4 py-1.5 flex items-center gap-1 transition cursor-pointer",
        active ? "bg-black text-white" : "bg-black/10 hover:bg-black/15",
      )}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}
