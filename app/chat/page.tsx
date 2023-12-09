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
    <div className="w-full h-full">
      <div
        className="fixed inset-x-0 mx-auto sm:max-w-2xl sm:px-4"
        style={{ top: "10%" }}
      >
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-xl sm:border md:py-4">
          <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
            <Textarea
              ref={React.useRef<HTMLTextAreaElement>(null)}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              rows={1}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Send a message."
              spellCheck={false}
              className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm box-sizing:border-box"
            />
            <div className="absolute right-0 top-4 sm:right-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={submitPrompt}
                    size="icon"
                    disabled={prompt === ""}
                    className="w-8 h-8 box-sizing:border-box"
                  >
                    <IconArrowElbow />
                    <span className="sr-only">Send message</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Send message</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center space-x-4 mt-36">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : isSwap ? (
        <div className="mt-36 flex justify-center items-center">
          <SwapDetails
            functionName={functionName}
            functionArgs={functionArgs}
            walletNFTs={nfts}
          />
        </div>
      ) : swapProps && showSwapCard ? (
        <div className="mt-36 flex justify-center items-center">
          <SwapCard {...swapProps} />
        </div>
      ) : (
        <div className="mt-36 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 px-4 overflow-y-auto max-h-[72vh] nft-scroll">
          {nfts.map((nft, index) => (
            <NFTCard key={index} nft={nft} onSwap={handleSwap} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
