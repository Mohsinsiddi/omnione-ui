import Image from "next/image";
import React, { useState } from "react";

interface ChainLogoRendererProps {
  logo: string;
}

const ChainLogoRenderer: React.FC<ChainLogoRendererProps> = ({ logo }) => {
  const [isSelected, setIsSelected] = useState(false);

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
