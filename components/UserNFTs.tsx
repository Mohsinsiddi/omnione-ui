import React from "react";
import NFTCardDashboard from "./NFTCardDashboard";
import { useNetwork } from "wagmi";

interface UserNFTDashboardProps {}
const UserNFTDashboard: React.FC<UserNFTDashboardProps> = () => {
  const network = useNetwork();
  const chainName = network.chain?.name.toLocaleUpperCase();
  const nfts = [
    {
      image:
        "https://nftevening.com/wp-content/uploads/2022/09/degods-nft-sell.jpg",
      name: "Degods",
      collectionAddressOnEth: "0XJYTRFG90876TRFGYUIJHUY7689IOUJHKOI978",
      tokenId: 123,
    },
    {
      image:
        "https://cryptopotato.com/wp-content/uploads/2022/01/img5_bayc.jpg",
      name: "BAYC",
      collectionAddressOnEth: "0XJYTRFG90876TRFGYUIJHUY7689IOUJHKOI978",
      tokenId: 123,
    },
    {
      image: "https://d1hd4of44043uc.cloudfront.net/Doodles_409d136a2d.jpg",
      name: "DOODLES",
      collectionAddressOnEth: "0XJYTRFG90876TRFGYUIJHUY7689IOUJHKOI978",
      tokenId: 123,
    },
    {
      image:
        "https://nftevening.com/wp-content/uploads/2022/09/degods-nft-sell.jpg",
      name: "Degods",
      isVerified: true,
      collectionAddressOnEth: "0XJYTRFG90876TRFGYUIJHUY7689IOUJHKOI978",
      tokenId: 123,
    },
    {
      image:
        "https://cryptopotato.com/wp-content/uploads/2022/01/img5_bayc.jpg",
      name: "BAYC",
      isVerified: true,
      collectionAddressOnEth: "0XJYTRFG90876TRFGYUIJHUY7689IOUJHKOI978",
      tokenId: 123,
    },
    {
      image: "https://d1hd4of44043uc.cloudfront.net/Doodles_409d136a2d.jpg",
      name: "DOODLES",
      isVerified: true,
      collectionAddressOnEth: "0XJYTRFG90876TRFGYUIJHUY7689IOUJHKOI978",
      tokenId: 123,
    },
    {
      image:
        "https://nftevening.com/wp-content/uploads/2022/09/degods-nft-sell.jpg",
      name: "Degods",
      isVerified: true,
      collectionAddressOnEth: "0XJYTRFG90876TRFGYUIJHUY7689IOUJHKOI978",
      tokenId: 123,
    },
    {
      image:
        "https://cryptopotato.com/wp-content/uploads/2022/01/img5_bayc.jpg",
      name: "BAYC",
      isVerified: true,
      collectionAddressOnEth: "0XJYTRFG90876TRFGYUIJHUY7689IOUJHKOI978",
      tokenId: 123,
    },
    {
      image: "https://d1hd4of44043uc.cloudfront.net/Doodles_409d136a2d.jpg",
      name: "DOODLES",
      collectionAddressOnEth: "0XJYTRFG90876TRFGYUIJHUY7689IOUJHKOI978",
      tokenId: 123,
    },
    {
      image: "https://d1hd4of44043uc.cloudfront.net/Doodles_409d136a2d.jpg",
      name: "DOODLES",
      isVerified: true,
      collectionAddressOnEth: "0XJYTRFG90876TRFGYUIJHUY7689IOUJHKOI978",
      tokenId: 123,
    },
    {
      image:
        "https://nftevening.com/wp-content/uploads/2022/09/degods-nft-sell.jpg",
      name: "Degods",
      isVerified: true,
      collectionAddressOnEth: "0XJYTRFG90876TRFGYUIJHUY7689IOUJHKOI978",
      tokenId: 123,
    },
    {
      image:
        "https://cryptopotato.com/wp-content/uploads/2022/01/img5_bayc.jpg",
      name: "BAYC",
      isVerified: true,
      collectionAddressOnEth: "0XJYTRFG90876TRFGYUIJHUY7689IOUJHKOI978",
      tokenId: 123,
    },
    {
      image: "https://d1hd4of44043uc.cloudfront.net/Doodles_409d136a2d.jpg",
      name: "DOODLES",
      collectionAddressOnEth: "0XJYTRFG90876TRFGYUIJHUY7689IOUJHKOI978",
      tokenId: 123,
    },
    {
      image: "https://d1hd4of44043uc.cloudfront.net/Doodles_409d136a2d.jpg",
      name: "DOODLES",
      isVerified: true,
      collectionAddressOnEth: "0XJYTRFG90876TRFGYUIJHUY7689IOUJHKOI978",
      tokenId: 123,
    },
    {
      image:
        "https://nftevening.com/wp-content/uploads/2022/09/degods-nft-sell.jpg",
      name: "Degods",
      isVerified: true,
      collectionAddressOnEth: "0XJYTRFG90876TRFGYUIJHUY7689IOUJHKOI978",
      tokenId: 123,
    },
    {
      image:
        "https://cryptopotato.com/wp-content/uploads/2022/01/img5_bayc.jpg",
      name: "BAYC",
      isVerified: true,
      collectionAddressOnEth: "0XJYTRFG90876TRFGYUIJHUY7689IOUJHKOI978",
      tokenId: 123,
    },
    {
      image: "https://d1hd4of44043uc.cloudfront.net/Doodles_409d136a2d.jpg",
      name: "DOODLES",
      collectionAddressOnEth: "0XJYTRFG90876TRFGYUIJHUY7689IOUJHKOI978",
      tokenId: 123,
    },
  ];
  return (
    <div className="flex flex-col mt-4 space-y-4 w-screen h-[100%] max-h-[44rem] self-start overflow-y-scroll">
      <div>
        <div className=" flex justify-center items-center font-mono text-gray-400 text-3xl font-extrabold ml-4 mb-2 underline">
          {`YOUR ${chainName} NFT's`}
        </div>
        <div className="flex flex-wrap pl-1 gap-[3px]">
          {nfts.map((nft, key) => (
            <NFTCardDashboard data={nft} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserNFTDashboard;
