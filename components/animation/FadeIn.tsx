"use client";

import { sharedTransition } from "@/lib/constants/animation";
import { m } from "framer-motion";
import { ComponentProps, memo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: ComponentProps<"div">["className"];
}

function FadeIn({ children, delay = 0, className }: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: "50%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "50%" }}
      transition={{
        delay,
        ...sharedTransition,
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export default memo(FadeIn);
