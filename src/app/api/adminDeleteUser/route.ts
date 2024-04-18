import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { email, id } = body;

    if (!email || !id ) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    const lowercasedEmail = email.toLowerCase();

    // Delete transactions first
    const deleteTransaction = await prisma.transaction.deleteMany({
      where: {
        userId: id,
      },
    });

    // Then delete the user
    const deletedUser = await prisma.user.delete({
      where: {
        email: lowercasedEmail,
      },
    });

    // Return both responses
    return NextResponse.json({ deleteTransaction, deletedUser });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse(error.message);
  }
}
