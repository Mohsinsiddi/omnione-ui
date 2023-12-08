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
import axios from "axios";
import { DataTable } from "@components/explorerdata-table";
import { columns } from "@components/column";

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

  const [isAll, setIsAll] = useState(true);
  const [isVerified, setIsverified] = useState(false);
  const [isUnverified, setIsVerified] = useState(false);

  const [allProjects, setAllProjecsts] = useState<any>([]);
  const [verifiedProjects, setVerifiedProjects] = useState<any>([]);
  const [unverifiedProjects, setUnVerifiedProjects] = useState<any>([]);

  const handleAllClick = () => {
    setIsAll(true);
    setIsverified(false);
    setIsVerified(false);
  };

  const handleVerifiedClick = () => {
    setIsAll(false);
    setIsverified(true);
    setIsVerified(false);
  };

  const handleUnverifiedClick = () => {
    setIsAll(false);
    setIsverified(false);
    setIsVerified(true);
  };

  React.useEffect(() => {
    async function fetchAllProjects() {
      const allProjects = await axios.get(`api/projects`);
      if (allProjects.data) {
        const allProjectData = [];
        const verifiedData = [];
        const unverifiedData = [];
        for (var i = 0; i < allProjects.data.length; i++) {
          if (allProjects.data[i].isVerified) {
            verifiedData.push({
              ...allProjects.data[i],
              status: "verified",
            });
            allProjectData.push({
              ...allProjects.data[i],
              status: "verified",
            });
          } else {
            unverifiedData.push({
              ...allProjects.data[i],
              status: "unverified",
            });
            allProjectData.push({
              ...allProjects.data[i],
              status: "unverified",
            });
          }
        }
        setAllProjecsts(allProjectData);
        setVerifiedProjects(verifiedData);
        setUnVerifiedProjects(unverifiedData);
      } else {
        setAllProjecsts([]);
        setVerifiedProjects([]);
        setUnVerifiedProjects([]);
      }
    }
    fetchAllProjects();
  }, []);

  return (
    <div className="w-full h-full border-[1px] border-gray-600 p-1 rounded-xl overflow-scroll">
      <div className="flex justify-center items-center mb-2">
        {" "}
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={handleAllClick}
            className="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
          >
            All
          </button>
          <button
            type="button"
            onClick={handleVerifiedClick}
            className="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
          >
            Verified
          </button>
          <button
            type="button"
            onClick={handleUnverifiedClick}
            className="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
          >
            Unverified
          </button>
        </div>
      </div>

      {isAll && (
        <div className="flex justify-center items-center">
          <div className="w-screen h-[100%] max-h-[44rem] self-start overflow-y-scroll border-[1px] border-gray-100 flex justify-center rounded-lg pt-2">
            <div className="container mx-auto py-2">
              <DataTable columns={columns} data={allProjects} />
            </div>
          </div>
        </div>
      )}

      {/* {isVerified && !isProjectPorting && (
        <div className="flex justify-center items-center gap-1">
          <div className="h-[480px] flex justify-center items-center">
            Select project from dashboard to port
          </div>
        </div>
      )} */}

      {isVerified && (
        <div className="flex justify-center items-center">
          <div className="w-screen h-[100%] max-h-[44rem] self-start overflow-y-scroll border-[1px] border-gray-100 flex justify-center rounded-lg pt-2">
            <div className="container mx-auto py-2">
              <DataTable columns={columns} data={verifiedProjects} />
            </div>
          </div>
        </div>
      )}

      {isUnverified && (
        <div className="flex justify-center items-center">
          <div className="w-screen h-[100%] max-h-[44rem] self-start overflow-y-scroll border-[1px] border-gray-100 flex justify-center rounded-lg pt-2">
            <div className="container mx-auto py-2">
              <DataTable columns={columns} data={unverifiedProjects} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
