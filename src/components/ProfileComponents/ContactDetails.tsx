"use client"
import { useState } from "react";
import ContactForm from "./ContactForm";

const ContactDetails = ({user}: any) => {

    const [seeForm, setSeeForm] = useState<boolean>(false)
    //Function
    const updateForm = () => {
        setSeeForm((prev) => !prev)
    }

    return ( 
        <main>
            {seeForm && <ContactForm hideModal={updateForm} email={user.email}/>}
            <p className="text-xl xl:text-2xl font-semibold text-[#020100]">Contact Details</p>
            <div className="flex justify-between mt-6">
                <div className="w-[49%] flex flex-col gap-y-2">
                    <p className="text-textPrimary text-[12px] md:text-[14px]">City</p>
                    <p className="text-[#636366] text-[14px] md:text-[16px] capitalize border border-[#E6E7E8] p-2 rounded-lg">{user && user.city}</p>
                </div>
                <div className="w-[49%] flex flex-col gap-y-2">
                    <p className="text-textPrimary text-[12px] md:text-[14px]">State</p>
                    <p className="text-[#636366] text-[14px] md:text-[16px] capitalize border border-[#E6E7E8] p-2 rounded-lg">{user && user.state}</p>
                </div>
            </div>
            <div className="flex flex-col gap-y-2 mt-6">
                <p className="text-textPrimary text-[12px] md:text-[14px]">Address</p>
                <p className="text-[#636366] text-[14px] md:text-[16px] border border-[#E6E7E8] p-2 rounded-lg">{user && user.address}</p>
            </div>
            <div className="flex flex-col gap-y-2 mt-6">
                <p className="text-textPrimary text-[12px] md:text-[14px]">Country</p>
                <p className="text-[#636366] text-[14px] md:text-[16px] border border-[#E6E7E8] p-2 rounded-lg">{user && user.country}</p>
            </div>
            <div className="flex flex-col gap-y-2 mt-6">
                <p className="text-textPrimary text-[12px] md:text-[14px]">Mobile Number</p>
                <p className="text-[#636366] text-[14px] md:text-[16px] border border-[#E6E7E8] p-2 rounded-lg">{user && user.mobileNumber}</p>
            </div>
            <div className="flex justify-end mt-10 mb-20 xl:mb-0">
                <button onClick={updateForm} className="bg-primary px-6 md:px-8 xl:px-10 py-2 md:py-3 text-sm md:text-base rounded-lg text-white border border-primary hover:bg-white hover:text-primary duration-500">Update Contact Details</button>
            </div>
        </main>
     );
}
 
export default ContactDetails;