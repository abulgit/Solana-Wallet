import { useState, useEffect } from 'react';

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleDarkMode = () => {
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
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/75 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/75 supports-[backdrop-filter]:dark:bg-zinc-900/60">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 p-1.5 shadow-lg shadow-purple-500/20 dark:from-purple-600 dark:to-indigo-600">
            <svg 
              className="h-6 w-6 text-white" 
              viewBox="0 0 397 311" 
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" />
              <path d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" />
              <path d="M328.4 120.9c-2.4-2.4-5.7-3.8-9.2-3.8H1.9c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.8-62.7z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Solana Wallet
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Generate & Manage Wallets
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 bg-white text-sm font-medium shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-300"
          >
            {isDarkMode ? (
              <svg
                className="h-4 w-4 text-amber-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg
                className="h-4 w-4 text-zinc-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;