import React from "react";
import ImageRenderDashboard from "./ImageRenderer";
import Image from "next/image";
import { TbExternalLink } from "react-icons/tb";

type NFTDataType = {
  image: string;
  name: string;
  collectionAddressOnEth: string;
  tokenId: number;
};
interface NFTCardDashboardProps {
  data: NFTDataType;
}
const NFTCardDashboard: React.FC<NFTCardDashboardProps> = ({ data }) => {
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
        <div className="flex justify-center p-1 font-mono text-lg font-bold">
          {`#${data.tokenId}`}
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
        </div>
      </div>
    </div>
  );
};

export default NFTCardDashboard;
