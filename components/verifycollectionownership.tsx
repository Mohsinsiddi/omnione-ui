import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useAccount, useSignMessage } from "wagmi";
import { recoverMessageAddress } from "viem";
import { Alchemy, Network, NftContract } from "alchemy-sdk";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import ImageRenderPortProjects from "./ImageRendererPortProjects";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const mainnet_config = {
  apiKey: "RgOrfKi165dSVp2dBMORjWgib8vMM_U6", // Replace with your API key
  network: Network.ETH_MAINNET, // Replace with your network
};

const testnet_config = {
  apiKey: "RgOrfKi165dSVp2dBMORjWgib8vMM_U6", // Replace with your API key
  network: Network.ETH_SEPOLIA, // Replace with your network
};

interface VerifyCollectionOwnership {}

const VerifyCollectionOwnership: React.FC<VerifyCollectionOwnership> = () => {
  const { address, connector, isConnected } = useAccount();

  const fallBackImg =
    "https://res.cloudinary.com/coin-nft/image/upload/q_auto,w_569/f_auto/v1/cache/1/c9/18/c9180ebfaa8ce2c6f2f2b8f3ce27dd449d352a13cc5ec3cf9d57f822512a9211-NGUzZDA2MzMtM2I4Zi00ZjRmLTlhZjgtYjM0NWFhMWE5Yzgy";

  const [isLoading, setIsLoading] = useState(false);
  const [isMainnet, setIsMainnet] = useState(false);
  const [isPreviewed, setIsPreviwed] = useState(false);
  const [collectionAdd, setCollectionAddr] = useState("");
  const [testnetCollectionImageUrl, setCollectionImageUrl] = useState("");
  const [collectionInfo, setCollectionInfo] = useState<NftContract>();
  const config = isMainnet ? mainnet_config : testnet_config;
  const alchemy = new Alchemy(config);
  const message =
    "I am signing and confirming that, I am the creator of this collection on Ethereum and wanted to verify this for Omniport protocol so that once approved I can migrate my project to Solana on behalf of my community and for the betterment of ecosystem";

  const { data, error, signMessage, variables, isSuccess, status } =
    useSignMessage();
  useEffect(() => {
    async function regsiterProject() {
      const apidata = {
        name: collectionInfo?.name,
        type: collectionInfo?.tokenType,
        supply: collectionInfo?.totalSupply,
        collectionAddress: collectionInfo?.address,
        symbol: collectionInfo?.symbol,
        image: isMainnet
          ? collectionInfo?.openSea?.imageUrl
          : testnetCollectionImageUrl,
        walletAddress: address,
        signature: data,
      };
      axios
        .post("/api/projects", apidata)
        .then((res) => {
          console.log("Res", res);
          toast.success("Succesfully Imported Project!");
        })
        .catch((error: AxiosError) => {
          console.log("Error while verifying project");
          toast.success("Error while verifying project");
        })
        .finally(() => setIsLoading(false));
    }
    if (data && status === "success") {
      regsiterProject();
    }
  }, [data, status]);

  const handleVerifyOwnership = async () => {
    try {
      signMessage({ message });
    } catch (error) {
      console.log("handleVerifyOwnership error", error);
    }
  };

  const handleCollectionPreview = async () => {
    if (collectionAdd.length === 0) return;
    try {
      const response = await alchemy.nft.getContractMetadata(collectionAdd);
      console.log("Response", response);
      setIsPreviwed(true);
      setCollectionInfo(response);
    } catch (error) {
      console.log("handleCollectionPreview error", error);
    }
  };

  const switchHandler = () => {
    setIsMainnet(!isMainnet);
  };

  return (
    <div className="flex flex-col w-1/2 items-center gap-2">
      <div className="flex items-center space-x-2">
        <Switch id="mainnet-mode" onCheckedChange={switchHandler} />
        <Label htmlFor="mainnet-mode">Mainnet Mode</Label>
      </div>
      {isMainnet ? (
        <div className="flex flex-col w-1/2 items-center gap-2">
          {" "}
          <Input
            type="text"
            placeholder="Collection Address..."
            className="flex justify-center py-6 mt-2"
            onChange={(event) => setCollectionAddr(event.target.value)}
          />
        </div>
      ) : (
        <div className="flex flex-col w-1/2 items-center gap-2">
          {" "}
          <Input
            type="text"
            placeholder="Collection Address..."
            className="flex justify-center py-6 mt-2"
            onChange={(event) => setCollectionAddr(event.target.value)}
          />
          <Input
            type="text"
            placeholder="Collection Image Url..."
            className="flex justify-center py-6 mt-2"
            onChange={(event) => setCollectionImageUrl(event.target.value)}
          />
        </div>
      )}
      {isPreviewed ? (
        <div className="space-y-2">
          <div className="flex flex-col border-[1px] border-gray-500 rounded-lg">
            <div className="flex justify-center">
              {isMainnet ? (
                <ImageRenderPortProjects
                  imageUrl={
                    collectionInfo?.openSea?.imageUrl === undefined
                      ? fallBackImg
                      : collectionInfo?.openSea?.imageUrl
                  }
                  callBackImageUrl={""}
                />
              ) : (
                <ImageRenderPortProjects
                  imageUrl={testnetCollectionImageUrl}
                  callBackImageUrl={""}
                />
              )}
            </div>
            <div className="flex justify-center font-mono font-bold">
              {collectionInfo?.name?.slice(0, 15)}
            </div>
            <div className="flex justify-center font-mono font-semibold">
              {collectionInfo?.symbol}
            </div>
            <div className="flex justify-center font-mono font-semibold">
              Supply : {collectionInfo?.totalSupply}
            </div>
            <div className="flex justify-center font-mono font-semibold">
              Type : {collectionInfo?.tokenType}
            </div>
            {collectionInfo?.contractDeployer && (
              <div className="flex justify-center font-mono font-semibold">{`${collectionInfo?.contractDeployer?.slice(
                0,
                5
              )}...${collectionInfo?.contractDeployer?.slice(
                collectionInfo?.contractDeployer.length - 5
              )}`}</div>
            )}
          </div>
          <div className="flex justify-center">
            {" "}
            <button
              type="button"
              onClick={handleVerifyOwnership}
              className="py-2 px-2 flex justify-center items-center gap-2 -ml-px rounded-lg first:ml-0  border font-extrabold  bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
            >
              Verify Ownership
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleCollectionPreview}
          className="py-2 px-2 inline-flex justify-center items-center gap-2 -ml-px rounded-lg first:ml-0  border font-extrabold  bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-md dark:bg-slate-300 dark:hover:bg-slate-500 dark:border-gray-700 dark:text-gray-800"
        >
          Preview Collection Details
        </button>
      )}
    </div>
  );
};

export default VerifyCollectionOwnership;
