import { useState } from 'react';
import { AuroraBackground } from './components/AuroraBackground';
import { GuideModal } from './components/GuideModal';
import { Navbar, type ActiveTab } from './components/Navbar';
import { PolarsExplorer } from './components/PolarsExplorer';
import { PythonBasicsView } from './components/PythonBasicsView';
import { WelcomeModal } from './components/WelcomeModal';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('polars');
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col text-slate-800">
      <AuroraBackground />
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        {activeTab === 'polars' ? (
          <PolarsExplorer />
        ) : (
          <PythonBasicsView />
        )}
      </main>

      <footer className="mt-12 border-t border-sky-100/80 bg-white/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-700">Polars Visual Lab</span>
            <span className="text-sky-300">|</span>
            <span>สาขาเทคโนโลยี โรงเรียน มอ.วิทยานุสรณ์</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              className="font-medium text-slate-500 transition hover:text-sky-700"
            >
              วิธีใช้งาน
            </button>
            <span className="text-sky-200">|</span>
            <button
              type="button"
              onClick={() => setIsWelcomeOpen(true)}
              className="font-medium text-sky-700 underline decoration-sky-300 underline-offset-4 transition hover:text-blue-700 hover:decoration-blue-500"
            >
              เกี่ยวกับและเครดิตผู้จัดทำ
            </button>
          </div>
        </div>
      </footer>

      <WelcomeModal
        isOpen={isWelcomeOpen}
        onClose={() => setIsWelcomeOpen(false)}
      />
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
}

export default App;
