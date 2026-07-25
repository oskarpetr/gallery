import { MotionValue, useSpring, useTransform, m } from "framer-motion";

interface Props {
  progress: MotionValue<number>;
}

export default function ScrollIndicator({ progress }: Props) {
  const smoothProgress = useSpring(progress, {
    stiffness: 400,
    damping: 40,
    mass: 0.2,
    restDelta: 0.0001,
  });

  const topMain = useTransform(smoothProgress, (v) => `${(v % 1) * 100}%`);
  const topGhost = useTransform(
    smoothProgress,
    (v) => `${((v % 1) - 1) * 100}%`,
  );

  return (
    <div className="fixed bottom-6 right-6 bg-black rounded-full h-64 p-3 shadow-2xl border-2 border-black/10">
      <div className="relative h-full w-3 bg-white/20 rounded-full overflow-hidden">
        <m.div
          className="absolute w-3 bg-white rounded-full h-12"
          style={{ top: topMain }}
        ></m.div>
        <m.div
          className="absolute w-3 bg-white rounded-full h-12"
          style={{ top: topGhost }}
        ></m.div>
      </div>
    </div>
  );
}
