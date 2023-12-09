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
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { useTheme } from "next-themes";
import SourceChainPortConfig from "@components/sourcechainportconfig";
import DestinationChainPortConfig from "@components/destinationchainportconfig";
import { toggle } from "@redux/features/porting";
import Dashboard from "@components/creatordashboard";
import Explorer from "@components/ui/explorer";

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
  const isProjectPorting = useAppSelector(
    (state) => state.portingReducer.isPorting
  );

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

  const [isDashboard, setIsDashboard] = useState(true);
  const [isPorting, setIsPorting] = useState(false);
  const [isExplorer, setIsExlorer] = useState(false);

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

  const handleDashboardClick = () => {
    setIsDashboard(true);
    setIsPorting(false);
    setIsExlorer(false);
  };

  const handlePortClick = () => {
    setIsDashboard(false);
    setIsPorting(true);
    setIsExlorer(false);
  };

  const handleExplorerClick = () => {
    setIsDashboard(false);
    setIsPorting(false);
    setIsExlorer(true);
  };

  return (
    <div className="w-full h-full border-[1px] border-gray-600 p-1 rounded-xl overflow-scroll">
      <div className="flex justify-center items-center mb-2">
        {" "}
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={handleDashboardClick}
            className="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={handlePortClick}
            className="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
          >
            Port Project
          </button>
          <button
            type="button"
            onClick={handleExplorerClick}
            className="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
          >
            Explorer
          </button>
        </div>
      </div>

      {isDashboard && (
        <div className="flex justify-center items-center gap-1">
          <Dashboard
            setIsDashboard={setIsDashboard}
            setIsPorting={setIsPorting}
          />
        </div>
      )}

      {isPorting && !isProjectPorting && (
        <div className="flex justify-center items-center gap-1">
          <div className="h-[480px] flex justify-center items-center">
            Select project from dashboard to port
          </div>
        </div>
      )}

      {isPorting && isProjectPorting && (
        <div className="flex justify-center items-center gap-1">
          <SourceChainPortConfig />
          <DestinationChainPortConfig />
        </div>
      )}

      {isExplorer && (
        <div className="flex justify-center items-center">
          <Explorer />
        </div>
      )}
    </div>
  );
}

export default Page;
