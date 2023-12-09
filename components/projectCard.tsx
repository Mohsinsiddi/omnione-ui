import Image from "next/image";
import ImageRenderDashboard from "./ImageRenderer";
import { TbExternalLink } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { VscDebugBreakpointConditionalUnverified } from "react-icons/vsc";
import React, { useEffect, useState } from "react";
import CountdownTimer from "./countdownTimer";
import { useCountdown } from "@hooks/useCountdown";
import {
  ARB,
  CELO,
  ETH,
  MANT,
  POLY,
  SCR,
  X1,
  XDC,
  ZETA,
} from "@app/constants/chainlogos";

type ProjectDataType = {
  cid: string;
  image: string;
  name: string;
  isVerified: boolean;
  collectionAddressOnEth: string;
  createdAt: string;
  duration: number;
  chains: string[];
  baseChainName: string;
  totalSupply: number;
};

interface ProjectCardProps {
  data: ProjectDataType;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  const etherScanLogo =
    "https://altcoinsbox.com/wp-content/uploads/2023/01/etherscan-logo.png";

  return (
    <div className="">
      <div className="flex flex-col border-[1px] border-gray-200 rounded-lg">
        <div className="">
          {data.image && (
            <ImageRenderDashboard imageUrl={data.image} callBackImageUrl={""} />
          )}
        </div>
        <div className="flex justify-center p-1 font-mono text-lg font-bold">
          {data.name}
        </div>
        <div className="flex justify-center items-center gap-x-1">
          {/* <div>{`Token ID - ${nft.tokenId.slice(0, 10)}`}</div> */}
          <a
            href={`https://sepolia.etherscan.io/token/${data.collectionAddressOnEth}`}
            target="_blank"
          >
            <div className="flex cursor-pointer">
              <div>
                <Image src={etherScanLogo} height={20} width={20} alt="" />
              </div>
              <div className="pt-[2px]">
                <TbExternalLink />
              </div>
            </div>
          </a>
          <div>
            {data.isVerified ? (
              <MdVerified color="lightgreen" size={24} />
            ) : (
              <VscDebugBreakpointConditionalUnverified size={32} />
            )}
          </div>
        </div>
        <div className="flex justify-center items-center mt-2">
          <div className="">
            <div className="flex flex-wrap">
              {data.chains.map((chain, index) => {
                return (
                  <div>
                    <Image src={chain} height={20} width={20} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <CountdownTimer
            cid={data.cid}
            targetDate={Number(data.createdAt)}
            duration={data.duration}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
