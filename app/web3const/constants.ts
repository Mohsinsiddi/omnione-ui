export declare type ZetaProtocolAddress =
  | "connector"
  | "erc20Custody"
  | "immutableCreate2Factory"
  | "tss"
  | "tssUpdater"
  | "zetaToken"
  | "zetaTokenConsumerUniV2"
  | "zetaTokenConsumerUniV3";
export declare const zetaProtocolAddress: ZetaProtocolAddress[];
export declare const isZetaProtocolAddress: (
  str: string
) => str is ZetaProtocolAddress;
export declare type ZetaZEVMAddress =
  | "fungibleModule"
  | "systemContract"
  | "uniswapv2Factory"
  | "uniswapv2Router02"
  | "zrc20";
export declare type ZetaProtocolTestNetwork =
  | "baobab_testnet"
  | "bsc_testnet"
  | "goerli_testnet"
  | "mumbai_testnet"
  | "zeta_testnet";
export declare const zetaProtocolTestNetworks: ZetaProtocolTestNetwork[];
export declare type NonZetaAddress =
  | "uniswapV2Router02"
  | "uniswapV3Factory"
  | "uniswapV3Router"
  | "weth9";
export declare const nonZetaAddress: NonZetaAddress[];
export declare type ZetaProtocolMainNetwork = "etherum_mainnet";
export declare const zetaProtocolMainNetworks: ZetaProtocolMainNetwork[];
export declare type ZetaProtocolNetwork =
  | ZetaProtocolMainNetwork
  | ZetaProtocolTestNetwork;
export declare const zetaProtocolNetworks: ZetaProtocolNetwork[];
export declare type ZetaProtocolEnviroment = "mainnet" | "testnet";
export declare const isProtocolNetworkName: (
  str: string
) => str is ZetaProtocolNetwork;
export declare const isTestnetNetwork: (
  network: ZetaProtocolTestNetwork
) => boolean;
export declare const isMainnetNetwork: (
  network: ZetaProtocolTestNetwork
) => boolean;
export declare const getAddress: (
  address: ZetaProtocolAddress | ZetaZEVMAddress,
  network: ZetaProtocolNetwork
) => string;
export declare const getZRC20Address: (network: ZetaProtocolNetwork) => string;
export declare const getNonZetaAddress: (
  address: NonZetaAddress,
  network: ZetaProtocolNetwork
) => string;
