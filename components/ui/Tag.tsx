import { cn } from "@/lib/utils/cn";

interface Props {
  text: string;
  color: "black" | "gray" | "white";
}

export default function Tag({ text, color }: Props) {
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-1 rounded-full px-3.5 py-1",
        color === "black"
          ? "bg-black text-white"
          : color === "gray"
            ? "bg-black/10"
            : "bg-white",
      )}
    >
      {text}
    </div>
  );
}
