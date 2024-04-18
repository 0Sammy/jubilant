"use client"
import { makeApiRequest } from "@/lib/apiUtils";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { redirect } from 'next/navigation'

type deleteProps = {
    userEmail: string
    userId: string
}
const DeleteButton = ({userEmail, userId} :deleteProps) => {

    const [deleted, setDeleted] = useState<boolean>(false)

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        toast.info("Note, deleting this user, deletes all the user transactions....")
        
        const formData = { email: userEmail, id: userId };

        makeApiRequest("/adminDeleteUser", "post", formData, {
            onSuccess: () => {
              // Handle success
              toast.success("Client was deleted successfully.")
              setDeleted(true)
            },
            onError: (error: any) => {
              // Handle error
              if (error.message === "Missing Fields") {
                toast.error("Missing fields, contact the developer.")
              }
              toast.error("Unable to delete user now, please try again later.")
              setDeleted(true)
            },
          });
    }

    deleted && redirect(`/admin/users`)

    return ( 
        <main>
            <form onSubmit={onSubmit}>
                <button type="submit" className="text-xs md:text-sm xl:text-base border border-red-600 bg-red-600 rounded-lg px-4 md:px-8 xl:px-10 py-2 md:py-3 text-white hover:bg-white hover:text-red-600 duration-500">Delete</button>
            </form>
        </main>
     );
}
 
export default DeleteButton;