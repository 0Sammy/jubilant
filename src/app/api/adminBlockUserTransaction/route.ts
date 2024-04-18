import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { id, currentUpdate } = body;

    if (!id ) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    const updateUserTransactionSuspension = await prisma.user.update({
      where: {
        id,
      },
      data: {
        transactionSuspended: currentUpdate,
      },
    });

    return NextResponse.json(updateUserTransactionSuspension);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(error.message);
  }
}
