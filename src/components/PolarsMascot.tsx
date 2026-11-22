import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export type MascotMood = 'wave' | 'idle' | 'celebrate';
export type SpeechBubblePosition = 'right' | 'top';

const CHEER_MESSAGES: string[] = [
  'สู้ๆ นะ เด็ก ม.5 เขียน Polars ไม่ยากอย่างที่คิด',
  'จำชื่อพารามิเตอร์ไม่ได้ไม่เป็นไร กดดูในนี้ได้ตลอดเลย',
  'ลองกดรันดูหลายๆ รอบได้เลย ยิ่งเห็นภาพยิ่งจำแม่นนะ',
  'ผิดพลาดนิดหน่อยไม่เป็นไร โปรแกรมเมอร์เก่งๆ ก็เริ่มจากลองผิดลองถูกทั้งนั้น',
  'ฝึกวันละนิด เดี๋ยวจัดการตารางข้อมูลใหญ่ๆ ได้สบายแน่นอน',
  'เก่งมากที่แวะมาทบทวน ถ้าสงสัยคำสั่งไหนลองค้นหาดูได้เลยนะ',
];

interface PolarsMascotProps {
  mood?: MascotMood;
  size?: number;
  className?: string;
  celebrateKey?: number;
  speechText?: string;
  bubblePosition?: SpeechBubblePosition;
  enableCheer?: boolean;
}

