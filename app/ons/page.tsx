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

function Page() {
  return <div className="w-full h-full">OmniNameService</div>;
}

export default Page;
