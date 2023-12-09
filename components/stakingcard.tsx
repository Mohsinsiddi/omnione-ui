import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
  ButtonGroup,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction,
  useSwitchNetwork,
  useWaitForTransaction,
} from "wagmi";
import { prepareData } from "@zetachain/toolkit/helpers";
import { getAddress } from "@zetachain/protocol-contracts";

import {
  BSC_TESTNET,
  ETH_TESTNET,
  POLY_TESTNET,
  ZETACHAIN_OMNISTAKING_CONTRACT_ADDRESS,
} from "@app/web3const/address";
import { formatEther, parseEther } from "viem";
import toast from "react-hot-toast";
import { ethers } from "ethers";

import ABI from "../app/web3const/OmniStaking.json";
const StakingCard = () => {
  const stake_data = prepareData(
    ZETACHAIN_OMNISTAKING_CONTRACT_ADDRESS,
    ["uint8"],
    ["1"]
  );
  const unstake_data = prepareData(
    ZETACHAIN_OMNISTAKING_CONTRACT_ADDRESS,
    ["uint8"],
    ["2"]
  );

  const set_beneficiary_data = prepareData(
    ZETACHAIN_OMNISTAKING_CONTRACT_ADDRESS,
    ["uint8"],
    ["3"]
  );

  const set_withdraw_data = prepareData(
    ZETACHAIN_OMNISTAKING_CONTRACT_ADDRESS,
    ["uint8"],
    ["4"]
  );

  const ETH_ID = "11155111";
  const POLYGON_ID = "80001";
  const BSC_ID = "97";

  const { chain } = useNetwork();
  const {
    chains,
    error,
    isLoading: XYZ,
    pendingChainId,
    switchNetwork,
  } = useSwitchNetwork();
  const account = useAccount();
  const { data, isError } = useBalance({
    address: account.address,
    formatUnits: "ether",
  });

  const toAddressETH = getAddress("tss", ETH_TESTNET);
  const toAddressPOLY = getAddress("tss", POLY_TESTNET);
  const toAddressBSC = getAddress("tss", BSC_TESTNET);

  const [isStaking, setIsStaking] = useState(true);
  const [isSwapping, setIsSwapping] = useState(false);
  const [maxAmount, setMaxAmount] = useState("0");

  const [stakedAmount, setStakedAmount] = useState("");
  const [unStakedAmount, setUnStakedAmount] = useState(
    data?.formatted?.slice(0, 6)
  );
  const [omniWallet, setOmniWallet] = useState("");
  const [omniClaimable, setOmniClaimAble] = useState("");

  const handleMaxAmount = () => {
    if (isSwapping) {
      setMaxAmount(unStakedAmount!);
    } else {
      if (isStaking) {
        setMaxAmount(unStakedAmount!);
      } else {
        setMaxAmount(stakedAmount);
      }
    }
  };

  const { config } = usePrepareSendTransaction({
    to: toAddressETH,
    value: isStaking ? parseEther(maxAmount) : parseEther("0"),
    data: isStaking
      ? (stake_data as `0x${string}`)
      : (unstake_data as `0x${string}`),
  });
  const {
    data: zetaomniData,
    isLoading: zetaIsLoading,
    isSuccess: zetaIsSucess,
    sendTransaction,
  } = useSendTransaction(config);

  const zetaomniTx = useWaitForTransaction({
    hash: zetaomniData?.hash,
  });

  useEffect(() => {
    async function fetch() {
      try {
        if (zetaomniTx.isSuccess) {
          isStaking
            ? toast.success("You have successfully staked")
            : toast.success("You have successfully unstaked");
        }
      } catch (error) {
        toast.error("Error while staking");
      } finally {
      }
    }
    fetch();
  }, [zetaomniTx]);

  useEffect(() => {
    console.log("1");
  }, [isStaking, isSwapping]);

  const stakehandler = () => {
    sendTransaction?.();
  };

  const unstakehandler = () => {
    sendTransaction?.();
  };

  useEffect(() => {
    async function fetch() {
      try {
        let provider = new ethers.providers.JsonRpcProvider(
          "https://zetachain-athens-evm.blockpi.network/v1/rpc/public"
        );

        let contract = new ethers.Contract(
          ZETACHAIN_OMNISTAKING_CONTRACT_ADDRESS,
          ABI.abi,
          provider
        );

        const balance = await contract.balanceOf(account.address);
        const rewardsToClaim = await contract.queryRewards(
          account.address,
          chain?.id
        );
        const stakedAmount = await contract.omnistake(
          account.address,
          chain?.id
        );
        const data = formatEther(balance);
        setOmniWallet(data);
        const dataStaked = formatEther(stakedAmount);
        setStakedAmount(dataStaked);
        const dataToClaim = formatEther(rewardsToClaim);
        setOmniClaimAble(dataToClaim);
      } catch (error) {
      } finally {
      }
    }
    fetch();
  }, [chain, account]);

  return (
    <div>
      <Card className="w-full max-w-[30rem] shadow-lg">
        <CardHeader floated={false} color="blue-gray">
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
          <IconButton
            size="sm"
            color="red"
            variant="text"
            className="!absolute top-4 right-4 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </IconButton>
        </CardHeader>
        <CardBody>
          <div className="mb-1 flex items-center justify-center">
            <Typography variant="h5" color="blue-gray" className="font-medium">
              OMNIONE Token, ZETACHAIN
            </Typography>
          </div>
          <Typography
            color="black"
            className="flex justify-center items-center"
          >
            Stake Native Assets on ETH, BSC, POLYGON, BITCOIN to earn OMNIONE
            token as rewards
          </Typography>
          <div>
            <ButtonGroup
              color="gray"
              className="flex justify-center items-center mb-2"
            >
              <Button
                onClick={() => {
                  switchNetwork?.(Number(ETH_ID));
                }}
              >
                ETH
              </Button>
              <Button onClick={() => switchNetwork?.(Number(POLYGON_ID))}>
                POLYGON
              </Button>
              <Button
                onClick={() => {
                  switchNetwork?.(Number(BSC_ID));
                }}
              >
                BSC
              </Button>
              <Button onClick={() => {}}>BITCOIN</Button>
            </ButtonGroup>
          </div>
          <div className="flex flex-col mb-4">
            <div className="flex justify-between items-center">
              <div className="text-lg font-extrabold">Connected Chain:</div>
              <div>{chain?.name.toUpperCase()}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-lg font-extrabold">STAKED ASSETS:</div>
              <div>{`${stakedAmount} ${chain?.nativeCurrency.symbol}`}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-lg font-extrabold">UNSTAKED ASSETS:</div>
              <div>{`${unStakedAmount} ${chain?.nativeCurrency.symbol}`}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-lg font-extrabold">OMNIONE in Wallet:</div>
              <div>{`${omniWallet} $OMNI`}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-lg font-extrabold">OMNIONE to Claim:</div>
              <div>{`${omniClaimable} $OMNI`}</div>
            </div>
          </div>

          {/* <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
            <Tooltip content="$129 per night">
              <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                    clipRule="evenodd"
                  />
                  <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                </svg>
              </span>
            </Tooltip>
            <Tooltip content="Free wifi">
              <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.062 0 8.25 8.25 0 00-11.667 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.204 3.182a6 6 0 018.486 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0 3.75 3.75 0 00-5.304 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182a1.5 1.5 0 012.122 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0l-.53-.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Tooltip>
            <Tooltip content="2 bedrooms">
              <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
              </span>
            </Tooltip>
            <Tooltip content={`65" HDTV`}>
              <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M19.5 6h-15v9h15V6z" />
                  <path
                    fillRule="evenodd"
                    d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 006 21h12a.75.75 0 000-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375zm0 13.5h17.25a.375.375 0 00.375-.375V4.875a.375.375 0 00-.375-.375H3.375A.375.375 0 003 4.875v11.25c0 .207.168.375.375.375z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Tooltip>
            <Tooltip content="Fire alert">
              <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Tooltip>
            <Tooltip content="And +20 more">
              <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                +20
              </span>
            </Tooltip>
          </div> */}
          <div>
            <ButtonGroup className="flex justify-center items-center mb-2">
              <Button
                onClick={() => {
                  setIsStaking(true);
                  setIsSwapping(false);
                }}
              >
                Stake
              </Button>
              <Button
                onClick={() => {
                  setIsStaking(false);
                  setIsSwapping(false);
                }}
              >
                Unstake
              </Button>
              <Button onClick={() => setIsSwapping(true)}>C-SWAP</Button>
            </ButtonGroup>
          </div>

          <div className="flex gap-x-2 justify-center mb-2">
            <div className="flex justify-center items-center ">
              <Input
                label="$OMNI token amount..."
                crossOrigin={undefined}
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={handleMaxAmount}>MAX</Button>
            </div>
          </div>
          {isSwapping && (
            <div className="flex justify-center">
              <div className="w-72 mb-2 mt-2 ">
                <Select label="Select Destination Blockchain">
                  <Option>Ethereum</Option>
                  <Option>Binanace Smart Chain</Option>
                  <Option>Polygon</Option>
                  <Option>Bitcoin</Option>
                </Select>
              </div>
            </div>
          )}
        </CardBody>
        <CardFooter className="pt-3">
          {isSwapping ? (
            <div>
              <Button size="lg" fullWidth={true}>
                SWAP
              </Button>
            </div>
          ) : (
            <div>
              {isStaking ? (
                <Button size="lg" fullWidth={true} onClick={stakehandler}>
                  STAKE
                </Button>
              ) : (
                <Button size="lg" fullWidth={true} onClick={unstakehandler}>
                  UNSTAKE
                </Button>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default StakingCard;
