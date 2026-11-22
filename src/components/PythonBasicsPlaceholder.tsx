export function PythonBasicsPlaceholder() {
  const topics = [
    {
      title: '1. Variables (ตัวแปร)',
      desc: 'การเก็บค่าและชนิดข้อมูลพื้นฐาน เช่น int, float, str, bool และ list',
    },
    {
      title: '2. Operators (การดำเนินการ)',
      desc: 'ตัวดำเนินการคำนวณ (+, -, *, /) และเปรียบเทียบ (==, >=, &, |) ที่ใช้บ่อยใน Polars',
    },
    {
      title: '3. Function vs. Method',
      desc: 'ความแตกต่างระหว่าง pl.read_csv() (Function) กับ df.filter() (Method)',
    },
    {
      title: '4. Arguments, *args และ **kwargs',
      desc: 'การส่งค่าแบบระบุตำแหน่ง ระบุชื่อ (subset=...) และการรับค่าหลายตัว',
    },
  ];

  return (
    <section className="rounded-3xl border border-sky-100 bg-white/80 p-8 shadow-sm backdrop-blur-md">
      <span className="inline-block rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
        Python Basics Refresher
      </span>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">
        ทบทวน Python พื้นฐานก่อนลุย Polars
      </h1>
      <p className="mt-2 max-w-[65ch] text-base leading-relaxed text-slate-600">
        ส่วนนี้รวบรวมพื้นฐาน Python ที่จำเป็นสำหรับการเขียนคำสั่ง Polars ได้อย่างเข้าใจ
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {topics.map((topic) => (
          <div
            key={topic.title}
            className="rounded-2xl border border-sky-100 bg-white/90 p-6 shadow-xs"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {topic.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {topic.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
