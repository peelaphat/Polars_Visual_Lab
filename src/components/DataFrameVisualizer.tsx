import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { DataRow, VisualizerAnimationType } from '../types/polars';
import { PolarsMascot } from './PolarsMascot';

const DEFAULT_IDLE_TIP =
  "ลองกดปุ่ม 'รันคำสั่ง' ดูสิ เดี๋ยวตารางจะขยับให้ดูว่าคำสั่งนี้ทำงานยังไงนะ";

const RESET_MESSAGE =
  'รีเซ็ตตารางกลับมาเหมือนเดิมแล้ว ลองสังเกตอีกรอบได้เลยนะ';

const RUN_REACTION_BY_TYPE: Record<VisualizerAnimationType, string> = {
  filter_rows: 'เรียบร้อย! คัดเก็บไว้เฉพาะแถวที่ตรงเงื่อนไขแล้ว เก่งมาก',
  drop_nulls: 'ปัดกวาดค่า null ออกไปหมดแล้ว ตารางสะอาดพร้อมใช้งานเลย',
  add_column: 'เย้! เพิ่มคอลัมน์ใหม่เข้ามาทางขวาเรียบร้อยแล้ว',
  deduplicate: 'ยุบแถวที่ซ้ำกันให้เหลือแค่แถวเดียวแล้วนะ',
  sort_rows: 'จัดเรียงลำดับข้อมูลใหม่ให้ดูง่ายขึ้นแล้ว',
  transform_values: 'แปลงร่างข้อมูลในช่องเป้าหมายสำเร็จแล้ว!',
  select_col: 'เลือกดึงเฉพาะคอลัมน์เป้าหมายออกมาให้ดูชัดๆ แล้วนะ',
};

interface DataFrameVisualizerProps {
  commandId: string;
  datasetTitle: string;
  animationType: VisualizerAnimationType;
  columns: string[];
  initialRows: DataRow[];
  resultRows: DataRow[];
  highlightCol?: string;
  mascotTipTh?: string;
  isExecuted: boolean;
  onRun: () => void;
  onReset: () => void;
}

export function DataFrameVisualizer({
  commandId,
  datasetTitle,
  animationType,
  columns,
  initialRows,
  resultRows,
  highlightCol,
  mascotTipTh,
  isExecuted,
  onRun,
  onReset,
}: DataFrameVisualizerProps) {
  const [celebrateCount, setCelebrateCount] = useState(0);
  const [wasReset, setWasReset] = useState(false);

  useEffect(() => {
    setWasReset(false);
  }, [commandId]);

  const handleRunClick = () => {
    setWasReset(false);
    setCelebrateCount((prev) => prev + 1);
    onRun();
  };

  const handleResetClick = () => {
    setWasReset(true);
    onReset();
  };

  const mascotSpeech = isExecuted
    ? RUN_REACTION_BY_TYPE[animationType]
    : wasReset
      ? RESET_MESSAGE
      : (mascotTipTh ?? DEFAULT_IDLE_TIP);

  const resultColumns =
    resultRows.length > 0
      ? Object.keys(resultRows[0]).filter((k) => k !== 'id')
      : columns;

  const displayedColumns = isExecuted
    ? animationType === 'select_col' && highlightCol
      ? [highlightCol]
      : animationType === 'add_column'
        ? resultColumns
        : columns
    : columns;

  const displayedRows = isExecuted ? resultRows : initialRows;

  return (
    <div className="flex flex-col justify-between space-y-6 rounded-3xl border border-sky-100 bg-white/80 p-6 shadow-sm backdrop-blur-md md:p-8">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold tracking-wide text-sky-700">
              ตารางจำลองผลลัพธ์
            </span>
            <h2 className="mt-1 text-lg font-bold text-slate-900">
              {datasetTitle}
            </h2>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              isExecuted
                ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {isExecuted ? 'ผลลัพธ์หลังรันคำสั่ง' : 'ข้อมูลตั้งต้น'}
          </span>
        </div>

        {/* Mascot + Interactive Speech Bubble */}
        <div className="mt-5 rounded-2xl border border-sky-100/90 bg-[#F0F7FF]/85 px-4 py-3.5">
          <PolarsMascot
            mood={isExecuted ? 'celebrate' : 'idle'}
            size={76}
            celebrateKey={celebrateCount}
            speechText={mascotSpeech}
            bubblePosition="right"
            enableCheer
          />
        </div>

        {/* Animated Table */}
        <div className="mt-6 overflow-x-auto rounded-2xl border border-sky-100 bg-white">
          <table className="w-full border-collapse text-left font-mono text-sm">
            <thead>
              <tr className="border-b border-sky-100 bg-sky-50/70 text-xs font-semibold text-sky-900">
                {displayedColumns.map((col) => {
                  const isHighlighted =
                    isExecuted &&
                    ((animationType === 'select_col' && highlightCol === col) ||
                      (animationType === 'add_column' && !columns.includes(col)));
                  return (
                    <motion.th
                      key={col}
                      layoutId={`col-header-${col}`}
                      className={`px-4 py-3 transition-colors ${
                        isHighlighted ? 'bg-blue-100/80 text-blue-800' : ''
                      }`}
                    >
                      {col}
                    </motion.th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-50">
              <AnimatePresence mode="popLayout">
                {displayedRows.map((row) => (
                  <motion.tr
                    key={row.id}
                    layout
                    layoutId={`row-${row.id}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      x:
                        animationType === 'filter_rows' ||
                        animationType === 'drop_nulls' ||
                        animationType === 'deduplicate'
                          ? -24
                          : 0,
                      backgroundColor: '#FEF2F2',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 340,
                      damping: 28,
                    }}
                    className="bg-white transition-colors hover:bg-sky-50/40"
                  >
                    {displayedColumns.map((col) => {
                      const val = row[col];
                      const isNull = val === null || val === undefined;
                      const isTransformed =
                        isExecuted &&
                        (animationType === 'transform_values' ||
                          (animationType === 'add_column' && !columns.includes(col)));
                      return (
                        <td
                          key={col}
                          className={`px-4 py-3 ${
                            isNull
                              ? 'font-semibold text-rose-500'
                              : isTransformed
                                ? 'font-semibold text-blue-700'
                                : 'text-slate-700'
                          }`}
                        >
                          {isNull ? 'null' : String(val)}
                        </td>
                      );
                    })}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-sky-100 pt-5">
        <span className="text-xs text-slate-500">
          จำนวนแถวปัจจุบัน: {displayedRows.length} แถว
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetClick}
            disabled={!isExecuted}
            className="rounded-full border border-sky-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-45"
          >
            เริ่มใหม่
          </button>
          <button
            type="button"
            onClick={handleRunClick}
            disabled={isExecuted}
            className="rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-6 py-2 text-sm font-semibold text-white shadow-sm shadow-sky-500/20 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            รันคำสั่ง
          </button>
        </div>
      </div>
    </div>
  );
}
