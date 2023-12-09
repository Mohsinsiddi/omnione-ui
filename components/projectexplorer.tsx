import {
  ARB,
  BASE,
  CELO,
  ETH,
  MANT,
  POLY,
  SCR,
  X1,
  XDC,
  ZETA,
} from "@app/constants/chainlogos";
import ProjectCard from "./projectCard";
import { useEffect, useState } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import axios from "axios";
import { LIGHTHOUSE_SDK_VERSION_NAME } from "@app/constants/constant";

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

const getReturnValues = (countDown: any) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

const ProjectExplorer = () => {
  const [upcomingprojects, setUpcomingProjects] = useState<ProjectDataType[]>(
    []
  );

  const [liveprojects, setLiveProjects] = useState<ProjectDataType[]>([]);

  const [endedprojects, setEndedProjects] = useState<ProjectDataType[]>([]);

  useEffect(() => {
    async function fetch() {
      const API_KEY = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!;
      const response = await lighthouse.getUploads(API_KEY);
      const projectList = response.data.fileList;

      const liveprojectData = [];
      const endedprojectData = [];
      const upcomingprojectData = [];

      for (var i = 0; i < projectList.length; i++) {
        if (projectList[i].fileName === LIGHTHOUSE_SDK_VERSION_NAME) {
          const cid = projectList[i].cid;
          const response = await axios.get(
            `https://gateway.lighthouse.storage/ipfs/${cid}`
          );
          if (response.status === 200) {
            const chains = [];
            for (var j = 0; j < response.data.chains.length; j++) {
              if (response.data.chains[j]["ARB"]) {
                chains.push(ARB);
              }
              if (response.data.chains[j]["BASE"]) {
                chains.push(BASE);
              }
              if (response.data.chains[j]["CELO"]) {
                chains.push(CELO);
              }
              if (response.data.chains[j]["ETH"]) {
                chains.push(ETH);
              }
              if (response.data.chains[j]["MANT"]) {
                chains.push(MANT);
              }
              if (response.data.chains[j]["POLY"]) {
                chains.push(POLY);
              }
              if (response.data.chains[j]["SCR"]) {
                chains.push(SCR);
              }
              if (response.data.chains[j]["X1"]) {
                chains.push(X1);
              }
              if (response.data.chains[j]["XDC"]) {
                chains.push(XDC);
              }
              if (response.data.chains[j]["ZETA"]) {
                chains.push(ZETA);
              }
            }
            const p_data = {
              cid: cid,
              image: response.data.image,
              name: response.data.name,
              isVerified: true,
              collectionAddressOnEth: response.data.baseCollectionAddress,
              createdAt: response.data.createdAt,
              duration: 24 * 60 * 60 * 1000,
              chains: chains,
              baseChainName: response.data.baseChainName,
              totalSupply: Number(response.data.supply),
            };
            console.log(p_data);

            const [days, hours, minutes, seconds] = getReturnValues(
              Number(response.data.createdAt) - new Date().getTime()
            );

            if (days + hours + minutes + seconds <= 0) {
              if (days >= -2) {
                liveprojectData.push(p_data);
              } else {
                endedprojectData.push(p_data);
              }
            } else {
              upcomingprojectData.push(p_data);
            }
          }
        }
      }
      setLiveProjects(liveprojectData);
      setEndedProjects(endedprojectData);
      setUpcomingProjects(upcomingprojectData);
    }
    fetch();
  }, []);

  return (
    <div className="flex flex-col mt-4 space-y-4 w-screen h-[100%] max-h-[44rem] self-start overflow-y-scroll">
      <div>
        <div className="font-mono text-green-400 text-2xl font-extrabold ml-4 mb-2 underline">
          LIVE:OmniLAUNCHES
        </div>
        <div className="flex flex-wrap pl-1 gap-[3px]">
          {liveprojects.map((item, key) => (
            <ProjectCard data={item} key={key} />
          ))}
        </div>
      </div>
      <div>
        <div className="font-mono text-2xl font-extrabold ml-4 mb-2 underline">
          NEXT:OmniLAUNCHES
        </div>

        <div className="flex flex-wrap pl-1 gap-[3px]">
          {upcomingprojects.map((item, key) => (
            <ProjectCard data={item} key={key} />
          ))}
        </div>
      </div>
      <div>
        <div className="font-mono text-red-500 text-2xl font-extrabold ml-4 mb-2 underline">
          ENDED:OmniLAUNCHES
        </div>
        <div className="flex flex-wrap pl-1 gap-[3px]">
          {endedprojects.map((item, key) => (
            <ProjectCard data={item} key={key} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProjectExplorer;
