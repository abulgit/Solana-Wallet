// App.tsx
import { useState } from "react";
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "./SolanaWallet";
import Navbar from "./Navbar";
import {
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
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
                Secure Wallet Generator
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Create a new Solana wallet with cryptographically secure seed phrase
              </p>
            </div>

            {showSecurity && (
            <div className="animate-fade-in p-4 rounded-xl border border-amber-200/80 bg-gradient-to-br from-amber-50/50 to-amber-50 dark:from-amber-900/10 dark:to-amber-900/20 dark:border-amber-900/30 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400/80 mt-0.5" />
                </div>
                <div className="space-y-2.5">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 tracking-wide flex items-center gap-2">
                    <span className="bg-amber-600/10 dark:bg-amber-400/10 px-2 py-1 rounded-md text-sm">
                      ⚠️ CRITICAL SECURITY
                    </span>
                  </h4>
                  <ul className="list-disc list-outside space-y-1.5 pl-5 marker:text-amber-600/80 dark:marker:text-amber-400/60">
                    <li className="text-amber-800 dark:text-amber-200/90 text-sm leading-relaxed">
                      <span className="font-medium">Never share</span> this phrase - it grants full access to your funds
                    </li>
                    <li className="text-amber-800 dark:text-amber-200/90 text-sm leading-relaxed">
                      <span className="font-medium">Store securely</span> - write down and keep in a safe location
                    </li>
                    <li className="text-amber-800 dark:text-amber-200/90 text-sm leading-relaxed">
                      <span className="font-medium">Treat like password</span> - anyone with these words can control your wallet
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

            <div className="space-y-5">
              {mnemonic && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 tracking-wide">
                      RECOVERY PHRASE
                    </h3>
                    <div className="flex gap-1.5">
                      <button
                        onClick={handleCopy}
                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors group"
                      >
                        {copying ? (
                          <CheckIcon className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform" />
                        ) : (
                          <CopyIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors" />
                        )}
                      </button>
                      <button
                        onClick={toggleVisibility}
                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors group"
                      >
                        {showSeedPhrase ? (
                          <EyeOffIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {mnemonic.split(" ").map((word, index) => (
                      <div
                        key={index}
                        className="group relative py-2 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                      >
                        <span className="absolute top-1.5 left-1.5 text-xs font-medium text-zinc-400 dark:text-zinc-600">
                          {index + 1}
                        </span>
                        <span className="block text-center pt-2 font-mono text-zinc-700 dark:text-zinc-300 transition-opacity">
                          {showSeedPhrase ? (
                            <span className="opacity-100">{word}</span>
                          ) : (
                            <span className="opacity-70">••••</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleGenerateMnemonic}
                className="w-full py-3 px-4 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all font-semibold tracking-wide hover:shadow-sm"
              >
                {mnemonic ? 'Generate New Phrase' : 'Create Secure Wallet'}
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
