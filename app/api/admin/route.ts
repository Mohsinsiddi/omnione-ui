import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { projectId } = body;

  const project = await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      isVerified: true,
    },
  });
  return NextResponse.json(project);
}
