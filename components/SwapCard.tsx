import * as React from "react";
import { Button } from "@components/ui/button";
import { Label } from "@components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";

export interface SwapCardProps {
  functionName?: string;
  error?: string;
  name?: string;
  mintAddress?: string;
  contractAddress?: string;
  tokenId?: string;
  tokenType?: string;
  names?: string[];
  mintAddresses?: string[];
  contractAddresses?: string[];
  tokenIds?: string[];
  tokenTypes?: string[];
  image?: string;
}

export const SwapCard: React.FC<SwapCardProps> = (props) => {
  const [swapped, setSwapped] = React.useState(false);
  const [cancelled, setCancelled] = React.useState(false);
  const [swapDirection, setSwapDirection] = React.useState<
    "ETH_TO_SOL" | "SOL_TO_ETH" | null
  >(null);

  const swapEthereumToSolana = (
    contractAddress: string,
    tokenId: string,
    tokenType: string
  ) => {
    console.log("Swapping from Ethereum to Solana with:", {
      contractAddress,
      tokenId,
      tokenType,
    });
    setSwapped(true);
    setSwapDirection("ETH_TO_SOL");
  };

  const swapSolanaToEthereum = (mintAddress: string) => {
    console.log("Swapping from Solana to Ethereum with:", { mintAddress });
    setSwapped(true);
    setSwapDirection("SOL_TO_ETH");
  };

  const handleSwapConfirm = () => {
    if (props.functionName?.includes("Multiple")) {
      props.names?.forEach((_, index) => {
        if (
          props.functionName?.includes("SolanaToEthereum") &&
          props.mintAddresses
        ) {
          swapSolanaToEthereum(props.mintAddresses[index]);
        } else if (
          props.functionName?.includes("EthereumToSolana") &&
          props.contractAddresses &&
          props.tokenIds &&
          props.tokenTypes
        ) {
          swapEthereumToSolana(
            props.contractAddresses[index],
            props.tokenIds[index],
            props.tokenTypes[index]
          );
        }
      });
    } else {
      if (props.functionName?.includes("SolanaToEthereum")) {
        swapSolanaToEthereum(props.mintAddress || "");
      } else if (props.functionName?.includes("EthereumToSolana")) {
        swapEthereumToSolana(
          props.contractAddress || "",
          props.tokenId || "",
          props.tokenType || ""
        );
      }
    }
  };

  const handleSwapCancel = () => {
    console.log("Swap Cancelled.");
    setCancelled(true);
  };

  if (swapped) {
    return (
      <Card className="w-[130px] overflow-y-auto max-h-[72vh] nft-scroll">
        <CardHeader>
          <CardTitle>Swapped</CardTitle>
          <CardDescription>not really</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (cancelled) {
    return (
      <Card className="w-[172px] overflow-y-auto max-h-[72vh] nft-scroll">
        <CardHeader>
          <CardTitle>Not Swapped</CardTitle>
          <CardDescription>really</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (props.error) {
    return (
      <Card className="w-[230px]">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>{props.error}</Label>
        </CardContent>
      </Card>
    );
  }

  switch (props.functionName) {
    case "swapNFTSolanaToEthereumByName":
    case "swapNFTSolanaToEthereum":
      return (
        <Card className="w-[510px] overflow-y-auto max-h-[72vh] nft-scroll">
          <CardHeader>
            <CardTitle>Swap (POLYGON -&gt; Ethereum)</CardTitle>
          </CardHeader>
          <CardContent>
            {props.image && (
              <div className="mb-4">
                <Image
                  src={props.image}
                  alt="fuck"
                  width={320}
                  height={320}
                  className="rounded-md"
                />
              </div>
            )}
            <Label>NFT Name: {props.name}</Label>
            <br />
            <Label>Mint Address: {props.mintAddress}</Label>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleSwapCancel}>
              Cancel
            </Button>
            <Button onClick={handleSwapConfirm}>Confirm</Button>
          </CardFooter>
        </Card>
      );

    case "swapNFTEthereumToSuiByName":
    case "swapNFTEthereumToSui":
      return (
        <Card className="w-[510px] overflow-y-auto max-h-[72vh] nft-scroll">
          <CardHeader>
            <CardTitle>Swap (Ethereum -&gt; POLYGON)</CardTitle>
          </CardHeader>
          <CardContent>
            {props.image && (
              <div className="mb-4 flex justify-center">
                <Image
                  src={props.image}
                  alt="fuck"
                  width={320}
                  height={320}
                  className="rounded-md"
                />
              </div>
            )}
            <Label>NFT Name: {props.name}</Label>
            <br />
            <Label>Contract Address: {props.contractAddress}</Label>
            <br />
            <Label>Token Id: {props.tokenId}</Label>
            <br />
            <Label>Token Type: {props.tokenType}</Label>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleSwapCancel}>
              Cancel
            </Button>
            <Button onClick={handleSwapConfirm}>Confirm</Button>
          </CardFooter>
        </Card>
      );

    case "swapMultipleNFTsSolanaToEthereumByName":
    case "swapMultipleNFTsSolanaToEthereum":
      return (
        <Card className="w-[510px] overflow-y-auto max-h-[72vh] nft-scroll">
          <CardHeader>
            <CardTitle>Swap Multiple (Solana -&gt; Ethereum)</CardTitle>
          </CardHeader>
          <CardContent>
            {props.names &&
              props.names.map((name, index) => (
                <div key={index} className="mb-3">
                  <Label>NFT Name: {name}</Label>
                  <br />
                  <Label>
                    Mint Address:{" "}
                    {props.mintAddresses && props.mintAddresses[index]}
                  </Label>
                </div>
              ))}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleSwapCancel}>
              Cancel
            </Button>
            <Button onClick={handleSwapConfirm}>Confirm</Button>
          </CardFooter>
        </Card>
      );

    case "swapMultipleNFTsEthereumToSolanaByName":
    case "swapMultipleNFTsEthereumToSolana":
      return (
        <Card className="w-[510px] overflow-y-auto max-h-[72vh] nft-scroll">
          <CardHeader>
            <CardTitle>Swap Multiple (Ethereum -&gt; Solana)</CardTitle>
          </CardHeader>
          <CardContent>
            {props.names &&
              props.names.map((name, index) => (
                <div key={index} className="mb-3">
                  <Label>NFT Name: {name}</Label>
                  <br />
                  <Label>
                    Contract Address:{" "}
                    {props.contractAddresses && props.contractAddresses[index]}
                  </Label>
                  <br />
                  <Label>
                    Token Id: {props.tokenIds && props.tokenIds[index]}
                  </Label>
                  <br />
                  <Label>
                    Token Type: {props.tokenTypes && props.tokenTypes[index]}
                  </Label>
                </div>
              ))}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleSwapCancel}>
              Cancel
            </Button>
            <Button onClick={handleSwapConfirm}>Confirm</Button>
          </CardFooter>
        </Card>
      );

    default:
      return (
        <Card className="w-[150px]">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <Label>Unknown Error</Label>
          </CardContent>
        </Card>
      );
  }
};
