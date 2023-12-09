import React, { useEffect } from "react";
import SourceChainFrom from "./sourcechainform";
import ImageRenderPortProjects from "./ImageRendererPortProjects";
import DestinationChainFrom from "./destinationchainform";
import { useAppSelector } from "@redux/hooks";

interface DestinationChainPortConfigProps {}
const DestinationChainPortConfig: React.FC<
  DestinationChainPortConfigProps
> = () => {
  const projectData = useAppSelector(
    (state) => state.projectDataReducer.ProjectData
  );

  const isPreviewed = useAppSelector(
    (state) => state.projectDataReducer.isPreviewed
  );

  useEffect(() => {}, [isPreviewed]);

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
        <div>
          {isPreviewed ? (
            <DestinationChainFrom />
          ) : (
            <div className="h-[480px] flex justify-center items-center">
              <div className="border-[1px] border-gray-500 p-4 rounded-lg">
                Preview to PORT Project Data
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationChainPortConfig;
