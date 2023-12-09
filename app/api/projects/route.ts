import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    name,
    type,
    symbol,
    supply,
    collectionAddress,
    image,
    walletAddress,
    signature,
  } = body;

  const isCollectionExistForUser = await prisma.project.findUnique({
    where: {
      uniqueCollectionForUser: {
        collectionAddressOnEth: collectionAddress,
        ownerAddressOnEth: walletAddress,
      },
    },
  });
  if (isCollectionExistForUser) {
    return new NextResponse("Collection Address already exists for this user", {
      status: 409,
    });
  }

  let user;
  user = await prisma.user.findUnique({
    where: {
      walletAddressOnEth: walletAddress,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        walletAddressOnEth: walletAddress,
      },
    });
  }

  const project = await prisma.project.create({
    data: {
      name,
      image,
      symbol,
      typeOnEth: type,
      collectionSupply: supply,
      ownerAddressOnEth: walletAddress,
      collectionAddressOnEth: collectionAddress,
      sourceChain: "ETHEREUM",
      isVerified: false,
      isPorted: false,
      user: {
        connect: { id: user.id },
      },
    },
  });

  return NextResponse.json(project);
}

export async function GET(request: Request) {
  try {
    const projects = await prisma.project.findMany({});
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(null);
  }
}
