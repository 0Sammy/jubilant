"use client"
import { useState } from "react";
import { formatDate } from "@/lib/dateTimeUtils";
import Image from "next/image";
import SecurityForm from "./SecurityForm";

const SecurityDetails = ({user}: any) => {

    const [seeForm, setSeeForm] = useState<boolean>(false)
    //Function
    const updateForm = () => {
        setSeeForm((prev) => !prev)
    }

    return ( 
        <main>
            {seeForm && <SecurityForm hideModal={updateForm} email={user.email} transactionPin={user.transactionPin}/>}
            <p className="text-xl xl:text-2xl font-semibold text-[#020100]">Security Details</p>
            <div className="flex flex-col gap-y-2 mt-6">
                <p className="text-textPrimary text-[12px] md:text-[14px]">ID Type</p>
                <p className="text-[#636366] text-[14px] md:text-[16px] border border-[#E6E7E8] p-2 rounded-lg">{user && user.idType}</p>
            </div>
            <div className="flex flex-col gap-y-2 mt-6">
                <p className="text-textPrimary text-[12px] md:text-[14px]">ID Number</p>
                <p className="text-[#636366] text-[14px] md:text-[16px] border border-[#E6E7E8] p-2 rounded-lg">{user && user.idNumber}</p>
            </div>
            <div className="flex flex-col gap-y-2 mt-6">
                <p className="text-textPrimary text-[12px] md:text-[14px]">ID Date of expiration</p>
                <p className="text-[#636366] text-[14px] md:text-[16px] border border-[#E6E7E8] p-2 rounded-lg">{user && user.dateOfExpiry}</p>
            </div>
            <div className="flex justify-end mt-10 mb-20 xl:mb-0">
                <button onClick={updateForm} className="bg-primary px-6 md:px-8 xl:px-10 py-2 md:py-3 text-sm md:text-base rounded-lg text-white border border-primary hover:bg-white hover:text-primary duration-500">Update Security Details</button>
            </div>
        </main>
     );
}
 
export default SecurityDetails;