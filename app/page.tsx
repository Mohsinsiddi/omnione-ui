"use client";

import * as React from "react";
import { useState } from "react";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { useAccount as useEthereumWallet } from "wagmi";
import Textarea from "react-textarea-autosize";
import { IconArrowElbow } from "@components/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Button } from "@components/ui/button";
import { Skeleton } from "@components/ui/skeleton";
import { SwapCard } from "@components/SwapCard";
import NFTCard from "@components/NFTCard";
import SwapDetails from "@components/SwapDetails";
import { useAppSelector } from "@redux/hooks";

type SwapPropsSolana = {
  functionName: "swapNFTSolanaToEthereum";
  name: string;
  mintAddress: string;
};

type SwapPropsEthereum = {
  functionName: "swapNFTEthereumToSui";
  name: string;
  contractAddress: string;
  tokenId: string;
  tokenType: string;
};

type SwapPropsType = SwapPropsSolana | SwapPropsEthereum;

function Page() {
  const isPorting = useAppSelector((state) => state.portingReducer.isPorting);
  const { publicKey: solanaAccount } = useSolanaWallet();
  const { address: ethereumAccount } = useEthereumWallet();
  const [prompt, setPrompt] = useState("");
  const [functionName, setFunctionName] = useState("");
  const [functionArgs, setFunctionArgs] = useState({});
  const [nfts, setNfts] = useState([]);
  const [isSwap, setIsSwap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSwapCard, setShowSwapCard] = useState(false);
  const [swapProps, setSwapProps] = useState<SwapPropsType | null>(null);

  const handleSwap = (props: any) => {
    setSwapProps(props);
    setShowSwapCard(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitPrompt();
    }
  };

  const submitPrompt = async () => {
    setIsLoading(true);
    setShowSwapCard(false);
    setSwapProps(null);

    const currentPrompt = prompt;
    setPrompt("");

    const solanaAddress = solanaAccount ? solanaAccount.toBase58() : null;
    const ethereumAddress = ethereumAccount || null;

    const payload = {
      prompt: currentPrompt,
      solanaAddress: solanaAddress,
      ethereumAddress: ethereumAddress,
    };

    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const { nftData, functionName, functionArgs } = await response.json();

    setFunctionName(functionName);
    console.log("Function Name: ", functionName);
    setFunctionArgs(functionArgs);
    console.log("Function Arguments: ", functionArgs);

    if (
      functionName === "fetchEthereumNFTs" ||
      functionName === "fetchSolanaNFTs"
    ) {
      setIsSwap(false);
    } else {
      setIsSwap(true);
    }

    if (nftData) {
      setNfts(nftData);
      console.log("NFT Data: ", nftData);
    }
    setIsLoading(false);
  };

  return (
    <div className="max-h-screen overflow-scroll-y">
      <main className="flex min-h-screen flex-col items-center justify-between p-12">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            PORT your Assets to&nbsp;
            <code className="font-mono font-bold">accross any CHAIN</code>
          </p>
          <div className="fixed bottom-0 left-0 flex h-36 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              By <code className="font-mono font-bold">Md Mohsin Siddiqui</code>
            </a>
          </div>
        </div>
        <div
          onClick={() => {}}
          className="flex justify-center items-start text-4xl font-mono cursor-pointer hover:text-zinc-500 border-[1px] border-gray-200 rounded-lg p-2"
        >
          PORTALS
        </div>

        <div className="relative text-6xl font-serif flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
          OMNIONE
        </div>

        <div className="grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <a
            href="https://arnavs-organization.gitbook.io/omniport-documentation/"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Docs{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Find in-depth information about Next.js features and API.
            </p>
          </a>

          <a
            href="https://arnavs-organization.gitbook.io/omniport-documentation/"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Learn{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://arnavs-organization.gitbook.io/omniport-documentation/"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Templates{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Explore the Next.js 13 playground.
            </p>
          </a>

          <a
            href="https://arnavs-organization.gitbook.io/omniport-documentation/"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Deploy{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Instantly deploy your Next.js site to a shareable URL with Vercel.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}

export default Page;
