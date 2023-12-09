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
import ProjectDetails from "@components/projectDetails";
import axios from "axios";

interface IParams {
  projectId: string;
}

const Page = async ({ params }: { params: IParams }) => {
  const response = await axios.get(
    `https://gateway.lighthouse.storage/ipfs/${params.projectId}`
  );
  let projectData;
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
      image: response.data.image,
      name: response.data.name,
      isVerified: true,
      collectionAddressOnEth: response.data.baseCollectionAddress,
      createdAt: response.data.createdAt,
      duration: 24 * 60 * 60 * 1000,
      chains: chains,
      baseChainName: response.data.baseChainName,
      totalSupply: response.data.supply,
      price: 1,
    };
    projectData = p_data;
  } else {
    projectData = {
      image:
        "https://nftevening.com/wp-content/uploads/2022/09/degods-nft-sell.jpg",
      name: "Degods",
      isVerified: true,
      collectionAddressOnEth: "0XJYTRFG90876TRFGYUIJHUY7689IOUJHKOI978",
      createdAt: "1701612415000",
      duration: 24 * 60 * 60 * 1000,
      chains: [ETH, POLY, ARB, SCR, MANT, CELO, ZETA, X1, XDC, BASE],
      totalSupply: 10000,
      price: 1,
    };
  }

  // ended - 1670701079000
  // live - 1701462781000
  // upcoming - 1702237079000

  return (
    <div className="">
      <ProjectDetails data={projectData} />
    </div>
  );
};

export default Page;
