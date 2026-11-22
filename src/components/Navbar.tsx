import { motion } from 'framer-motion';

export type ActiveTab = 'polars' | 'python';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenGuide: () => void;
}

export function Navbar({ activeTab, onTabChange, onOpenGuide }: NavbarProps) {
  const tabs: { id: ActiveTab; label: string }[] = [
    { id: 'polars', label: 'คลังคำสั่ง Polars' },
    { id: 'python', label: 'ทบทวน Python พื้นฐาน' },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-sky-100/80 bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 shadow-sm shadow-sky-300" />
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Polars Visual Lab
          </span>
          <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700 ring-1 ring-sky-200/80">
            ม.5
          </span>
        </div>

        <nav
          aria-label="เมนูหลัก"
          className="flex items-center gap-1 rounded-full bg-sky-50/80 p-1 ring-1 ring-sky-100"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-600 hover:text-sky-700'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 shadow-sm"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onOpenGuide}
          className="rounded-full border border-sky-200 bg-white/90 px-4 py-1.5 text-sm font-medium text-sky-700 shadow-xs transition hover:border-sky-300 hover:bg-sky-50"
        >
          วิธีใช้งาน
        </button>
      </div>
    </header>
  );
}
