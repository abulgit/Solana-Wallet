// SolanaWallet.jsx
import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { PlusIcon, CopyIcon, CheckIcon, Wallet, ExternalLinkIcon } from 'lucide-react';

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);
  const [copying, setCopying] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCopy = async (address) => {
    await navigator.clipboard.writeText(address);
    setCopying((prev) => ({ ...prev, [address]: true }));
    setTimeout(() => {
      setCopying((prev) => ({ ...prev, [address]: false }));
    }, 2000);
  };

  const generateWallet = async () => {
    setLoading(true);
    try {
      const seed = await mnemonicToSeed(mnemonic);
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);
      setCurrentIndex(currentIndex + 1);
      setPublicKeys([...publicKeys, keypair.publicKey]);
    } finally {
      setLoading(false);
    }
  };

  const openExplorer = (address) => {
    window.open(`https://explorer.solana.com/address/${address}`, '_blank');
  };

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Generated Wallets
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Manage your generated Solana wallets.
            </p>
          </div>
          <button
            onClick={generateWallet}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md bg-zinc-900 dark:bg-zinc-50 px-4 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 focus:ring-opacity-20 dark:focus:ring-opacity-20 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-500 border-t-transparent" />
            ) : (
              <>
                <PlusIcon className="mr-2 h-4 w-4" />
                New Wallet
              </>
            )}
          </button>
        </div>

        <div className="mt-6 space-y-2">
          {publicKeys.map((publicKey, index) => {
            const address = publicKey.toBase58();
            return (
              <div
                key={index}
                className="group flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <Wallet className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                      Wallet {index + 1}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">
                      {address.slice(0, 12)}...{address.slice(-8)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => openExplorer(address)}
                    className="rounded-md p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-200"
                    title="View in Explorer"
                  >
                    <ExternalLinkIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                  </button>
                  <button
                    onClick={() => handleCopy(address)}
                    className="rounded-md p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-200"
                    title="Copy address"
                  >
                    {copying[address] ? (
                      <CheckIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <CopyIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}

          {publicKeys.length === 0 && (
            <div className="rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 p-8">
              <div className="text-center">
                <Wallet className="mx-auto h-8 w-8 text-zinc-400 dark:text-zinc-600" />
                <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  No wallets generated
                </p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Click the New Wallet button to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}