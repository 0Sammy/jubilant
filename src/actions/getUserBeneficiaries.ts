import { prisma } from "@/lib/prismadb";

export default async function getUserBeneficiaries(email: string | undefined) {
    
  if (!email) {
    throw new Error("Email is required to process the request.");
  }

  try {
    const beneficiaries = await prisma.beneficiary.findMany({
      where: {
        userEmail: email.toLowerCase(),
      },
    });

    return beneficiaries;
    
  } catch (error: any) {
    console.error("Error fetching beneficiaries:", error.message);
    throw new Error("An error occurred while fetching beneficiaries.");
  }
}
