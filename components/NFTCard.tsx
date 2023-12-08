import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@components/ui/context-menu";
import Image from "next/image";

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

interface NFTCardProps {
  nft: NFT;
  onSwap: (details: any) => void;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, onSwap }) => {
  // const renderLink = () => {
  // 	if ('mintAddress' in nft) {
  // 		return <a href={`https://solscan.io/token/${nft.mintAddress}`} target="_blank" rel="noopener noreferrer">
  // 			<img src={nft.image} alt={nft.name} className='w-full rounded-md' />
  // 		</a>
  // 	} else if ('contractAddress' in nft) {
  // 		return <a href={`https://sepolia.etherscan.io/token/${nft.contractAddress}?a=${nft.tokenId}`} target="_blank" rel="noopener noreferrer">
  // 			<img src={nft.image} alt={nft.name} className='w-full rounded-md' />
  // 		</a>
  // 	}
  // };
  const renderLink = () => {
    if ("mintAddress" in nft) {
      return (
        <a
          href={`https://solscan.io/token/${nft.mintAddress}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={nft.image}
            alt={nft.name}
            width={500}
            height={500}
            className="rounded-md"
          />
        </a>
      );
    } else if ("contractAddress" in nft) {
      return (
        <a
          href={`https://sepolia.etherscan.io/token/${nft.contractAddress}?a=${nft.tokenId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={nft.image}
            alt={nft.name}
            width={500}
            height={500}
            className="rounded-md"
          />
        </a>
      );
    }
  };

  const handleSwapClick = () => {
    if ("mintAddress" in nft) {
      onSwap({
        functionName: "swapNFTSolanaToEthereum",
        name: nft.name,
        mintAddress: nft.mintAddress,
      });
    } else if ("contractAddress" in nft && "tokenId" in nft) {
      onSwap({
        functionName: "swapNFTEthereumToSui",
        name: nft.name,
        contractAddress: nft.contractAddress,
        tokenId: nft.tokenId,
        tokenType: nft.tokenType,
      });
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className="max-w-lg rounded-md overflow-hidden border border-gray-700">
        <HoverCard>
          <HoverCardTrigger>
            {renderLink()}
            <div className="px-4 py-2">
              <div className="font-bold text-white text-sm">{nft.name}</div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src={nft.image} />
                <AvatarFallback>NFT</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{nft.name}</h4>
                <p className="text-sm">{nft.description}</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-10">
        <ContextMenuItem inset onClick={handleSwapClick}>
          Swap Me Mommy
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default NFTCard;
