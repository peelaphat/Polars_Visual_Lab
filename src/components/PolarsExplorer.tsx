import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  POLARS_CATEGORIES,
  POLARS_COMMANDS,
  type CommandType,
  type PolarsCommand,
} from '../data/polarsData';
import { DataFrameVisualizer } from './DataFrameVisualizer';

function getTypeBadgeStyle(type: CommandType) {
  switch (type) {
    case 'Method':
      return 'bg-blue-50 text-blue-700 ring-blue-200';
    case 'Function':
      return 'bg-sky-50 text-sky-700 ring-sky-200';
    case 'Expression':
      return 'bg-indigo-50 text-indigo-700 ring-indigo-200';
  }
}

export function PolarsExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');
  const [selectedCommandId, setSelectedCommandId] = useState<string>(
    POLARS_COMMANDS[0].id
  );
  const [isExecuted, setIsExecuted] = useState(false);
  const [copied, setCopied] = useState(false);

  const filteredCommands = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return POLARS_COMMANDS.filter((cmd) => {
      const matchesCategory =
        selectedCategory === 'ทั้งหมด' || cmd.category === selectedCategory;
      const matchesQuery =
        !q ||
        cmd.name.toLowerCase().includes(q) ||
        cmd.summary.toLowerCase().includes(q) ||
        cmd.keywords.some((kw) => kw.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const activeCommand: PolarsCommand = useMemo(() => {
    return (
      POLARS_COMMANDS.find((c) => c.id === selectedCommandId) ??
      POLARS_COMMANDS[0]
    );
  }, [selectedCommandId]);

  const handleSelectCommand = (cmd: PolarsCommand) => {
    setSelectedCommandId(cmd.id);
    setIsExecuted(false);
    setCopied(false);
    setIsSearchFocused(false);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(activeCommand.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API may be unavailable in some contexts
    }
  };

  return (
    <div className="space-y-8">
      {/* Search & Category Pills */}
      <section className="rounded-3xl border border-sky-100 bg-white/80 p-6 shadow-sm backdrop-blur-md md:p-8">
        <div className="relative">
          <label
            htmlFor="polars-search"
            className="block text-sm font-semibold text-slate-700"
          >
            ค้นหาคำสั่ง Polars
          </label>
          <input
            id="polars-search"
            type="text"
            value={searchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="พิมพ์ชื่อคำสั่ง เช่น filter, drop_nulls, col หรือคำไทย เช่น กรอง, ค่าว่าง..."
            className="mt-2 w-full rounded-2xl border border-sky-200 bg-white px-5 py-3.5 text-sm text-slate-800 placeholder-slate-400 shadow-xs outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-sky-100"
          />

          {/* Autocomplete Dropdown */}
          <AnimatePresence>
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute right-0 left-0 z-20 mt-2 overflow-hidden rounded-2xl border border-sky-100 bg-white/95 shadow-xl backdrop-blur-md"
              >
                {filteredCommands.length > 0 ? (
                  <ul className="divide-y divide-sky-50">
                    {filteredCommands.map((cmd) => (
                      <li key={cmd.id}>
                        <button
                          type="button"
                          onMouseDown={() => handleSelectCommand(cmd)}
                          className="flex w-full items-center justify-between gap-4 px-5 py-3 text-left transition hover:bg-sky-50/80"
                        >
                          <div>
                            <span className="font-mono text-sm font-semibold text-slate-900">
                              {cmd.name}
                            </span>
                            <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
                              {cmd.summary}
                            </p>
                          </div>
                          <span
                            className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${getTypeBadgeStyle(
                              cmd.type
                            )}`}
                          >
                            {cmd.type}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-5 py-4 text-sm text-slate-500">
                    ไม่พบคำสั่งที่ตรงกับ "{searchQuery}"
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Category Text Pills */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {POLARS_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                  active
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-sky-50 text-slate-600 ring-1 ring-sky-100 hover:bg-sky-100/70 hover:text-sky-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Command Selector Pills */}
        <div className="mt-5 flex flex-wrap gap-2.5 border-t border-sky-100 pt-5">
          {filteredCommands.map((cmd) => {
            const isSelected = cmd.id === activeCommand.id;
            return (
              <button
                key={cmd.id}
                type="button"
                onClick={() => handleSelectCommand(cmd)}
                className={`rounded-xl border px-4 py-2 font-mono text-sm font-medium transition ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/80 text-blue-700 shadow-xs'
                    : 'border-sky-100 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50/50'
                }`}
              >
                {cmd.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Command Detail + Interactive Visualizer */}
      <motion.section
        key={activeCommand.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="grid gap-8 lg:grid-cols-12"
      >
        {/* Left: Command Explanation & Code */}
        <div className="space-y-6 rounded-3xl border border-sky-100 bg-white/80 p-6 shadow-sm backdrop-blur-md md:p-8 lg:col-span-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="font-mono text-2xl font-bold text-slate-900">
              {activeCommand.name}
            </h1>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getTypeBadgeStyle(
                activeCommand.type
              )}`}
            >
              {activeCommand.type}
            </span>
          </div>

          <p className="max-w-[65ch] text-base leading-relaxed text-slate-600">
            {activeCommand.summary}
          </p>

          <div className="rounded-2xl border border-sky-100 bg-sky-50/50 px-4 py-3">
            <div className="text-xs font-semibold text-sky-800">
              รูปแบบคำสั่ง (Signature)
            </div>
            <code className="mt-1 block font-mono text-xs text-slate-700">
              {activeCommand.signature}
            </code>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              พารามิเตอร์ที่ควรรู้
            </h2>
            <ul className="mt-3 space-y-3">
              {activeCommand.parameters.map((param) => (
                <li
                  key={param.name}
                  className="rounded-2xl border border-sky-100/80 bg-white/90 p-3.5"
                >
                  <code className="font-mono text-xs font-semibold text-blue-700">
                    {param.name}
                  </code>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {param.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Block */}
          <div className="overflow-hidden rounded-2xl border border-sky-100 bg-white">
            <div className="flex items-center justify-between border-b border-sky-100 bg-sky-50/60 px-4 py-2.5">
              <span className="font-mono text-xs font-medium text-slate-500">
                Python
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-medium text-sky-700 transition hover:bg-sky-50"
              >
                {copied ? 'คัดลอกแล้ว' : 'คัดลอกโค้ด'}
              </button>
            </div>
            <SyntaxHighlighter
              language="python"
              style={oneLight}
              customStyle={{
                margin: 0,
                padding: '1rem 1.25rem',
                background: 'transparent',
                fontSize: '0.85rem',
                lineHeight: 1.6,
              }}
            >
              {activeCommand.code}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Right: Interactive Animated DataFrame Visualizer */}
        <div className="lg:col-span-6">
          <DataFrameVisualizer
            commandId={activeCommand.id}
            datasetTitle={activeCommand.datasetTitle}
            animationType={activeCommand.animationType}
            columns={activeCommand.columns}
            initialRows={activeCommand.initialRows}
            resultRows={activeCommand.resultRows}
            highlightCol={activeCommand.highlightCol}
            mascotTipTh={activeCommand.mascotTipTh}
            isExecuted={isExecuted}
            onRun={() => setIsExecuted(true)}
            onReset={() => setIsExecuted(false)}
          />
        </div>
      </motion.section>
    </div>
  );
}
