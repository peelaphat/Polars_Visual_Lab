import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PolarsMascot } from './PolarsMascot';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/25 p-6 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl border border-sky-100 bg-white/90 p-8 text-center shadow-2xl shadow-sky-900/10 backdrop-blur-md"
          >
            {/* Animated Polars Bear Mascot */}
            <div className="flex justify-center">
              <PolarsMascot mood="wave" size={148} />
            </div>

            {/* Headline & Subtitle */}
            <div className="mt-4 space-y-2.5">
              <span className="inline-block rounded-full bg-sky-50 px-3.5 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200/80">
                Python Polars · ม.5
              </span>
              <h2
                id="welcome-modal-title"
                className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
              >
                ยินดีต้อนรับสู่ Polars Visual Lab
              </h2>
              <p className="mx-auto max-w-[44ch] text-base leading-relaxed text-slate-600">
                บทเรียนอินเทอร์แอกทีฟสำหรับเรียนรู้ Python Polars ระดับชั้น ม.5
              </p>
            </div>

            {/* Credits Card */}
            <div className="mt-7 rounded-2xl border border-sky-100 bg-[#F0F7FF] px-6 py-5 text-center">
              <div className="space-y-1.5 text-sm leading-relaxed text-slate-700">
                <p className="font-semibold text-sky-800">สร้างด้วย Gemini Neon</p>
                <p className="font-medium text-slate-800">
                  ผู้ Prompt : ครูพีลพัทร์ แก้วคง
                </p>
                <p className="text-slate-600">
                  สาขาเทคโนโลยี โรงเรียน มอ.วิทยานุสรณ์
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#0284C7] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:brightness-105 sm:w-auto"
              >
                เข้าสู่บทเรียน
              </motion.button>
              <span className="text-xs text-slate-400">
                กดปุ่ม ESC หรือคลิกพื้นหลังเพื่อปิดหน้าต่างนี้ได้เช่นกัน
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
