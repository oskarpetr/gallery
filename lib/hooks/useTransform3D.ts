import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent } from "react";

export function useTransform3D() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [20, -20]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-20, 20]),
    springConfig,
  );

  const handle3DMove = (e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = (e.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handle3DLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, handle3DMove, handle3DLeave };
}
