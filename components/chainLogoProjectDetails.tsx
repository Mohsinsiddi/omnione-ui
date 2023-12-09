import Image from "next/image";
import React, { SetStateAction, useEffect, useState } from "react";

interface ChainLogoRendererProps {
  logo: string;
  chains: string[];
  setChains: React.Dispatch<React.SetStateAction<string[]>>;
}

const ChainLogoRenderer: React.FC<ChainLogoRendererProps> = ({
  logo,
  chains,
  setChains,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    async function fetch() {
      if (isSelected) {
        setChains([...chains, logo]);
      } else {
        const _chains = chains.filter((chain) => chain !== logo);
        setChains(_chains);
      }
    }
    fetch();
  }, [isSelected]);

  return (
    <div
      className={`${
        isSelected ? "border-[2px] border-green-300 p-[2px] rounded-md" : ""
      }`}
      onClick={(e) => setIsSelected(!isSelected)}
    >
      <Image src={logo} height={40} width={40} alt="" />
    </div>
  );
};

export default ChainLogoRenderer;
