import { MotionValue, useSpring, useTransform, m } from "framer-motion";

interface Props {
  progress: MotionValue<number>;
}

export default function ScrollIndicator({ progress }: Props) {
  const smoothProgress = useSpring(progress, {
    stiffness: 200,
    damping: 20,
    mass: 0.5,
    restDelta: 0.001,
  });

  const topMain = useTransform(smoothProgress, (v) => `${(v % 1) * 100}%`);
  const topGhost = useTransform(
    smoothProgress,
    (v) => `${((v % 1) - 1) * 100}%`,
  );

  //   const percentage = useTransform(
  //     smoothProgress,
  //     (v) => `${((v % 1) * 100).toFixed(0)}%`,
  //   );

  return (
    <div className="fixed right-6 bottom-6 flex h-64 gap-2 rounded-[18px] border-2 border-black/10 bg-black p-3 shadow-2xl">
      <div className="relative h-full w-3 overflow-hidden rounded-full bg-white/20">
        <m.div
          className="absolute h-12 w-3 rounded-full bg-white"
          style={{ top: topMain }}
        ></m.div>
        <m.div
          className="absolute h-12 w-3 rounded-full bg-white"
          style={{ top: topGhost }}
        ></m.div>
      </div>
      {/* <m.div
        className="absolute text-xs px-2 py-1 w-fit bg-neutral-300 rounded-full right-12 mt-5.5 left-1/2 -translate-x-1/2"
        style={{ top: topMain }}
      >
        {percentage}
      </m.div> */}
    </div>
  );
}
