import React from "react";
import SourceChainFrom from "./sourcechainform";
import ImageRenderDashboard from "./ImageRenderer";
import ImageRenderPortProjects from "./ImageRendererPortProjects";
import { useAppSelector } from "@redux/hooks";

interface SourceChainPortConfigProps {}
const SourceChainPortConfig: React.FC<SourceChainPortConfigProps> = () => {
  const projectData = useAppSelector(
    (state) => state.projectDataReducer.ProjectData
  );

  const imageurl =
    "https://thedefiant.io/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F6oftkxoa%2Fproduction%2F7e98fb93a85dc604004a64c1ccaa6aa1968c7f9c-631x631.png&w=828&q=75";

  return (
    <div className="w-screen h-[100%] max-h-[44rem] self-start overflow-y-scroll border-[1px] border-gray-100 flex justify-center rounded-lg pt-2">
      <div className="flex flex-col gap-2">
        <div className="flex justify-center font-extrabold text-4xl font-mono underline">
          ETHEREUM
        </div>
        <div className="flex justify-center">
          <ImageRenderPortProjects
            imageUrl={projectData.image}
            callBackImageUrl={""}
          />
        </div>
        <div className="">
          {" "}
          <SourceChainFrom />
        </div>
      </div>
    </div>
  );
};

export default SourceChainPortConfig;
