"use client"
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { makeApiRequest } from "@/lib/apiUtils";

//Import Needed Components
import ImageUpload from "../molecules/ImageUpload";

//Import Needed Icons
import { AddCircle } from "iconsax-react";


type profileEdit = {
    hideModal?: () => void,
    email: string,
}

const PersonalForm = ({hideModal, email}: profileEdit) => {

    const [imgLink, setImgLink] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    //OnSubmit function
    const onSubmit = (event: FormEvent) => {
        event.preventDefault()
        setLoading(true)

        if(imgLink.length === 0){
            setLoading(false)
            toast.error ("Kindly choose an image")
            return
        }
        const formData = {email: email, page: "personal", newProfileLink: imgLink}
        makeApiRequest("/editProfile", "post", formData, {
            onSuccess: () => {
                setLoading(false)
                toast.success("Profile picture updated successfully.")
                if(hideModal){
                    hideModal()
                }
                window.location.reload()
            },
        onError: (error: any) => {
            setLoading(false)
            console.log(error.message)
            toast.error("Unable to update profile picture, kindly try again later.")
            if(hideModal){
                hideModal()
            }
            window.location.reload()
            }
        }
    )}
    return ( 
        <main className="fixed h-screen w-full bg-black bg-opacity-80 flex items-center justify-center z-[700] top-0 left-0">
            <div className="relative w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] h-[20rem] bg-white p-4 md:p-8 rounded-md flex flex-col items-center justify-center text-center">
                <AddCircle size="20" className="absolute top-4 right-4 text-wrongRed cursor-pointer rotate-45" onClick={hideModal}/>
                <form onSubmit={onSubmit}>
                    <ImageUpload value={imgLink} onChange={(value) => setImgLink(value)} text="Upload New Profile Picture"/>
                    <button type="submit" className="mt-6 bg-primary px-6 md:px-8 xl:px-10 py-2 md:py-3 text-sm md:text-base rounded-lg text-white border border-primary hover:bg-white hover:text-primary duration-500">{loading ? "Updating..." : "Update Profile"}</button>
                </form>
            </div>
        </main>
     );
}
 
export default PersonalForm;