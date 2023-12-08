"use client";

import { ThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { TooltipProvider } from "@/components/ui/tooltip";
import { EthereumProvider } from "./ethereum";
import { SolanaProvider } from "./solana";
import { SuiProvider } from "./sui";

export function Provider({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider {...props}>
      <TooltipProvider>
        <EthereumProvider>
          <SolanaProvider>
            <SuiProvider>{children}</SuiProvider>
          </SolanaProvider>
        </EthereumProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
