"use client"
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import { makeApiRequest } from "@/lib/apiUtils";

//Import Needed Icons
import { AddCircle } from "iconsax-react";

type profileEdit = {
    hideModal?: () => void,
    email: string,
}


const ContactForm = ({hideModal, email}: profileEdit) => {

    const [loading, setLoading] = useState<boolean>(false)
    const [newNumber, setNewNumber] = useState<string>("")

    //OnSubmit function
    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        setLoading(true)

        if(newNumber.length < 8){
            setLoading(false)
            toast.error("Kindly input a correct mobile number")
            return
        }

        const formData = {email: email, page: "contact", newMobileNumber: newNumber}
        makeApiRequest("/editProfile", "post", formData, {
            onSuccess: () => {
                setLoading(false)
                toast.success("Phone Number updated successfully.")
                if(hideModal){
                    hideModal()
                }
                window.location.reload()
            },
        onError: (error: any) => {
            setLoading(false)
            toast.error("Unable to update mobile number now, please, try again later.")
            if(hideModal){
                hideModal()
            }
            window.location.reload()
            }
        }
    )}

    return ( 
        <main className="fixed h-screen w-full bg-black bg-opacity-80 flex items-center justify-center z-[700] top-0 left-0 text-xs md:text-sm xl:text-base text-[#161618]">
            <div className="relative w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] h-[17rem] lg:h-[20rem] bg-white p-4 md:p-8 rounded-md">
                <AddCircle size="20" className="absolute top-4 right-4 text-wrongRed cursor-pointer rotate-45" onClick={hideModal}/>
                <form onSubmit={onSubmit} className="flex flex-col items-center justify-center mt-10">
                <div className="w-full flex flex-col gap-y-2 mt-6">
                    <label className="cursor-pointer" htmlFor="phoneNumber">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={newNumber}
                      className="border border-[#E6E7E8] px-2 xl:px-4 py-2 md:py-3 focus:border-primary rounded-md focus:outline-none"
                      placeholder="Mobile Number"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setNewNumber(e.target.value)
                      }
                    />
                </div>
                    <button type="submit" className="mt-6 bg-primary w-full py-2 md:py-3 text-sm md:text-base rounded-lg text-white border border-primary hover:bg-white hover:text-primary duration-500">{loading ? "Updating..." : "Update Profile"}</button>
                </form>
            </div>
        </main>
     );
}
 
export default ContactForm;