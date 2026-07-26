"use client";

import { cn } from "@/lib/utils/cn";
import { m } from "framer-motion";
import { ComponentProps, Fragment } from "react";

interface Props {
  text: string;
  delay?: number;
  className?: ComponentProps<"div">["className"];
}

export default function RotatingText({ text, delay = 0, className }: Props) {
  const words = text.split(" ");

  return (
    <div className="transform-3d perspective-distant">
      {words.map((word, wordIndex) => (
        <Fragment key={wordIndex}>
          <m.span
            initial={{ rotateX: -90, opacity: 0, translateY: "100%" }}
            animate={{ rotateX: 0, opacity: 1, translateY: 0 }}
            transition={{
              delay: wordIndex * 0.01 + delay,
              type: "spring",
              damping: 10,
              stiffness: 100,
              mass: 0.5,
            }}
            className={cn("inline-block", className)}
          >
            {word}
          </m.span>
          {wordIndex !== words.length - 1 && " "}
        </Fragment>
      ))}
    </div>
  );
}
