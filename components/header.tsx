"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@lib/utils";
import { Button, buttonVariants } from "@components/ui/button";
import { Sidebar } from "@components/sidebar";
// import { SidebarList } from '@components/sidebar-list'
import { SidebarFooter } from "@components/sidebar-footer";
import { ThemeToggle } from "@components/theme-toggle";
import { IconSeparator } from "@/components/ui/icons";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useAppDispatch } from "@redux/hooks";
import { reset, toggle } from "@redux/features/porting";
import { useRouter } from "next/navigation";
import { ConnectButton as SuiConnectButton } from "@suiet/wallet-kit";

export function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleClickCreatorPortal = () => {
    try {
      // dispatch(toggle());
      router.push("/creator");
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleClickOmniOneAI = () => {
    try {
      // dispatch(reset());
      router.push("/chat");
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleClickHome = () => {
    try {
      // dispatch(reset());
      router.push("/");
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleClickLaunchPortal = () => {
    try {
      // dispatch(reset());
      router.push("/launch");
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleClickONSPortal = () => {
    try {
      // dispatch(reset());
      router.push("/ons");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        <Sidebar>
          <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
            <div className="">
              <div
                onClick={handleClickHome}
                className="flex justify-center items-center font-bold border-[1px] border-gray-100 p-2 rounded-lg hover:bg-slate-900 mb-3 mx-4 cursor-pointer"
              >
                Home
              </div>
              <div
                onClick={handleClickCreatorPortal}
                className="flex justify-center items-center font-bold border-[1px] border-gray-100 p-2 rounded-lg hover:bg-slate-900 mb-3 mx-4 cursor-pointer"
              >
                Creator:Portal
              </div>{" "}
              {/* https://user-portal-omniport.vercel.app/ */}
              <Link href="https://user-omniport.vercel.app/">
                {" "}
                <div className="flex justify-center items-center font-bold border-[1px] border-gray-100 p-2 rounded-lg hover:bg-slate-900 mb-3 mx-4 cursor-pointer">
                  User:Portal
                </div>
              </Link>
              <div
                onClick={handleClickLaunchPortal}
                className="flex justify-center items-center font-bold border-[1px] border-gray-100 p-2 rounded-lg hover:bg-slate-900 mb-3 mx-4 cursor-pointer"
              >
                OmniLAUNCH:Portal
              </div>
              <div
                onClick={handleClickONSPortal}
                className="flex justify-center items-center font-bold border-[1px] border-gray-100 p-2 rounded-lg hover:bg-slate-900 mb-3 mx-4 cursor-pointer"
              >
                OmniName Service:Portal
              </div>
              <div
                onClick={handleClickOmniOneAI}
                className="flex justify-center items-center font-bold border-[1px] border-gray-100 p-2 rounded-lg hover:bg-slate-900 mb-3 mx-4 cursor-pointer"
              >
                OmniONE AI:Portal
              </div>
              <Link href="https://arnavs-organization.gitbook.io/omniport-documentation/">
                {" "}
                <div className="flex justify-center items-center font-bold border-[1px] border-gray-100 p-2 rounded-lg hover:bg-slate-900 mb-3 mx-4 cursor-pointer">
                  OmniONE Docs
                </div>
              </Link>
            </div>
          </React.Suspense>
          <SidebarFooter>
            <ThemeToggle />
          </SidebarFooter>
        </Sidebar>
        <div className="flex items-center">
          <IconSeparator className="w-6 h-6 text-muted-foreground/50" />
          <div className="flex items-center justify-end space-x-2 font-extrabold text-2xl font-mono">
            OmniONE
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end">
        {/* <WalletDisconnectButton /> */}
        {/* <WalletMultiButton /> */}
        {/* <SuiConnectButton className="bg-slate-400 h-10 flex justify-center items-center" /> */}
        {/* <IconSeparator className="w-6 h-6 text-muted-foreground/50" /> */}
        <ConnectButton label="Connect Ethereum" />
      </div>
    </header>
  );
}
