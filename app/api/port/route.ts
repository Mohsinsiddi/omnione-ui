import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

import { ethers, Signer } from "ethers";
import {
  BRDIGE_ABI,
  BRIDGE_CONTRACT_ADDRESS,
} from "./solana/ethereum/constant";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    name,
    symbol,
    creatorAddress,
    image,
    owner,
    royalty,
    solowner,
    supply,
    projectId,
    collectionAddress,
    description,
    suiAddress,
  } = body;

  let user;
  user = await prisma.user.findUnique({
    where: {
      walletAddressOnEth: owner,
    },
  });

  if (!user) {
    return new NextResponse("User doesnt exits for this user address", {
      status: 409,
    });
  }

  const adminPrivKey = process.env.EVM_PRIVATE_KEY;

  const ALCHEMY_RPC = process.env.ALCHEMY_RPC;
  const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_RPC);

  const contractInstance = new ethers.Contract(
    BRIDGE_CONTRACT_ADDRESS,
    BRDIGE_ABI,
    provider
  );
  const wallet = new ethers.Wallet(adminPrivKey as string, provider);

  let feeData = (await provider.getGasPrice()).toNumber();

  let nonce = await provider.getTransactionCount(wallet.address);

  const _endTime = 1000;
  let rawTxn =
    await contractInstance.populateTransaction.whitelistCollectionForPorting(
      collectionAddress,
      _endTime,
      supply,
      royalty,
      name,
      symbol,
      description,
      {
        gasPrice: feeData,
        nonce: nonce,
      }
    );

  let signedTxn = (await wallet).sendTransaction(rawTxn);
  let reciept = (await signedTxn).wait();
  console.log("reciept", reciept);

  const project = await prisma.project.update({
    where: {
      id: projectId,
    },
    include: {
      user: true,
    },
    data: {
      destinationChain: "SUI",
      isPorted: true,
      creatorAddresOnSol: creatorAddress,
      sellerBasisPointOnSol: royalty,
      ownerAddresOnSol: suiAddress,
    },
  });

  const portAcitivity = await prisma.portActivity.create({
    data: {
      projectId: projectId,
      user: {
        connect: { id: user.id },
      },
    },
  });

  return NextResponse.json(project);
}
