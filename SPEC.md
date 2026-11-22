Read `SPEC.md` and inspect the local Polars source code inside the `polars-main` folder (`polars-main/py-polars/polars/`) to upgrade both the **Polars Visual Explorer** and **Python Basics Refresher** modules.

### 1. Expand Polars Commands (Verified from `polars-main`)
Systematically scan `polars-main/py-polars/polars/` to verify exact signatures, parameter names, and default values. Populate `src/data/polarsData.json` with a comprehensive set of Polars commands organized by category:
- **I/O:** `pl.read_csv()`, `pl.read_excel()`, `df.write_csv()`
- **Inspection:** `df.head()`, `df.tail()`, `df.describe()`, `df.glimpse()`, `df.shape`
- **Selection:** `pl.col()`, `df.select()`, `df.drop()`, `df.rename()`
- **Filtering:** `df.filter()`, `df.slice()`
- **Cleaning:** `df.drop_nulls()`, `df.fill_null()`, `df.unique()`, `pl.coalesce()`
- **Transformation:** `df.with_columns()`, `pl.when().then().otherwise()`, `.alias()`, `.cast()`
- **Sorting & Grouping:** `df.sort()`, `df.group_by()`, `.agg()`
- **Combining:** `df.join()`, `pl.concat()`
- **String & Date Expressions:** `.str.to_date()`, `.str.contains()`, `.str.replace()`, `.dt.year()`

For EVERY command, include:
1. Accurate `type` badge (`Function`, `Method`, or `Expression`).
2. Clear, friendly **Thai explanation** for Grade 11 (ม.5) students.
3. **Parameters breakdown**: list the key parameters verified from `polars-main` (exact English name, default value, and concise Thai explanation of what it does).
4. Runnable **Python code example** (English code, Thai comments/sample data).
5. Matching `visualDemo` dataset for the animated DataFrame table.

*(Note: If the JSON becomes large, split it cleanly by category inside `src/data/commands/` and merge them in `src/data/polarsData.ts` so nothing is truncated.)*

### 2. Expand "Python Basics Refresher" (ทบทวน Python พื้นฐาน)
Upgrade `PythonBasicsView.tsx` to cover all essential prerequisites for learning Polars, with interactive examples in friendly Thai:
- **Imports & Aliases:** `import polars as pl` (ทำไมต้อง import และทำไมใช้ `as pl`)
- **Variables & Data Types:** `int`, `float`, `str`, `bool`, and `None` (เชื่อมโยงกับ `null` ใน Polars)
- **Lists & Dictionaries:** โครงสร้าง `[...]` และ `{...}` ที่ใช้สร้าง DataFrame และเลือกหลายคอลัมน์
- **Operators:** คำนวณ (`+ - * /`), เปรียบเทียบ (`== >= !=`), และเชื่อมเงื่อนไข (`&`, `|`)
- **Function vs. Method:** ความต่างของ `pl.read_csv()` vs `df.filter()`
- **Method Chaining:** การเขียนคำสั่งต่อกันเป็นลูกโซ่ เช่น `df.drop_nulls().filter(...).sort(...)`
- **Arguments, `*args`, and `**kwargs`:** การส่งค่าแบบตำแหน่งและแบบระบุชื่อพารามิเตอร์

### 3. Motion Graphics, Typography & Visual Polish (STRICT)
- **Theme:** Luminous **Blue & White** (`#FFFFFF`, `#F0F7FF`, `#0284C7`, `#2563EB`) with subtle animated background gradients and glassmorphic cards. **ZERO icons or emojis anywhere.**
- **Motion Graphics (Framer Motion):**
  - Upgrade `DataFrameVisualizer.tsx` with smooth spring animations (`layoutId`, `AnimatePresence`) for all transformation types (`filter_rows`, `drop_nulls`, `add_column`, `deduplicate`, `sort_rows`, `transform_values`, `group_agg`, `join_tables`).
  - Add interactive mini-animations inside the **Python Basics** cards (e.g., an animated pipeline step-through for Method Chaining and a visual box animation for Variables/Imports).
- **Typography & Sizing:**
  - Use **Google Sans** (with `Noto Sans Thai` fallback) and `JetBrains Mono` for code.
  - Ensure comfortable, well-proportioned font sizes: headings `text-2xl` to `text-4xl`, body text `text-base` to `text-lg` (`16px–18px`) with `leading-relaxed`, code blocks `text-sm` to `text-base`, and generous padding/whitespace so the screen never feels cramped.