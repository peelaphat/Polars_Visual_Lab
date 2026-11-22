import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PolarsMascot } from './PolarsMascot';

type VarTypeKey = 'int' | 'float' | 'str' | 'bool' | 'list';

const VAR_TYPES: Record<
  VarTypeKey,
  { label: string; exampleName: string; value: string; desc: string }
> = {
  int: {
    label: 'int (จำนวนเต็ม)',
    exampleName: 'score',
    value: '85',
    desc: 'ใช้เก็บตัวเลขที่ไม่มีทศนิยม เช่น คะแนนสอบ หรือจำนวนแก้วชานม',
  },
  float: {
    label: 'float (ทศนิยม)',
    exampleName: 'gpa',
    value: '3.75',
    desc: 'ใช้เก็บตัวเลขที่มีจุดทศนิยม เช่น เกรดเฉลี่ย หรือราคาสินค้า',
  },
  str: {
    label: 'str (ข้อความ)',
    exampleName: 'student_name',
    value: '"ต้นกล้า"',
    desc: 'ใช้เก็บตัวอักษรหรือข้อความ ต้องครอบด้วยเครื่องหมายคำพูด "..."',
  },
  bool: {
    label: 'bool (ตรรกะ)',
    exampleName: 'is_passed',
    value: 'True',
    desc: 'มีแค่ 2 ค่าคือ True (จริง) กับ False (เท็จ) ใช้บ่อยเวลาเช็กเงื่อนไขใน Polars',
  },
  list: {
    label: 'list (รายการ)',
    exampleName: 'rooms',
    value: '["5/1", "5/2", "5/3"]',
    desc: 'ใช้เก็บข้อมูลหลายๆ ค่าเรียงต่อกันในเครื่องหมายก้ามปู [...]',
  },
};

