"use client"
import Image from "next/image";
import { toast } from "sonner";


//Import Needed Zustand States
import { useTransactionStore } from "@/store/transactionStore";


const Beneficiary = ({beneficiaries} : any) => {

    //Image Link for the user Icon
    const imageLink = "https://res.cloudinary.com/dpmx02shl/image/upload/v1706631048/capitalSphereBank/avatar3_x0euei.svg"
    
    //Import Needed States
    const { updateAccountName, updateAccountNumber, updateBankName} = useTransactionStore()

    //Handle Beneficiary click
    const handleClick = (beneficiaryId : string) => {
        const specificBeneficiary = beneficiaries.find((b: { id: string; }) => b.id === beneficiaryId);

        if (specificBeneficiary){
            updateAccountName(specificBeneficiary.accountName)   
            updateAccountNumber(specificBeneficiary.accountNumber)
            updateBankName(specificBeneficiary.bankName)
        }
        toast.info(`You selected ${specificBeneficiary.accountName}`)
    }
    return ( 
        <main className="text-xs md:text-sm xl:text-base">
            <p className="text-sm lg:text-base text-[#06121B] font-semibold mb-4">Your Beneficiaries</p>
            <div className="flex gap-x-10 bg-[#EBEBF52E] border border-[#7676801F] px-8 py-6 mt-5 rounded-lg overflow-x-auto special">
                {beneficiaries.length === 0 &&
                    <h1>You have not added any beneficiaries yet.</h1> 
                }
                {beneficiaries.length > 0 &&
                    beneficiaries.map((beneficiary : any) => (
                        <div key={beneficiary.id} className="flex flex-col gap-y-2 items-center cursor-pointer" onClick={() => handleClick(beneficiary.id)}>
                          <div className="relative min-w-[3rem] min-h-[3rem] size-8 md:size-10 lg:size-12 rounded-[50%]">
                            <Image src={imageLink} alt="User Icon" fill className="rounded-[50%]" />
                          </div>
                          <p><strong>{beneficiary.accountName.slice(0, 7)}.</strong></p>
                        </div>
                    ))
                }
            </div>
        </main>
     );
}


export default Beneficiary;