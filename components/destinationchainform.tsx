"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";
import LoadingModal from "./modal/LoadingModal";
import toast from "react-hot-toast";
import { useSignMessage } from "wagmi";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWallet as useSuiWallet } from "@suiet/wallet-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { getFullnodeUrl, SuiClient } from "@mysten/sui.js/client";

import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { DAO_TREASURY_ADDRESS } from "@app/constants/constant";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  image: z.string().min(10, {
    message: "image must be at least 10 characters.",
  }),
  symbol: z.string().min(1, {
    message: "symbol must be at least 1 character.",
  }),
  owner: z.string().min(20, {
    message: "onwer address must be at least 20 characters.",
  }),

  solowner: z.string().min(20, {
    message: "onwer address must be at least 20 characters.",
  }),

  creatorAddress: z.string().min(20, {
    message: "collection address must be at least 20 characters.",
  }),

  supply: z.string().min(0, {
    message: "supply must be at least 1 characters.",
  }),
  royalty: z.string().min(0, {
    message: "royalty must be at least 1 characters.",
  }),
  collectionAddress: z.string().min(20, {
    message: "Collection must be at least 20 characters.",
  }),
  description: z.string().min(5, {
    message: "Collection must be at least 5 characters.",
  }),
});

interface DestinationChainFromProps {}

const DestinationChainFrom: React.FC<DestinationChainFromProps> = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const projectData = useAppSelector(
    (state) => state.projectDataReducer.ProjectData
  );
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: projectData.name,
      image: projectData.image,
      owner: projectData.ownerAddress,
      symbol: projectData.symbol,
      supply: projectData.collectionSupply,
      creatorAddress: "",
      solowner: "",
      royalty: "500",
      collectionAddress: projectData.collectionAddress,
      description: "",
    },
  });

  const { data, error, signMessage, variables, isSuccess, status } =
    useSignMessage();
  const message =
    "I am signing for confirmation to move my project from ETHEREUM to SUI and I am paying 10 SUI to PORTDAO deployed on SUI";
  const waitForSignatureEth = async () => {
    signMessage({ message });
  };

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const wallet = useSuiWallet();

  const sendSolToDAOTreasury = async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(DAO_TREASURY_ADDRESS),
        lamports: 0.1 * LAMPORTS_PER_SOL,
      })
    );

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    const signature = await sendTransaction(transaction, connection, {
      minContextSlot,
    });

    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature,
    });
    return signature;
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!wallet.connected) {
      toast.error("Please connect SUI wallet");
      return;
    }
    setIsLoading(true);

    //const signature = await sendSolToDAOTreasury();
    await waitForSignatureEth();
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const data = {
      ...values,
      projectId: projectData.projectId,
      suiAddress: wallet.address,
    };

    axios
      .post("/api/port", data)
      .then((res) => {
        setIsLoading(false);
        console.log("Res", res);
        toast.success("Project ported succesfully");
      })
      .catch((error: AxiosError) => {
        console.log("Error while verifying project");
        toast.error("Error while verifying project");
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Degods" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Symbol</FormLabel>
              <FormControl>
                <Input placeholder="DGOD" {...field} />
              </FormControl>
              <FormDescription>This is your collection symbol.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner Address</FormLabel>
              <FormControl>
                <Input placeholder="0x802D8....1adde57" {...field} />
              </FormControl>
              <FormDescription>Owner Address on ETH</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="solowner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SUI Owner Address</FormLabel>
              <FormControl>
                <Input placeholder="3jnUm....iBmp4G" {...field} />
              </FormControl>
              <FormDescription>Owner Address on SUI</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="creatorAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Creator Address</FormLabel>
              <FormControl>
                <Input placeholder="3jnUm....iBmp4G" {...field} />
              </FormControl>
              <FormDescription>Royalty Wallet Address</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supply"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Supply</FormLabel>
              <FormControl>
                <Input placeholder="10000" {...field} />
              </FormControl>
              <FormDescription>Supply of Collection on Solana</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="royalty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Creator Royalty</FormLabel>
              <FormControl>
                <Input placeholder="5%" {...field} />
              </FormControl>
              <FormDescription>
                Creator Royalty of Collection on Solana
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="collectionAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Address</FormLabel>
              <FormControl>
                <Input placeholder="5%" {...field} />
              </FormControl>
              <FormDescription>Collection Address on ETh</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="ABC.." {...field} />
              </FormControl>
              <FormDescription>Description of your project</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col justify-center">
          {" "}
          <Button type="submit">Confirm and Port to SUI</Button>
        </div>
      </form>
      {isLoading && <LoadingModal />}
    </Form>
  );
};

export default DestinationChainFrom;
