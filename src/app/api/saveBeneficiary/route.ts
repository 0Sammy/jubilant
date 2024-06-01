import { NextResponse, NextRequest } from 'next/server';
import { prisma } from "@/lib/prismadb"; 

export async function POST (request: NextRequest){

    const body = await request.json();

    try {

    const { userEmail, name, bankName, accountName, accountNumber } = body
    

    if ( !userEmail || !name || !bankName || !accountName || !accountNumber ) return new NextResponse('Missing Fields', { status: 400 })

    const lowercasedEmail = userEmail.toLowerCase();

    const createBeneficiary = await prisma.beneficiary.create({

        data: {
            userEmail: lowercasedEmail, 
            name, 
            bankName, 
            accountName, 
            accountNumber, 
        },
    });

    return NextResponse.json(createBeneficiary);

    }catch(error: any){
        console.error('Error creating beneficiary:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
    
}