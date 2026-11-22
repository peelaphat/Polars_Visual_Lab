import { motion } from 'framer-motion';

export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-white via-[#F0F7FF] to-[#E0F2FE]"
    >
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-sky-200/45 blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -45, 25, 0],
          y: [0, 35, -25, 0],
          scale: [1, 0.94, 1.06, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 -right-24 h-[32rem] w-[32rem] rounded-full bg-blue-200/35 blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-32 left-1/3 h-[26rem] w-[26rem] rounded-full bg-cyan-100/50 blur-3xl"
      />
    </div>
  );
}
