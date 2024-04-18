"use client"
import { makeApiRequest } from "@/lib/apiUtils"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

type suspendProps ={
    userEmail: string,
    userSuspended: boolean,
    accountNumber: string,
    name: string,
}

const SuspendButton = ({userEmail, userSuspended, accountNumber, name}: suspendProps) => {

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        toast.info(userSuspended ? "Revoking user suspension" : "Suspending User")
        
        const formData = { email: userEmail, currentUpdate: !userSuspended };
        
        const emailData = {
          to: userEmail,
          subject: (userSuspended ? "Suspension Revoked" : "Suspended"),
          name: name,
          emailType: (userSuspended ? "revokeSuspension" : "userSuspension"),
          accountNumber: accountNumber.slice(-4)
        };


        makeApiRequest("/adminSuspendUser", "post", formData, {
            onSuccess: () => {
              // Handle success
              toast.success("Client suspension status was updated successfully.")
              makeApiRequest("/send-email", "post", emailData, {
                onSuccess: () => {
                  // Handle success
                  toast.success("Email was sent successfully.")
                  window.location.reload()
                },
                onError: (error: any) => {
                  // Handle error
                  toast.error("Couldn't send suspension email.")
                  console.log("Couldn't send email, due to some error. " + error.message)
                },
              });
            },
            onError: (error: any) => {
              // Handle error
      
              if (error.message === "Missing Fields") {
                toast.error("Missing fields, contact the developer.")
              }
              toast.error("Unable to suspend user now, please try again later.")
            },
          });
    }

    return ( 
        <main>
            <form onSubmit={onSubmit}>
                <button type="submit" className="text-xs md:text-sm xl:text-base border border-primary bg-primary rounded-lg px-4 md:px-8 xl:px-10 py-2 md:py-3 text-white hover:bg-white hover:text-primary duration-500">{userSuspended ? "Resume" : "Suspend"}</button>
            </form>
        </main>
     );
}
 
export default SuspendButton;