export function PythonBasicsView() {
  const [selectedVar, setSelectedVar] = useState<VarTypeKey>('int');
  const [opMode, setOpMode] = useState<'math' | 'compare'>('compare');
  const [testScore, setTestScore] = useState(85);
  const [fnMode, setFnMode] = useState<'function' | 'method'>('function');
  const [argMode, setArgMode] = useState<'pos' | 'kw' | 'args' | 'kwargs'>('pos');

  const currentVar = VAR_TYPES[selectedVar];

  return (
    <div className="space-y-8">
      <header className="flex flex-col justify-between gap-6 rounded-3xl border border-sky-100 bg-white/80 p-6 shadow-sm backdrop-blur-md md:flex-row md:items-center md:p-8">
        <div>
          <span className="inline-block rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
            Python Basics Refresher
          </span>
          <h1 className="mt-3 text-2xl font-bold text-slate-900">
            ทบทวน Python พื้นฐานสำหรับ ม.5
          </h1>
          <p className="mt-2 max-w-[65ch] text-base leading-relaxed text-slate-600">
            ปูพื้นฐาน 4 เรื่องสำคัญที่เจอบ่อยที่สุดเวลาเขียนคำสั่ง Polars กดเลือกดูตัวอย่างแบบโต้ตอบได้ในการ์ดแต่ละใบ
          </p>
        </div>
        <div className="shrink-0 rounded-2xl border border-sky-100/90 bg-[#F0F7FF]/85 px-4 py-3">
          <PolarsMascot
            mood="idle"
            size={84}
            speechText="พื้นฐานแน่น เขียน Polars สบายแน่นอน ค่อยๆ อ่านทีละหัวข้อนะ"
            bubblePosition="right"
            enableCheer
          />
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* 1. Variables */}
        <section className="flex flex-col justify-between rounded-3xl border border-sky-100 bg-white/80 p-6 shadow-sm backdrop-blur-md md:p-8">
          <div>
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 font-mono text-xs font-semibold text-blue-700">
                01 / Variables
              </span>
              <span className="text-xs font-medium text-slate-500">ตัวแปรและชนิดข้อมูล</span>
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">
              ตัวแปร (Variables)
            </h2>
            <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-slate-600">
              ตัวแปรเปรียบเหมือน "กล่องเก็บของ" ที่มีชื่อติดไว้ เพื่อเก็บข้อมูลชนิดต่างๆ นำไปใช้ต่อในโปรแกรม
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {(Object.keys(VAR_TYPES) as VarTypeKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedVar(key)}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-xs font-medium transition ${
                    selectedVar === key
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-sky-50 text-slate-600 ring-1 ring-sky-100 hover:bg-sky-100/70'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedVar}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/50 p-5"
            >
              <div className="text-xs font-semibold text-sky-700">
                {currentVar.label}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-sm">
                <span className="rounded-xl border border-sky-200 bg-white px-3 py-2 font-semibold text-blue-700">
                  {currentVar.exampleName}
                </span>
                <span className="text-slate-400">=</span>
                <span className="rounded-xl bg-slate-900 px-3.5 py-2 text-sky-200">
                  {currentVar.value}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {currentVar.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* 2. Operators */}
        <section className="flex flex-col justify-between rounded-3xl border border-sky-100 bg-white/80 p-6 shadow-sm backdrop-blur-md md:p-8">
          <div>
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 font-mono text-xs font-semibold text-blue-700">
                02 / Operators
              </span>
              <span className="text-xs font-medium text-slate-500">การดำเนินการ</span>
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">
              ตัวดำเนินการ (Operators)
            </h2>
            <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-slate-600">
              ใช้คำนวณตัวเลข (<code className="font-mono text-blue-700">+ - * /</code>) และใช้เปรียบเทียบเงื่อนไข (<code className="font-mono text-blue-700">== &gt;= &amp; |</code>) เวลาเขียนคำสั่งกรองข้อมูลใน Polars
            </p>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setOpMode('compare')}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                  opMode === 'compare'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-sky-50 text-slate-600 ring-1 ring-sky-100'
                }`}
              >
                เปรียบเทียบ &amp; ตรรกะ
              </button>
              <button
                type="button"
                onClick={() => setOpMode('math')}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                  opMode === 'math'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-sky-50 text-slate-600 ring-1 ring-sky-100'
                }`}
              >
                คำนวณคณิตศาสตร์
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/50 p-5">
            {opMode === 'compare' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                  <span>ลองปรับคะแนนสอบ (score):</span>
                  <span className="font-mono text-sm font-bold text-blue-700">
                    {testScore}
                  </span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={100}
                  value={testScore}
                  onChange={(e) => setTestScore(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-sky-100 bg-white p-3.5 font-mono text-xs">
                  <span className="text-slate-700">
                    pl.col("score") &gt;= 80
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 font-semibold ${
                      testScore >= 80
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-600'
                    }`}
                  >
                    {testScore >= 80 ? 'True (ผ่านเกณฑ์)' : 'False (ไม่ผ่าน)'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex justify-between rounded-xl border border-sky-100 bg-white px-4 py-2.5">
                  <span className="text-slate-700">pl.col("price") + 5</span>
                  <span className="text-blue-700">บวกเพิ่ม 5 บาท</span>
                </div>
                <div className="flex justify-between rounded-xl border border-sky-100 bg-white px-4 py-2.5">
                  <span className="text-slate-700">pl.col("score") * 2</span>
                  <span className="text-blue-700">คูณ 2 เท่า</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 3. Function vs Method */}
        <section className="flex flex-col justify-between rounded-3xl border border-sky-100 bg-white/80 p-6 shadow-sm backdrop-blur-md md:p-8">
          <div>
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 font-mono text-xs font-semibold text-blue-700">
                03 / Function vs. Method
              </span>
              <span className="text-xs font-medium text-slate-500">ความต่างการเรียกใช้</span>
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">
              ฟังก์ชัน (Function) กับ เมธอด (Method)
            </h2>
            <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-slate-600">
              สังเกตง่ายๆ: Function เรียกผ่านชื่อไลบรารี (<code className="font-mono text-blue-700">pl.</code>) ส่วน Method จะต่อท้ายตัวแปรตาราง (<code className="font-mono text-blue-700">df.</code>)
            </p>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => setFnMode('function')}
                className={`rounded-full px-4 py-1.5 font-mono text-xs font-medium transition ${
                  fnMode === 'function'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-sky-50 text-slate-600 ring-1 ring-sky-100'
                }`}
              >
                Function: pl.read_csv()
              </button>
              <button
                type="button"
                onClick={() => setFnMode('method')}
                className={`rounded-full px-4 py-1.5 font-mono text-xs font-medium transition ${
                  fnMode === 'method'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-sky-50 text-slate-600 ring-1 ring-sky-100'
                }`}
              >
                Method: df.filter()
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={fnMode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/50 p-5"
            >
              {fnMode === 'function' ? (
                <div>
                  <div className="font-mono text-sm font-semibold text-slate-900">
                    <span className="text-sky-600">pl</span>.read_csv("scores.csv")
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    เรียกใช้ตรงๆ จากโมดูล <code className="font-mono">pl</code> เพื่อสร้างหรืออ่านข้อมูลใหม่ขึ้นมาเป็น DataFrame
                  </p>
                </div>
              ) : (
                <div>
                  <div className="font-mono text-sm font-semibold text-slate-900">
                    <span className="text-blue-600">df</span>.filter(pl.col("score") &gt;= 80)
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    เป็นคำสั่งที่ "ติดมากับตัวตาราง df" ใช้สั่งให้ตาราง <code className="font-mono">df</code> จัดการข้อมูลภายในตัวเอง
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* 4. Arguments, *args, **kwargs */}
        <section className="flex flex-col justify-between rounded-3xl border border-sky-100 bg-white/80 p-6 shadow-sm backdrop-blur-md md:p-8">
          <div>
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 font-mono text-xs font-semibold text-blue-700">
                04 / Parameters
              </span>
              <span className="text-xs font-medium text-slate-500">การส่งค่าเข้าคำสั่ง</span>
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Arguments, *args และ **kwargs
            </h2>
            <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-slate-600">
              เวลาดูคู่มือ Polars จะเห็น <code className="font-mono text-blue-700">*args</code> กับ <code className="font-mono text-blue-700">**kwargs</code> บ่อยมาก มาดูความหมายกัน
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { id: 'pos', label: 'ระบุตำแหน่ง' },
                { id: 'kw', label: 'ระบุชื่อ (Keyword)' },
                { id: 'args', label: '*args' },
                { id: 'kwargs', label: '**kwargs' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setArgMode(item.id as 'pos' | 'kw' | 'args' | 'kwargs')
                  }
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                    argMode === item.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-sky-50 text-slate-600 ring-1 ring-sky-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={argMode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/50 p-5"
            >
              {argMode === 'pos' && (
                <div>
                  <code className="font-mono text-sm font-semibold text-slate-900">
                    df.head(5)
                  </code>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    ส่งค่าเข้าไปตรงๆ ตามลำดับพารามิเตอร์ เช่น เลข 5 คือขอดู 5 แถวแรก
                  </p>
                </div>
              )}
              {argMode === 'kw' && (
                <div>
                  <code className="font-mono text-sm font-semibold text-slate-900">
                    df.drop_nulls(subset="price")
                  </code>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    ระบุชื่อพารามิเตอร์ชัดเจนว่า <code className="font-mono">subset="price"</code> เพื่อให้อ่านโค้ดง่ายและไม่สับสนลำดับ
                  </p>
                </div>
              )}
              {argMode === 'args' && (
                <div>
                  <code className="font-mono text-sm font-semibold text-slate-900">
                    pl.col("name", "room", "score")
                  </code>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    เครื่องหมาย <code className="font-mono">*</code> แปลว่ารับค่าได้หลายตัวไม่จำกัดจำนวน คั่นด้วยเครื่องหมายจุลภาค
                  </p>
                </div>
              )}
              {argMode === 'kwargs' && (
                <div>
                  <code className="font-mono text-sm font-semibold text-slate-900">
                    df.filter(room="5/1")
                  </code>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    เครื่องหมาย <code className="font-mono">**</code> แปลว่ารับค่าแบบ "ชื่อ=ค่า" ได้หลายคู่พร้อมกัน
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
