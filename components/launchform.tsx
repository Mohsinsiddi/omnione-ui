"use client";

import * as React from "react";
import { useState } from "react";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import {
  useAccount as useEthereumWallet,
  useNetwork,
  useSignMessage,
} from "wagmi";
import Textarea from "react-textarea-autosize";
import { IconArrowElbow } from "@components/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Button } from "@components/ui/button";
import { Skeleton } from "@components/ui/skeleton";
import { SwapCard } from "@components/SwapCard";
import NFTCard from "@components/NFTCard";
import SwapDetails from "@components/SwapDetails";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import lighthouse from "@lighthouse-web3/sdk";
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
import { previewed, resetProjectData } from "@redux/features/portProjectData";
import { reset } from "@redux/features/porting";
import { Label } from "./ui/label";
import { File } from "buffer";
import axios from "axios";
import { DealParameters } from "@lighthouse-web3/sdk/dist/types";
import Image from "next/image";
import { TbExternalLink } from "react-icons/tb";

import {
  Input as MInput,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { LIGHTHOUSE_SDK_VERSION_NAME } from "@app/constants/constant";
import toast from "react-hot-toast";

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

  royaltyAddress: z.string().min(20, {
    message: "collection address must be at least 20 characters.",
  }),
  baseuri: z.string().min(10, {
    message: "baseuri  must be at least 10 characters.",
  }),
  supply: z.string().min(0, {
    message: "supply must be at least 1 characters.",
  }),
  chains: z.array(
    z.string().min(0, {
      message: "atleast select 1 chain",
    })
  ),
  ethSel: z.boolean(),
  polySel: z.boolean(),
  arbitriumSel: z.boolean(),
  scrollSel: z.boolean(),
  mantleSel: z.boolean(),
  baseSel: z.boolean(),
  celoSel: z.boolean(),
  zetaSel: z.boolean(),
  x1Sel: z.boolean(),
  xdcSel: z.boolean(),
  file: z.any(),
  calender: z.any(),
});

const tokenLogo =
  "https://altcoinsbox.com/wp-content/uploads/2023/01/etherscan-logo.png";

