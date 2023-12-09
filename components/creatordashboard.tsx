"use client";
import React, { useEffect, useState } from "react";
import ImageRenderDashboard from "./ImageRenderer";
import Image from "next/image";
import { TbExternalLink } from "react-icons/tb";
import { VscDebugBreakpointConditionalUnverified } from "react-icons/vsc";
import { MdVerified } from "react-icons/md";

import { Input } from "@/components/ui/input";
import VerifyCollectionOwnership from "./verifycollectionownership";
import axios from "axios";
import { useAccount } from "wagmi";
import { useAppDispatch } from "@redux/hooks";
import {
  setProjectData,
  portprojectdata,
} from "@redux/features/portProjectData";
import { toggle } from "@redux/features/porting";
import { Project } from "@prisma/client";
import { useWallet } from "@solana/wallet-adapter-react";
import toast from "react-hot-toast";
import { useWallet as useSuiWallet } from "@suiet/wallet-kit";

interface DashboardProps {
  setIsDashboard: React.Dispatch<React.SetStateAction<any>>;
  setIsPorting: React.Dispatch<React.SetStateAction<any>>;
}

const Dashboard: React.FC<DashboardProps> = ({
  setIsDashboard,
  setIsPorting,
}) => {
  const { address, connector, isConnected } = useAccount();
  const wallet = useWallet();
  const suiWallet = useSuiWallet();

  const [isProjects, setIsProjects] = useState(true);
  const [isPortedProjects, setIsPortedProjects] = useState(false);
  const [isImportPorjects, setIsImportProjects] = useState(false);

  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [portedProjects, setPortedProjects] = useState<Project[]>([]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    async function fetchProjects() {
      if (isConnected) {
        const projectsData = await axios.get(
          `api/creator/allprojects?address=${address}`
        );
        if (projectsData.data) {
          setUserProjects(projectsData.data);
          const userPortedProject = [];

          for (var i = 0; i < projectsData.data.length; i++) {
            if (projectsData.data[i].isPorted) {
              userPortedProject.push(projectsData.data[i]);
            }
          }
          setPortedProjects(userPortedProject);
        } else {
          setUserProjects([]);
          setPortedProjects([]);
        }
      }
    }

    fetchProjects();
  }, [address]);

  const etherScanLogo =
    "https://altcoinsbox.com/wp-content/uploads/2023/01/etherscan-logo.png";

  const handleVerifyCollectionOwnership = () => {
    try {
    } catch (error) {
      console.log("Verify ownership error", error);
    }
  };

  const handlePortProject = (projectData: Project) => {
    if (!suiWallet.connected) {
      toast.error("Please connect your EVM wallet");
      return;
    }

    if (!isConnected) {
      toast.error("Please connect your ETHEREUM wallet");
      return;
    }

    if (!projectData.isVerified) {
      toast.error("Please verify your project with admin first");
      return;
    }
    dispatch(
      setProjectData({
        name: projectData.name,
        image: projectData.image,
        collectionAddress: projectData.collectionAddressOnEth,
        ownerAddress: projectData.ownerAddressOnEth,
        collectionSupply: projectData.collectionSupply,
        symbol: projectData.symbol,
        projectId: projectData.id,
      })
    );
    dispatch(toggle());

    setIsDashboard(false);
    setIsPorting(true);
  };

  return (
    <div className="w-full h-screen border-[1px] border-gray-200 rounded-lg">
      <div className="flex flex-col">
        <div className="inline-flex rounded-md shadow-sm p-2">
          <button
            type="button"
            onClick={() => {
              setIsProjects(true);
              setIsPortedProjects(false);
              setIsImportProjects(false);
            }}
            className="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
          >
            Projects
          </button>
          <button
            type="button"
            onClick={() => {
              setIsProjects(false);
              setIsPortedProjects(true);
              setIsImportProjects(false);
            }}
            className="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
          >
            Ported Projects
          </button>
          <button
            type="button"
            onClick={() => {
              setIsProjects(false);
              setIsPortedProjects(false);
              setIsImportProjects(true);
            }}
            className="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
          >
            Import Project
          </button>
        </div>

        <div className="flex flex-wrap pl-1 gap-[3px]">
          {" "}
          {isProjects &&
            userProjects.length > 0 &&
            userProjects.map((item, index) => {
              return (
                <div className="flex flex-col border-[1px] border-gray-200 rounded-lg">
                  <div className="">
                    {item.image && (
                      <ImageRenderDashboard
                        imageUrl={item.image}
                        callBackImageUrl={""}
                      />
                    )}
                  </div>
                  <div className="flex justify-center p-1 font-mono text-lg font-bold">
                    {item.name}
                  </div>
                  <div className="flex justify-center items-center gap-x-1">
                    {/* <div>{`Token ID - ${nft.tokenId.slice(0, 10)}`}</div> */}
                    <a
                      href={`https://sepolia.etherscan.io/token/${item.collectionAddressOnEth}`}
                      target="_blank"
                    >
                      <div className="flex cursor-pointer">
                        <div>
                          <Image
                            src={etherScanLogo}
                            height={20}
                            width={20}
                            alt=""
                          />
                        </div>
                        <div className="pt-[2px]">
                          <TbExternalLink />
                        </div>
                      </div>
                    </a>
                    <div>
                      {item.isVerified ? (
                        <MdVerified color="lightgreen" size={24} />
                      ) : (
                        <VscDebugBreakpointConditionalUnverified size={32} />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center p-2">
                    <button
                      type="button"
                      onClick={() => {
                        handlePortProject(item);
                      }}
                      className="py-[1px] px-2 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-gray-500 text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
                    >
                      Port
                    </button>
                  </div>
                </div>
              );
            })}
          {isProjects && userProjects.length === 0 && (
            <div className=" w-screen h-[400px] flex justify-center items-center">
              <div className="flex flex-col border-[1px] border-gray-500 p-4 rounded-lg">
                <div className="flex justify-center items-center font-mono text-2xl">
                  You dont have any projects
                </div>
                <div className="flex justify-center items-center font-mono text-2xl">
                  Please import projects
                </div>
              </div>
            </div>
          )}
          {isPortedProjects &&
            portedProjects.length > 0 &&
            portedProjects.map((item, index) => {
              return (
                <div className="flex flex-col border-[1px] border-gray-200 rounded-lg">
                  <div className="">
                    {item.image && (
                      <ImageRenderDashboard
                        imageUrl={item.image}
                        callBackImageUrl={""}
                      />
                    )}
                  </div>
                  <div className="flex justify-center p-1 font-mono text-lg font-bold">
                    {item.name}
                  </div>
                  <div className="flex justify-center items-center gap-x-1">
                    {/* <div>{`Token ID - ${nft.tokenId.slice(0, 10)}`}</div> */}
                    <a
                      href={`https://sepolia.etherscan.io/token/${item.collectionAddressOnEth}`}
                      target="_blank"
                    >
                      <div className="flex cursor-pointer">
                        <div>
                          <Image
                            src={etherScanLogo}
                            height={20}
                            width={20}
                            alt=""
                          />
                        </div>
                        <div className="pt-[2px]">
                          <TbExternalLink />
                        </div>
                      </div>
                    </a>
                    <div>
                      {item.isVerified ? (
                        <MdVerified color="lightgreen" size={24} />
                      ) : (
                        <VscDebugBreakpointConditionalUnverified size={28} />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center p-2">
                    <button
                      type="button"
                      onClick={() => {}}
                      className="py-[1px] px-2 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-extrabold  bg-gray-500 text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
                    >
                      Update Configs
                    </button>
                  </div>
                </div>
              );
            })}
          {isPortedProjects && portedProjects.length === 0 && (
            <div className=" w-screen h-[400px] flex justify-center items-center">
              <div className="flex flex-col border-[1px] border-gray-500 p-4 rounded-lg">
                <div className="flex justify-center items-center font-mono text-2xl">
                  You dont have any ported projects
                </div>
                <div className="flex justify-center items-center font-mono text-2xl">
                  Please port projects from dashboard
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          {" "}
          {isImportPorjects && <VerifyCollectionOwnership />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
