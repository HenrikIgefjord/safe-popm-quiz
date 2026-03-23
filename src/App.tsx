import Quiz from './components/Quiz';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <Quiz />
      <button
        onClick={toggle}
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full
                   bg-slate-200 hover:bg-slate-300 text-slate-700
                   dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200
                   shadow-md transition-colors text-lg"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </>
  );
}
