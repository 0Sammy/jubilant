import { prisma } from "@/lib/prismadb";

export default async function getIndividualTransaction(id: string) {
  try {
    const transaction = await prisma.transaction.findMany({
      where: {
        id: id,
      },
    });

    return transaction;
    
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}
