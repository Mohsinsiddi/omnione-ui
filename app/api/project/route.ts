import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const projectId = url.searchParams.get("id");

  if (!projectId) return NextResponse.json(null);
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(null);
  }
}
