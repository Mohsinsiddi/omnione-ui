import * as React from "react";
import { SwapCard, SwapCardProps } from "./SwapCard";

type EthSwapMultipleArgs = {
  contractAddress: string;
  tokenId: string;
};

type EthereumNFT = {
  description: string;
  image: string;
  contractAddress: string;
  name: string;
  symbol: string;
  tokenId: string;
  tokenType: string;
};

type SolanaNFT = {
  description: string;
  image: string;
  mintAddress: string;
  name: string;
  symbol: string;
};

type NFT = EthereumNFT | SolanaNFT;

interface SwapDetailsProps {
  functionName: string;
  functionArgs: any;
  walletNFTs: NFT[];
}

const SwapDetails: React.FC<SwapDetailsProps> = ({
  functionName,
  functionArgs,
  walletNFTs,
}) => {
  const getSwapData = (): SwapCardProps => {
    switch (functionName) {
      case "swapNFTSolanaToEthereumByName":
        const solNFTByName = walletNFTs.find(
          (nft) =>
            nft.name.toLowerCase() === functionArgs.NFTName.toLowerCase() &&
            "mintAddress" in nft
        ) as SolanaNFT;

        if (solNFTByName) {
          return {
            functionName: functionName,
            name: solNFTByName.name,
            mintAddress: solNFTByName.mintAddress,
          };
        }
        break;

      case "swapNFTEthereumToSuiByName":
        const ethNFTByName = walletNFTs.find(
          (nft) =>
            nft.name.toLowerCase() === functionArgs.NFTName.toLowerCase() &&
            "contractAddress" in nft
        ) as EthereumNFT;

        if (ethNFTByName) {
          console.log("ethNFTByName", ethNFTByName);
          return {
            functionName: functionName,
            name: ethNFTByName.name,
            contractAddress: ethNFTByName.contractAddress,
            tokenId: ethNFTByName.tokenId,
            tokenType: ethNFTByName.tokenType,
            image: ethNFTByName.image,
          };
        }
        break;

      case "swapNFTSolanaToEthereum":
        const solNFT = walletNFTs.find(
          (nft) =>
            "mintAddress" in nft && nft.mintAddress === functionArgs.mintAddress
        ) as SolanaNFT;

        if (solNFT) {
          return {
            functionName: functionName,
            name: solNFT.name,
            mintAddress: solNFT.mintAddress,
          };
        }
        break;

      case "swapNFTEthereumToSui":
        const ethNFT = walletNFTs.find(
          (nft) =>
            "contractAddress" in nft &&
            nft.contractAddress === functionArgs.contractAddress &&
            nft.tokenId === functionArgs.tokenId
        ) as EthereumNFT;

        if (ethNFT) {
          return {
            functionName: functionName,
            name: ethNFT.name,
            contractAddress: ethNFT.contractAddress,
            tokenId: ethNFT.tokenId,
            tokenType: ethNFT.tokenType,
          };
        }
        break;

      case "swapMultipleNFTsSolanaToEthereumByName":
        const multipleSolNFTsByName = walletNFTs.filter(
          (nft) =>
            "name" in nft &&
            functionArgs.NFTNames.map((name: string) =>
              name.toLowerCase()
            ).includes(nft.name.toLowerCase())
        ) as SolanaNFT[];

        if (multipleSolNFTsByName.length === functionArgs.NFTNames.length) {
          return {
            functionName: functionName,
            names: multipleSolNFTsByName.map((nft) => nft.name),
            mintAddresses: multipleSolNFTsByName.map((nft) => nft.mintAddress),
          };
        }
        break;

      case "swapMultipleNFTsEthereumToSolanaByName":
        const multipleEthNFTsByName = walletNFTs.filter(
          (nft) =>
            "name" in nft &&
            functionArgs.NFTNames.map((name: string) =>
              name.toLowerCase()
            ).includes(nft.name.toLowerCase())
        ) as EthereumNFT[];

        if (multipleEthNFTsByName.length === functionArgs.NFTNames.length) {
          return {
            functionName: functionName,
            names: multipleEthNFTsByName.map((nft) => nft.name),
            contractAddresses: multipleEthNFTsByName.map(
              (nft) => nft.contractAddress
            ),
            tokenIds: multipleEthNFTsByName.map((nft) => nft.tokenId),
            tokenTypes: multipleEthNFTsByName.map((nft) => nft.tokenType),
          };
        }
        break;

      case "swapMultipleNFTsSolanaToEthereum":
        const multipleSolNFTs = walletNFTs.filter(
          (nft) =>
            "mintAddress" in nft &&
            functionArgs.mintAddresses.includes(nft.mintAddress)
        ) as SolanaNFT[];

        if (multipleSolNFTs.length === functionArgs.mintAddresses.length) {
          return {
            functionName: functionName,
            names: multipleSolNFTs.map((nft) => nft.name),
            mintAddresses: multipleSolNFTs.map((nft) => nft.mintAddress),
          };
        }
        break;

      case "swapMultipleNFTsEthereumToSolana":
        const multipleEthNFTs = walletNFTs.filter(
          (nft) =>
            "contractAddress" in nft &&
            functionArgs.NFTs.some(
              (arg: EthSwapMultipleArgs) =>
                arg.contractAddress === nft.contractAddress &&
                arg.tokenId === nft.tokenId
            )
        ) as EthereumNFT[];

        if (multipleEthNFTs.length === functionArgs.NFTs.length) {
          return {
            functionName: functionName,
            names: multipleEthNFTs.map((nft) => nft.name),
            contractAddresses: multipleEthNFTs.map(
              (nft) => nft.contractAddress
            ),
            tokenIds: multipleEthNFTs.map((nft) => nft.tokenId),
            tokenTypes: multipleEthNFTs.map((nft) => nft.tokenType),
          };
        }
        break;

      default:
        return { error: "Invalid swap function!" };
    }
    return { error: "NFT not found in the wallet!" };
  };

  return <SwapCard {...getSwapData()} />;
};

export default SwapDetails;
