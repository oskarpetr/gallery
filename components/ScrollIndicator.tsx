import { MotionValue, useSpring, useTransform, motion } from "framer-motion";

interface Props {
  progress: MotionValue<number>;
}

export default function ScrollIndicator({ progress }: Props) {
  const smoothProgress = useSpring(progress, {
    damping: 10,
    stiffness: 100,
    mass: 0.5,
  });

  const leftMain = useTransform(smoothProgress, (v) => `${(v % 1) * 100}%`);
  const leftGhost = useTransform(
    smoothProgress,
    (v) => `${((v % 1) - 1) * 100}%`,
  );

  return (
    <div className="fixed bottom-3 left-6 bg-white rounded-full w-96 p-4 shadow-2xl border border-black/10">
      <div className="relative w-full h-3 bg-black/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute h-3 bg-black rounded-full w-16"
          style={{ left: leftMain }}
        ></motion.div>
        <motion.div
          className="absolute h-3 bg-black rounded-full w-16"
          style={{ left: leftGhost }}
        ></motion.div>
      </div>
    </div>
  );
}
