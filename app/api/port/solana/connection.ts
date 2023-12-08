import { Connection, Keypair } from "@solana/web3.js";
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} from "@metaplex-foundation/js";
import bs58 from "bs58";

const QUICKNODE_RPC = process.env.DEVNET_RPC_URL;
export const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC!);

const pvtKey = process.env.PRIVATE_KEY;
export const keypair_secret = Keypair.fromSecretKey(bs58.decode(pvtKey!));
const metaplex = Metaplex.make(SOLANA_CONNECTION)
  .use(keypairIdentity(keypair_secret))
  .use(
    bundlrStorage({
      address: "https://devnet.bundlr.network",
      providerUrl: QUICKNODE_RPC,
      timeout: 60000,
    })
  );

export default metaplex;
