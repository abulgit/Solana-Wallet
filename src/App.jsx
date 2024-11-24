import { useState, useEffect } from 'react';
import { generateMnemonic } from "bip39";
import { SolanaWallet } from './SolanaWallet';
import Navbar from './Navbar';
import { KeyIcon, ShieldCheck, AlertTriangle, EyeIcon, EyeOffIcon, CopyIcon, CheckIcon } from 'lucide-react';

function App() {
  const [mnemonic, setMnemonic] = useState(() => {
    // Initialize mnemonic from localStorage if it exists
    return localStorage.getItem('solana_mnemonic') || "";
  });
  const [showSecurity, setShowSecurity] = useState(false);
  const [showSeedPhrase, setShowSeedPhrase] = useState(true);
  const [copying, setCopying] = useState(false);

  // Update localStorage whenever mnemonic changes
  useEffect(() => {
    if (mnemonic) {
      localStorage.setItem('solana_mnemonic', mnemonic);
      setShowSecurity(true);
    }
  }, [mnemonic]);

  const handleGenerateMnemonic = () => {
    const newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic);
    setShowSecurity(true);
    setShowSeedPhrase(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(mnemonic);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  const toggleVisibility = () => {
    setShowSeedPhrase(!showSeedPhrase);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <Navbar />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Security Notice */}
          {showSecurity && (
            <div className="w-full p-4 rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-900/30">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-medium text-amber-800 dark:text-amber-500">Security Warning</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                    Never share your seed phrase. Anyone with these words can access your wallet.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Card */}
          <div className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Generate Wallet
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Create a new Solana wallet from a seed phrase.
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <KeyIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {/* Seed Phrase Display */}
                {mnemonic && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                        Your Seed Phrase
                      </label>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleCopy}
                          className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                          title="Copy seed phrase"
                        >
                          {copying ? (
                            <CheckIcon className="h-4 w-4 text-green-500" />
                          ) : (
                            <CopyIcon className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={toggleVisibility}
                          className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                          title={showSeedPhrase ? "Hide seed phrase" : "Show seed phrase"}
                        >
                          {showSeedPhrase ? (
                            <EyeOffIcon className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {mnemonic.split(" ").map((word, index) => (
                        <div
                          key={index}
                          className="relative group rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-3"
                        >
                          <span className="absolute top-1 left-1.5 text-xs text-zinc-400 dark:text-zinc-500">
                            {index + 1}
                          </span>
                          <span className="block text-center pt-2 font-mono text-sm text-zinc-900 dark:text-zinc-50">
                            {showSeedPhrase ? word : "•".repeat(word.length)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Generate Button */}
                <button
                  onClick={handleGenerateMnemonic}
                  className="w-full rounded-md bg-zinc-900 dark:bg-zinc-50 px-4 py-2.5 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 focus:ring-opacity-20 dark:focus:ring-opacity-20 transition-colors duration-200"
                >
                  Generate New Seed Phrase
                </button>
              </div>
            </div>
          </div>

          {/* Wallet Display Section */}
          {mnemonic && <SolanaWallet mnemonic={mnemonic} />}
        </div>
      </main>
    </div>
  );
}

export default App;