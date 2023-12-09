"use client";

import React, { FC, useMemo } from "react";
import { WalletProvider } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";

type Props = {
  children?: React.ReactNode;
};

export const SuiProvider: FC<Props> = ({ children }) => {
  return <WalletProvider>{children}</WalletProvider>;
};
