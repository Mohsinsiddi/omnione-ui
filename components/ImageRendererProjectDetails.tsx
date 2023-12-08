"use client";

import Image from "next/image";
import React, { useState } from "react";

interface ImageRenderProps {
  imageUrl: string;
  callBackImageUrl: string;
}

const ImageRenderProjectDetails: React.FC<ImageRenderProps> = ({
  imageUrl,
  callBackImageUrl,
}) => {
  if (!callBackImageUrl) {
    callBackImageUrl =
      "https://res.cloudinary.com/coin-nft/image/upload/q_auto,w_569/f_auto/v1/cache/1/c9/18/c9180ebfaa8ce2c6f2f2b8f3ce27dd449d352a13cc5ec3cf9d57f822512a9211-NGUzZDA2MzMtM2I4Zi00ZjRmLTlhZjgtYjM0NWFhMWE5Yzgy";
  }
  const [imgSrc, setImgSrc] = useState(imageUrl);

  return (
    <div className="relative w-80 h-80 sm:w-80 sm:h-80 md:w-[480px] md:h-[480px] lg:w-[600px] lg:h-[600px] xl:w-[600px] xl:h-[600px]">
      <Image
        alt="eth-nft-image"
        fill
        sizes="100%"
        src={imgSrc}
        className="object-cover rounded-md"
        onError={() => {
          setImgSrc(callBackImageUrl);
        }}
      />
    </div>
  );
};
export default ImageRenderProjectDetails;
