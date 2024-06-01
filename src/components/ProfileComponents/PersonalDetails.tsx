"use client"
import { useState } from "react";
import Image from "next/image";

//Import Needed Components
import PersonalForm from "./PersonalForm";

//Import Needed Images
import defaultImage from "../../../public/Images/user.png";

const PersonalDetails = ({user}: any) => {

    const [seeForm, setSeeForm] = useState<boolean>(false)
    //Function
    const updateForm = () => {
        setSeeForm((prev) => !prev)
    }
    return ( 
        <main>
            {seeForm && <PersonalForm hideModal={updateForm} email={user.email}/>}
            <p className="text-xl xl:text-2xl font-semibold text-[#020100]">Personal Details</p>
            <div className="flex gap-x-2 mt-4">
                <div className="relative size-14 md:size-16 xl:size-20">
                <Image src={(user && user?.profileImgSrc.startsWith("https://res.cloudinary.com") ? user?.profileImgSrc : defaultImage)} alt="Profile Picture" fill className="absolute rounded-[50%]"/>
                </div>
            </div>
            <div className="flex justify-between mt-6">
                <div className="w-[49%] flex flex-col gap-y-2">
                    <p className="text-textPrimary text-[12px] md:text-[14px]">First name</p>
                    <p className="text-[#636366] text-[14px] md:text-[16px] capitalize border border-[#E6E7E8] p-2 rounded-lg">{user && user.firstName}</p>
                </div>
                <div className="w-[49%] flex flex-col gap-y-2">
                    <p className="text-textPrimary text-[12px] md:text-[14px]">Last name</p>
                    <p className="text-[#636366] text-[14px] md:text-[16px] capitalize border border-[#E6E7E8] p-2 rounded-lg">{user && user.lastName}</p>
                </div>
            </div>
            <div className="flex flex-col gap-y-2 mt-6">
                <p className="text-textPrimary text-[12px] md:text-[14px]">Email</p>
                <p className="text-[#636366] text-[14px] md:text-[16px] border border-[#E6E7E8] p-2 rounded-lg">{user && user.email}</p>
            </div>
            <div className="flex flex-col gap-y-2 mt-6">
                <p className="text-textPrimary text-[12px] md:text-[14px]">Date of Birth</p>
                <p className="text-[#636366] text-[14px] md:text-[16px] border border-[#E6E7E8] p-2 rounded-lg">{user && user.dateOfBirth}</p>
            </div>
            <div className="flex justify-end mt-10 mb-20 xl:mb-0">
                <button onClick={updateForm} className="bg-primary px-6 md:px-8 xl:px-10 py-2 md:py-3 text-sm md:text-base rounded-lg text-white border border-primary hover:bg-white hover:text-primary duration-500">Update Personal Details</button>
            </div>
        </main>
     );
}
 
export default PersonalDetails;