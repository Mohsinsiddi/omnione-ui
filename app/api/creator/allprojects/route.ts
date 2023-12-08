import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const address = url.searchParams.get("address");

  if (!address) return NextResponse.json(null);
  try {
    const user = await prisma.user.findUnique({
      where: {
        walletAddressOnEth: address,
      },
    });
    const allProjects = await prisma.project.findMany({
      where: {
        userId: user?.id,
      },
    });

    return NextResponse.json(allProjects);
  } catch (error) {
    return NextResponse.json(null);
  }
}
