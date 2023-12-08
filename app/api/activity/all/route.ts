import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const allActivity = await prisma.portActivity.findMany();

    return NextResponse.json(allActivity);
  } catch (error) {
    return NextResponse.json(null);
  }
}
