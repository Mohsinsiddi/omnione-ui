"use client";
import Image from "next/image";
import React, { useState } from "react";
import ImageRenderProjectDetails from "./ImageRendererProjectDetails";
import CountdownTimerProjectData from "./countdownTimerProjectData";
import ChainLogoRenderer from "./chainLogoProjectDetails";

type ProjectDataType = {
  image: string;
  name: string;
  isVerified: boolean;
  collectionAddressOnEth: string;
  createdAt: string;
  duration: number;
  chains: string[];
  totalSupply: number;
  price: number;
};
interface ProjectDetailsProps {
  data: ProjectDataType;
}
const ProjectDetails: React.FC<ProjectDetailsProps> = ({ data }) => {
  console.log("DATA", data);
  const selectedChainCSS = "border-[1px] border-gray-100";
  const mintedCount = 789;

  const [selChains, setChains] = useState<string[]>([]);

  return (
    <div className="flex flex-col m-2">
      <div className="flex justify-center items-center text-5xl font-extrabold font-mono mt-4 border-[1px] border-gray-200 rounded-lg p-2">
        OMNI:MINT
      </div>
      <div className="flex mt-16 ">
        <div className="flex justify-center w-1/2 h-screen ">
          <ImageRenderProjectDetails
            imageUrl={data.image}
            callBackImageUrl={""}
          />
        </div>
        <div className="flex flex-col w-1/2 gap-4 mt-12 border-[1px] border-gray-200 rounded-lg max-h-[33rem] pt-1 bg-gray-900">
          <div className="flex justify-center text-2xl font-extrabold font-mono border-[1px] border-gray-200 rounded-lg p-2">{`PROJECT NAME : ${data.name.toUpperCase()}`}</div>
          <div className="flex justify-center text-2xl font-extrabold font-mono border-[1px] border-gray-200 rounded-lg p-2">{`NFTs MINTED  : ${mintedCount} / ${data.totalSupply}`}</div>
          <div className="flex justify-center text-2xl font-extrabold font-mono border-[1px] border-gray-200 rounded-lg p-2">{`NFTs REMAINING  : ${
            data.totalSupply - mintedCount
          } / ${data.totalSupply}`}</div>
          <div className="flex justify-center items-center mt-2 border-[1px] border-gray-200 rounded-lg p-2">
            <div className="">
              <div className="flex flex-wrap gap-x-2 justify-center items-center">
                {data.chains.map((chain, index) => {
                  return (
                    <ChainLogoRenderer
                      logo={chain}
                      key={index}
                      chains={selChains}
                      setChains={setChains}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex justify-center text-2xl font-extrabold font-mono border-[1px] border-gray-200 rounded-lg p-2">{`MINT PRICE : ${data.price} ETH`}</div>
          <div>
            <CountdownTimerProjectData
              targetDate={Number(data.createdAt)}
              duration={data.duration}
              data={data}
              chains={selChains}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
