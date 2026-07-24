"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { ComponentProps, Fragment } from "react";

interface Props {
  text: string;
  className?: ComponentProps<"div">["className"];
}

export default function RotatingText({ text, className }: Props) {
  const words = text.split(" ");

  return (
    <div className="transform-3d perspective-distant">
      {words.map((word, wordIndex) => (
        <Fragment key={wordIndex}>
          <motion.span
            initial={{ rotateX: -90, opacity: 0, translateY: "100%" }}
            animate={{ rotateX: 0, opacity: 1, translateY: 0 }}
            transition={{
              delay: wordIndex * 0.03,
              type: "spring",
              damping: 10,
              stiffness: 100,
              mass: 0.5,
            }}
            className={cn("inline-block", className)}
          >
            {word}
          </motion.span>
          {wordIndex !== words.length - 1 && " "}
          {/* {wordIndex !== words.length - 1 && (
            <span className="w-1 h-1 inline-block"></span>
          )} */}
        </Fragment>
      ))}
    </div>
  );
}
