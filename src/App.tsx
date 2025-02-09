// App.tsx
import { useState } from "react";
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "./SolanaWallet";
import Navbar from "./Navbar";
import {
  KeyIcon,
  AlertTriangle,
  EyeIcon,
  EyeOffIcon,
  CopyIcon,
  CheckIcon,
} from "lucide-react";

const App: React.FC = () => {
  const [mnemonic, setMnemonic] = useState<string>("");
  const [showSecurity, setShowSecurity] = useState<boolean>(false);
  const [showSeedPhrase, setShowSeedPhrase] = useState<boolean>(true);
  const [copying, setCopying] = useState<boolean>(false);

  const handleGenerateMnemonic = (): void => {
    const newMnemonic: string = generateMnemonic();
    setMnemonic(newMnemonic);
    setShowSecurity(true);
    setShowSeedPhrase(false);
  };

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(mnemonic);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  const toggleVisibility = (): void => {
    setShowSeedPhrase(!showSeedPhrase);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-colors">
      <Navbar />
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {showSecurity && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800 dark:text-blue-200 leading-6">
                    Never share your seed phrase. Store it securely and never expose it to others.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
                Secure Wallet Generator
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Create a new Solana wallet with cryptographically secure seed phrase
              </p>
            </div>

            <div className="space-y-5">
              {mnemonic && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Recovery Phrase
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopy}
                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                      >
                        {copying ? (
                          <CheckIcon className="h-4 w-4 text-green-500" />
                        ) : (
                          <CopyIcon className="h-4 w-4 text-zinc-500" />
                        )}
                      </button>
                      <button
                        onClick={toggleVisibility}
                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                      >
                        {showSeedPhrase ? (
                          <EyeOffIcon className="h-4 w-4 text-zinc-500" />
                        ) : (
                          <EyeIcon className="h-4 w-4 text-zinc-500" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {mnemonic.split(" ").map((word, index) => (
                      <div
                        key={index}
                        className="py-2 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm flex items-center gap-1.5"
                      >
                        <span className="text-zinc-400 dark:text-zinc-600 text-xs">
                          {index + 1}.
                        </span>
                        <span className="text-zinc-700 dark:text-zinc-300">
                          {showSeedPhrase ? word : '••••'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleGenerateMnemonic}
                className="w-full py-3 px-4 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors font-medium"
              >
                {mnemonic ? 'Generate New Phrase' : 'Create Wallet'}
              </button>
            </div>

            {mnemonic && <SolanaWallet mnemonic={mnemonic} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
