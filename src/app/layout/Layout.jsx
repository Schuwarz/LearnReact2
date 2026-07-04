import { useTheme } from '@/shared/lib/context/ThemeContext';
import HelloReact from '@/app/components/HelloReact';

function Layout({ children }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">LoremBook</h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition"
        >
          {theme === 'light' ? '🌙 Тёмная' : '☀️ Светлая'}
        </button>
      </div>
      <HelloReact />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {children}
      </div>
    </div>
  );
}

export default Layout;