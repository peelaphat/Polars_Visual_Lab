import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GuideModal({ isOpen, onClose }: GuideModalProps) {
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
  const steps = [
    {
      num: '01',
      title: 'ค้นหาคำสั่ง Polars ที่ต้องการ',
      desc: 'พิมพ์ชื่อคำสั่งภาษาอังกฤษ เช่น filter หรือพิมพ์คำค้นหาภาษาไทย เช่น กรอง หรือ ค่าว่าง ในช่องค้นหา หรือกดเลือกจากหมวดหมู่ด้านบน',
    },
    {
      num: '02',
      title: 'ดูประเภทคำสั่ง และกดรันดูภาพเคลื่อนไหว',
      desc: 'สังเกตป้ายกำกับ Method, Function หรือ Expression จากนั้นกดปุ่ม "รันคำสั่ง" เพื่อดูว่าตารางข้อมูลเปลี่ยนไปอย่างไรแบบทีละขั้น',
    },
    {
      num: '03',
      title: 'ทบทวน Python พื้นฐานได้ทุกเมื่อ',
      desc: 'ถ้ายังไม่คุ้นกับตัวแปร ฟังก์ชัน หรือพารามิเตอร์อย่าง *args สามารถสลับไปที่แท็บ "ทบทวน Python พื้นฐาน" ด้านบนได้เลย',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/25 p-6 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-3xl border border-sky-100 bg-white/95 p-8 shadow-2xl shadow-sky-900/10 backdrop-blur-md"
          >
            <div className="flex items-start justify-between gap-4 border-b border-sky-100 pb-5">
              <div>
                <span className="inline-block rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200/80">
                  ยินดีต้อนรับสู่ Polars Visual Lab
                </span>
                <h2 className="mt-3 text-2xl font-bold text-slate-900">
                  วิธีใช้งานเว็บเรียนรู้ Polars สำหรับ ม.5
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
              >
                ปิดหน้าต่าง
              </button>
            </div>

            <div className="mt-6 space-y-5">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="flex gap-4 rounded-2xl border border-sky-100/80 bg-sky-50/40 p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 font-mono text-xs font-semibold text-white">
                    {step.num}
                  </div>
                  <div className="max-w-[65ch]">
                    <h3 className="text-base font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini Visual Example */}
            <div className="mt-6 rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50/70 to-blue-50/50 p-5">
              <div className="text-xs font-semibold tracking-wide text-sky-700">
                ตัวอย่างการทำงานแบบเห็นภาพ
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs">
                <span className="rounded-lg border border-sky-200 bg-white px-3 py-1.5 text-slate-700">
                  ตาราง 5 แถว
                </span>
                <span className="text-sky-500">-&gt;</span>
                <span className="rounded-lg bg-blue-600 px-3 py-1.5 text-white">
                  df.filter(pl.col("score") &gt;= 80)
                </span>
                <span className="text-sky-500">-&gt;</span>
                <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-700">
                  เหลือ 3 แถวที่ผ่านเกณฑ์
                </span>
              </div>
            </div>

            <div className="mt-7 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-500/20 transition hover:brightness-105"
              >
                เริ่มเรียนรู้เลย
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