export function PolarsMascot({
  mood = 'idle',
  size = 132,
  className = '',
  celebrateKey = 0,
  speechText,
  bubblePosition = 'right',
  enableCheer = false,
}: PolarsMascotProps) {
  const uid = useId().replace(/:/g, '');
  const haloId = `polars-${uid}-halo`;
  const furId = `polars-${uid}-fur`;
  const scarfId = `polars-${uid}-scarf`;
  const tabletId = `polars-${uid}-tablet`;

  const [cheerOverride, setCheerOverride] = useState<string | null>(null);
  const [cheerIndex, setCheerIndex] = useState(0);
  const [hopKey, setHopKey] = useState(0);
  const [isCheering, setIsCheering] = useState(false);
  const cheerTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setCheerOverride(null);
  }, [speechText, celebrateKey]);

  useEffect(() => {
    return () => {
      if (cheerTimerRef.current !== null) {
        window.clearTimeout(cheerTimerRef.current);
      }
    };
  }, []);

  const handleMascotClick = () => {
    if (!enableCheer) return;

    const nextMessage = CHEER_MESSAGES[cheerIndex % CHEER_MESSAGES.length];
    setCheerIndex((prev) => prev + 1);
    setCheerOverride(nextMessage);
    setHopKey((prev) => prev + 1);
    setIsCheering(true);

    if (cheerTimerRef.current !== null) {
      window.clearTimeout(cheerTimerRef.current);
    }
    cheerTimerRef.current = window.setTimeout(() => {
      setIsCheering(false);
    }, 1500);
  };

  const activeMessage = cheerOverride ?? speechText;
  const isWaving = mood === 'wave' || isCheering;
  const isCelebrating = mood === 'celebrate' && !isCheering;

  const animationKey = isCheering
    ? `cheer-${hopKey}`
    : isCelebrating
      ? `celebrate-${celebrateKey}`
      : 'mascot-idle';

  const bearGraphic = (
    <motion.div
      key={animationKey}
      initial={false}
      animate={
        isCheering
          ? {
              y: [0, -11, 0, -5, 0],
              scale: [1, 1.05, 0.98, 1.02, 1],
              rotate: [0, -3, 3, 0],
            }
          : isCelebrating
            ? {
                y: [0, -14, 0, -7, 0],
                scale: [1, 1.07, 0.97, 1.03, 1],
                rotate: [0, -4, 4, -2, 0],
              }
            : {
                y: [0, -5, 0],
                scale: 1,
                rotate: 0,
              }
      }
      transition={
        isCheering
          ? {
              duration: 0.72,
              ease: 'easeOut',
            }
          : isCelebrating
            ? {
                duration: 0.85,
                ease: 'easeOut',
              }
            : {
                duration: 3.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }
      }
      className="relative inline-flex shrink-0 select-none items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={haloId} cx="50%" cy="48%" r="50%">
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.95" />
            <stop offset="72%" stopColor="#F0F7FF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          <linearGradient
            id={furId}
            x1="90"
            y1="30"
            x2="90"
            y2="162"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="78%" stopColor="#F8FBFF" />
            <stop offset="100%" stopColor="#E6F2FE" />
          </linearGradient>

          <linearGradient
            id={scarfId}
            x1="46"
            y1="108"
            x2="134"
            y2="130"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="55%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>

          <linearGradient
            id={tabletId}
            x1="62"
            y1="122"
            x2="118"
            y2="158"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>

        {/* Soft luminous ice-blue backdrop halo */}
        <circle cx="90" cy="92" r="78" fill={`url(#${haloId})`} />

        {/* Celebratory geometric sparkles (pure SVG shapes, zero icons/emojis) */}
        {(isCelebrating || isCheering) && (
          <g>
            <motion.circle
              cx="30"
              cy="48"
              r="4.5"
              fill="#38BDF8"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.25, 0.9], opacity: [0, 1, 0.85] }}
              transition={{ duration: 0.55, delay: 0.05 }}
            />
            <motion.rect
              x="144"
              y="38"
              width="8"
              height="8"
              rx="2"
              transform="rotate(45 148 42)"
              fill="#2563EB"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 0.9], opacity: [0, 1, 0.85] }}
              transition={{ duration: 0.55, delay: 0.12 }}
            />
            <motion.circle
              cx="154"
              cy="76"
              r="3.5"
              fill="#0284C7"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.3, 0.9], opacity: [0, 1, 0.8] }}
              transition={{ duration: 0.5, delay: 0.18 }}
            />
            <motion.rect
              x="24"
              y="82"
              width="6.5"
              height="6.5"
              rx="1.5"
              transform="rotate(45 27.25 85.25)"
              fill="#0EA5E9"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 0.85], opacity: [0, 1, 0.8] }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
          </g>
        )}

        {/* Ground reflection shadow */}
        <ellipse cx="90" cy="160" rx="44" ry="7.5" fill="#BAE6FD" fillOpacity="0.45" />

        {/* Ears */}
        <circle cx="53" cy="49" r="15" fill={`url(#${furId})`} stroke="#93C5FD" strokeWidth="2.4" />
        <circle cx="53" cy="49" r="8" fill="#E0F2FE" />
        <circle cx="127" cy="49" r="15" fill={`url(#${furId})`} stroke="#93C5FD" strokeWidth="2.4" />
        <circle cx="127" cy="49" r="8" fill="#E0F2FE" />

        {/* Torso / Body */}
        <motion.g
          animate={{ scaleY: [1, 1.018, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: '90px', originY: '155px' }}
        >
          <path
            d="M46 138C46 113 64 103 90 103C116 103 134 113 134 138C134 152 121 158 90 158C59 158 46 152 46 138Z"
            fill={`url(#${furId})`}
            stroke="#93C5FD"
            strokeWidth="2.4"
          />
          <ellipse cx="90" cy="137" rx="26" ry="16" fill="#F0F7FF" />
        </motion.g>

        {/* Waving Right Paw (viewer's right) */}
        {isWaving ? (
          <motion.g
            animate={{ rotate: [0, 15, -8, 15, 0] }}
            transition={{
              duration: isCheering ? 1.1 : 1.9,
              repeat: isCheering ? 1 : Infinity,
              repeatDelay: isCheering ? 0 : 0.8,
              ease: 'easeInOut',
            }}
            style={{ originX: '126px', originY: '118px' }}
          >
            <path
              d="M124 118C136 108 148 94 146 82C144 73 133 74 127 83C122 90 119 102 117 110"
              fill={`url(#${furId})`}
              stroke="#93C5FD"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <ellipse cx="139" cy="83" rx="4" ry="3" fill="#BAE6FD" />
            <circle cx="134" cy="79" r="1.6" fill="#BAE6FD" />
            <circle cx="139" cy="77.5" r="1.6" fill="#BAE6FD" />
            <circle cx="143.5" cy="80" r="1.5" fill="#BAE6FD" />
          </motion.g>
        ) : (
          <ellipse
            cx="126"
            cy="136"
            rx="12"
            ry="10"
            transform="rotate(-18 126 136)"
            fill={`url(#${furId})`}
            stroke="#93C5FD"
            strokeWidth="2.4"
          />
        )}

        {/* Head */}
        <ellipse
          cx="90"
          cy="78"
          rx="45"
          ry="37"
          fill={`url(#${furId})`}
          stroke="#93C5FD"
          strokeWidth="2.4"
        />

        {/* Soft ice-blue blush cheeks */}
        <ellipse cx="61" cy="86" rx="7.5" ry="4.5" fill="#BAE6FD" fillOpacity="0.65" />
        <ellipse cx="119" cy="86" rx="7.5" ry="4.5" fill="#BAE6FD" fillOpacity="0.65" />

        {/* Eyes */}
        {isCelebrating || isCheering ? (
          <g stroke="#0F172A" strokeWidth="3.2" strokeLinecap="round" fill="none">
            <path d="M67 76C69.5 70.5 76.5 70.5 79 76" />
            <path d="M101 76C103.5 70.5 110.5 70.5 113 76" />
          </g>
        ) : (
          <motion.g
            animate={{ scaleY: [1, 1, 0.08, 1, 1] }}
            transition={{
              duration: 4.2,
              times: [0, 0.88, 0.92, 0.96, 1],
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ originX: '90px', originY: '75px' }}
          >
            <circle cx="73" cy="75" r="5" fill="#0F172A" />
            <circle cx="74.8" cy="73.2" r="1.8" fill="#FFFFFF" />
            <circle cx="107" cy="75" r="5" fill="#0F172A" />
            <circle cx="108.8" cy="73.2" r="1.8" fill="#FFFFFF" />
          </motion.g>
        )}

        {/* Snout, Nose & Friendly Smile */}
        <ellipse cx="90" cy="89" rx="16.5" ry="12.5" fill="#F0F7FF" />
        <path
          d="M84.5 84.5C84.5 82.6 86.7 81.5 90 81.5C93.3 81.5 95.5 82.6 95.5 84.5C95.5 86.7 92.6 89.2 90 89.2C87.4 89.2 84.5 86.7 84.5 84.5Z"
          fill="#0F172A"
        />
        <ellipse cx="88.3" cy="83.6" rx="1.8" ry="0.9" fill="#FFFFFF" fillOpacity="0.7" />
        <path
          d="M90 89.2V92.4M84 93.2C86.2 96 93.8 96 96 93.2"
          stroke="#0F172A"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Sky-Blue Scarf */}
        <path
          d="M54 106C65 113 115 113 126 106C129 109 129 116 124 119C112 125 68 125 56 119C51 116 51 109 54 106Z"
          fill={`url(#${scarfId})`}
        />
        <path
          d="M62 117L57 137C56.5 139.5 58.3 141.5 60.8 141.5H70.5C72.7 141.5 74.4 139.6 74.1 137.4L72 119Z"
          fill="#0284C7"
        />
        <path d="M60.2 132.5H73.2" stroke="#BAE6FD" strokeWidth="2.6" strokeLinecap="round" />

        {/* Mini DataFrame Tablet */}
        <g transform={isWaving ? 'translate(-8, 2)' : 'translate(0, 0)'}>
          <rect x="64" y="124" width="52" height="32" rx="7" fill={`url(#${tabletId})`} />
          <rect x="68" y="128" width="44" height="24" rx="4" fill="#FFFFFF" />
          <rect x="71" y="131" width="38" height="5" rx="1.5" fill="#E0F2FE" />
          <rect x="71" y="138.5" width="16" height="3.2" rx="1.2" fill="#38BDF8" />
          <rect x="90" y="138.5" width="19" height="3.2" rx="1.2" fill="#93C5FD" />
          <rect x="71" y="144.5" width="22" height="3.2" rx="1.2" fill="#0284C7" />
          <rect x="96" y="144.5" width="13" height="3.2" rx="1.2" fill="#BAE6FD" />
        </g>

        {/* Left Paw */}
        <ellipse
          cx={isWaving ? 53 : 58}
          cy="138"
          rx="11.5"
          ry="9.5"
          transform={`rotate(18 ${isWaving ? 53 : 58} 138)`}
          fill={`url(#${furId})`}
          stroke="#93C5FD"
          strokeWidth="2.4"
        />
      </svg>
    </motion.div>
  );

  const mascotElement = enableCheer ? (
    <motion.button
      type="button"
      onClick={handleMascotClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      title="คลิกที่หมี Polars เพื่อรับกำลังใจ"
      aria-label="คลิกที่หมี Polars เพื่อรับกำลังใจ"
      className="cursor-pointer rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
    >
      {bearGraphic}
    </motion.button>
  ) : (
    bearGraphic
  );

  if (!activeMessage) {
    return <div className={`inline-flex items-center justify-center ${className}`}>{mascotElement}</div>;
  }

  const speechBubble = (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeMessage}
        initial={{ opacity: 0, scale: 0.92, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: -4 }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
        className="relative max-w-[280px] rounded-2xl border border-sky-200 bg-white px-4 py-3 text-left shadow-md shadow-sky-900/5"
      >
        {/* Pure CSS pointer tail aimed at the Polar Bear */}
        {bubblePosition === 'right' ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 -left-[7px] h-3 w-3 -translate-y-1/2 rotate-45 border-b border-l border-sky-200 bg-white"
          />
        ) : (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-r border-b border-sky-200 bg-white"
          />
        )}
        <p className="relative z-10 text-sm leading-relaxed text-slate-700">
          {activeMessage}
        </p>
      </motion.div>
    </AnimatePresence>
  );

  if (bubblePosition === 'top') {
    return (
      <div className={`inline-flex flex-col items-center gap-3 ${className}`}>
        {speechBubble}
        {mascotElement}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {mascotElement}
      <div className="min-w-0 flex-1">{speechBubble}</div>
    </div>
  );
}