const LaunchForm = () => {
  const [date, setDate] = React.useState<Date>();

  const [isTokenGatedUser, setTokenGatedUser] = useState(true);

  const network = useNetwork();
  const baseChainName = network.chain?.name.toLocaleLowerCase();

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
      royaltyAddress: "0x0000000.......I987YU878UYHJK",
      supply: "10000",
      symbol: projectData.symbol,
      baseuri: "",
      chains: [""],
      ethSel: false,
      polySel: false,
      arbitriumSel: false,
      scrollSel: false,
      mantleSel: false,
      baseSel: false,
      celoSel: false,
      zetaSel: false,
      x1Sel: false,
      xdcSel: false,
      calender: "",
    },
  });

  const handleImageSelect = async (file: any) => {
    const API_KEY = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!;
    const output = await lighthouse.upload(file, API_KEY, false);
    form.setValue(
      "image",
      `https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`,
      {
        shouldValidate: true,
      }
    );
  };

  const handleAddChain = (event: any) => {
    const isCheckedEth = document.getElementById("eth")?.ariaChecked;
    const isCheckedPoly = document.getElementById("poly")?.ariaChecked;
    const isCheckedArb = document.getElementById("arb")?.ariaChecked;
    const isCheckedScroll = document.getElementById("scroll")?.ariaChecked;
    const isCheckedMantle = document.getElementById("mantle")?.ariaChecked;
    const isCheckedBase = document.getElementById("base")?.ariaChecked;
    const isCheckedCelo = document.getElementById("celo")?.ariaChecked;
    const isCheckedZeta = document.getElementById("zeta")?.ariaChecked;
    const isCheckedX1 = document.getElementById("x1")?.ariaChecked;
    const isCheckedXDC = document.getElementById("xdc")?.ariaChecked;

    if (isCheckedEth === "true") {
      form.setValue("ethSel", true, {
        shouldValidate: true,
      });
    }
    if (isCheckedEth === "false") {
      form.setValue("ethSel", false, { shouldValidate: true });
    }

    if (isCheckedPoly === "true") {
      form.setValue("polySel", true, {
        shouldValidate: true,
      });
    }
    if (isCheckedPoly === "false") {
      form.setValue("polySel", false, { shouldValidate: true });
    }

    if (isCheckedArb === "true") {
      form.setValue("arbitriumSel", true, {
        shouldValidate: true,
      });
    }
    if (isCheckedArb === "false") {
      form.setValue("arbitriumSel", false, { shouldValidate: true });
    }

    if (isCheckedScroll === "true") {
      form.setValue("scrollSel", true, {
        shouldValidate: true,
      });
    }
    if (isCheckedScroll === "false") {
      form.setValue("scrollSel", false, { shouldValidate: true });
    }

    if (isCheckedMantle === "true") {
      form.setValue("mantleSel", true, {
        shouldValidate: true,
      });
    }
    if (isCheckedMantle === "false") {
      form.setValue("mantleSel", false, { shouldValidate: true });
    }

    if (isCheckedBase === "true") {
      form.setValue("baseSel", true, {
        shouldValidate: true,
      });
    }
    if (isCheckedBase === "false") {
      form.setValue("baseSel", false, { shouldValidate: true });
    }

    if (isCheckedCelo === "true") {
      form.setValue("celoSel", true, {
        shouldValidate: true,
      });
    }
    if (isCheckedCelo === "false") {
      form.setValue("celoSel", false, { shouldValidate: true });
    }

    if (isCheckedZeta === "true") {
      form.setValue("zetaSel", true, {
        shouldValidate: true,
      });
    }
    if (isCheckedZeta === "false") {
      form.setValue("zetaSel", false, { shouldValidate: true });
    }

    if (isCheckedX1 === "true") {
      form.setValue("x1Sel", true, {
        shouldValidate: true,
      });
    }
    if (isCheckedX1 === "false") {
      form.setValue("x1Sel", false, { shouldValidate: true });
    }

    if (isCheckedXDC === "true") {
      form.setValue("xdcSel", true, {
        shouldValidate: true,
      });
    }
    if (isCheckedXDC === "false") {
      form.setValue("xdcSel", false, { shouldValidate: true });
    }
  };

  const { data, error, signMessageAsync, variables, isSuccess, status } =
    useSignMessage();
  const message = `I am signing for confirmation to deploy my ${form.getValues(
    "name"
  )} on selected chains `;
  const waitForSignatureEth = async () => {
    return await signMessageAsync({ message });
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const signature = await waitForSignatureEth();
    const API_KEY = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!;
    // blockchain interaction will return collectionAddress on baseChain and then we will map those with selected chains - [ collectionAddress awill be mapped and index in db]
    const collectionAddress = "0x08767BU78UHJKIOUjhgyuhjk9878iujb087g";
    const launchTimeStamp = new Date(date!).getTime();
    const projectData = {
      name: values.name,
      image: values.image,
      symbol: values.symbol,
      owner: values.owner,
      royaltyAddress: values.royaltyAddress,
      baseUri: values.baseuri,
      supply: values.supply,
      baseChainName: baseChainName,
      baseCollectionAddress: collectionAddress,
      signature: signature,
      createdAt: launchTimeStamp,
      chains: [
        {
          ETH: values.ethSel,
        },
        {
          POLY: values.polySel,
        },
        {
          ARB: values.arbitriumSel,
        },
        {
          SCR: values.scrollSel,
        },
        {
          MANT: values.mantleSel,
        },
        {
          BASE: values.baseSel,
        },
        {
          CELO: values.celoSel,
        },
        {
          ZETA: values.zetaSel,
        },
        {
          X1: values.x1Sel,
        },
        {
          XDC: values.xdcSel,
        },
      ],
    };
    const data = JSON.stringify(projectData, null, "\t");

    const output = await lighthouse.uploadText(
      data,
      API_KEY,
      LIGHTHOUSE_SDK_VERSION_NAME
    );
    if (output.data) {
      toast.success("Project Created to omnilaunch successfully");
    }
    console.log("Output Data hash of create project", output.data);
  }
  return (
    <div className="">
      {isTokenGatedUser ? (
        <div className="w-screen h-100% max-h-[41rem] overflow-y-scroll flex justify-center mt-5">
          <div className="w-2/5 h-[1248px] bg-gray-900 border-[1px] border-gray-600 p-10 rounded-lg shadow-lg bg-opacity-60">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <div className="flex justify-center items-center text-3xl font-extrabold font-mono">
                  OMNILAUNCH
                </div>
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
                      <FormDescription>
                        This is your collection symbol.
                      </FormDescription>
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
                      <FormDescription>
                        Update the project banner
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="royaltyAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Royalty Address</FormLabel>
                      <FormControl>
                        <Input placeholder="0x802D8....1adde57" {...field} />
                      </FormControl>
                      <FormDescription>
                        Update the project banner
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="baseuri"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base URI</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://metadata.degods.com/g/"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Add the project base URI
                      </FormDescription>
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
                      <FormDescription>Supply of Collection</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <>
                      <FormItem>
                        <FormLabel>Collection Image</FormLabel>
                        <FormControl>
                          <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                            <Label htmlFor="image">Image</Label>
                            <Input
                              id="image"
                              type="file"
                              onChange={(e) =>
                                handleImageSelect(e.target.files)
                              }
                              className="file:bg-blue-50 file:text-gray-700 hover:file:bg-blue-100 file:border file:border-solid file:border-gray-700 file:rounded-md border-gray-800"
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Choose best image that bring spirits to your project.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <FormField
                  control={form.control}
                  name="calender"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <>
                      <FormItem>
                        <FormLabel>Launch Date:</FormLabel>
                        <FormControl>
                          <div className="p-[2px]">
                            <Popover placement="bottom">
                              <PopoverHandler>
                                <MInput
                                  label="Select a Date"
                                  onChange={() => null}
                                  value={date ? format(date, "PPP") : ""}
                                  crossOrigin={undefined}
                                />
                              </PopoverHandler>
                              <PopoverContent>
                                <DayPicker
                                  mode="single"
                                  selected={date}
                                  onSelect={setDate}
                                  showOutsideDays
                                  className="border-0"
                                  classNames={{
                                    caption:
                                      "flex justify-center py-2 mb-4 relative items-center",
                                    caption_label:
                                      "text-sm font-medium text-gray-900",
                                    nav: "flex items-center",
                                    nav_button:
                                      "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                    nav_button_previous: "absolute left-1.5",
                                    nav_button_next: "absolute right-1.5",
                                    table: "w-full border-collapse",
                                    head_row: "flex font-medium text-gray-900",
                                    head_cell: "m-0.5 w-9 font-normal text-sm",
                                    row: "flex w-full mt-2",
                                    cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                    day: "h-9 w-9 p-0 font-normal",
                                    day_range_end: "day-range-end",
                                    day_selected:
                                      "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                    day_today:
                                      "rounded-md bg-gray-200 text-gray-900",
                                    day_outside:
                                      "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                    day_disabled: "text-gray-500 opacity-50",
                                    day_hidden: "invisible",
                                  }}
                                  components={{
                                    IconLeft: ({ ...props }) => (
                                      <ChevronLeftIcon
                                        {...props}
                                        className="h-4 w-4 stroke-2"
                                      />
                                    ),
                                    IconRight: ({ ...props }) => (
                                      <ChevronRightIcon
                                        {...props}
                                        className="h-4 w-4 stroke-2"
                                      />
                                    ),
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Choose best image that bring spirits to your project.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />

                <FormField
                  control={form.control}
                  name="chains"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Selected Blockchains</FormLabel>
                      <div
                        onChange={handleAddChain}
                        className="flex space-x-12"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="eth" />
                            <Label htmlFor="eth">Ethereum</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="poly" />
                            <Label htmlFor="poly">Polygon</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="arb" />
                            <Label htmlFor="arb">Arbitrium</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="scroll" />
                            <Label htmlFor="scroll">Scroll</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="mantle" />
                            <Label htmlFor="mantle">Mantle</Label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="base" />
                            <Label htmlFor="base">Base</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="celo" />
                            <Label htmlFor="celo">Celo</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="zeta" />
                            <Label htmlFor="zeta">ZetaChain</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="x1" />
                            <Label htmlFor="x1">OKX X1</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="xdc" />
                            <Label htmlFor="xdc">XDC Network</Label>
                          </div>
                        </div>
                      </div>

                      <FormDescription>
                        Chains NFT Ids (range : (total_supply/number of chains)
                        continuoum on each chain)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex pt-4 justify-center gap-x-1">
                  {" "}
                  <Button type="submit">
                    Confirm and Launch for selected chains
                  </Button>
                  {/* <Button
                    type="reset"
                    onClick={() => {
                      dispatch(resetProjectData());
                      dispatch(reset());
                    }}
                  >
                    Reset
                  </Button> */}
                </div>
              </form>
            </Form>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[44rem] border-[1px] border-gray-400">
          <div className="flex flex-col gap-8">
            <div className="text-4xl font-mono font-extrabold">
              YOU DON'T HAVE ANY OMNIONE ACCESS TOKEN
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="text-xl font-bold font-mono">
                BUY OMNIONE token here:
              </div>
              <div>
                <a
                  href={`https://sepolia.etherscan.io/token/987678iuhjklkjhbvcytu87y`}
                  target="_blank"
                >
                  <div className="flex cursor-pointer">
                    <div>
                      <Image src={tokenLogo} height={24} width={24} alt="" />
                    </div>
                    <div className="pt-[3px] ">
                      <TbExternalLink />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default LaunchForm;
