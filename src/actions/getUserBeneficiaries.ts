import { prisma } from "@/lib/prismadb";

export default async function getUserBeneficiaries(email: string | any) {

  try {

    const beneficiaries = await prisma.beneficiary.findMany({
      where: {
        userEmail: email,
      },
    });

    return beneficiaries;
    
  } catch (error: any) {
    console.error("Error fetching beneficiaries:", error.message);
    throw new Error("An error occurred while fetching beneficiaries.");
  }
}
