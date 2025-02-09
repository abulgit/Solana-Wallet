import { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-100 bg-white/90 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-950/50">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-lg bg-zinc-900 p-2 dark:bg-zinc-50">
            <svg 
              className="h-5 w-5 text-zinc-50 dark:text-zinc-900" 
              viewBox="0 0 397 311" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" 
                fill="#9945FF"
              />
              <path 
                d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" 
                fill="#9945FF"
              />
              <path 
                d="M328.4 120.9c-2.4-2.4-5.7-3.8-9.2-3.8H1.9c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.8-62.7z" 
                fill="#9945FF"
              />
            </svg>
          </div>
          <span className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Wallet Generator
          </span>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          {isDarkMode ? (
            <div className="h-5 w-5 text-amber-500">🌞</div>
          ) : (
            <div className="h-5 w-5 text-zinc-500">🌙</div>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
