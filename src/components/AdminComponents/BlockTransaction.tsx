"use client"
import { makeApiRequest } from "@/lib/apiUtils";
import { FormEvent, useState } from "react";
import { toast } from "sonner";


type blockProps = {
    userId: string;
    transactionSuspended: boolean;
}


const BlockTransaction = ({userId, transactionSuspended}:  blockProps) => {
    const [loading, setLoading] = useState<boolean>(false)

    const onSubmit = (event: FormEvent) => {
        setLoading(true)
        event.preventDefault();
        toast.info("The user will no longer be able to make transactions....")
        
        const formData = { id: userId, currentUpdate: !transactionSuspended };
        //console.log({formData})
        makeApiRequest("/adminBlockUserTransaction", "post", formData, {
            onSuccess: () => {
              // Handle success
              setLoading(false)
              toast.success("Client transaction status was updated successfully.")
              window.location.reload()
            },
            onError: (error: any) => {
              // Handle error
              if (error.message === "Missing Fields") {
                toast.error("Missing fields, contact the developer.")
              }
              toast.error("Unable to update clients transaction status now, please try again later.")
              setLoading(false)
              window.location.reload()
            },
          });
    }


    return ( 
        <main>
            <form onSubmit={onSubmit}>
                <button type="submit" className="text-xs md:text-sm xl:text-base border border-purple-600 bg-purple-600 rounded-lg px-4 md:px-8 xl:px-10 py-2 md:py-3 text-white hover:bg-white hover:text-purple-600 duration-500">{loading ? "Submitting" : transactionSuspended ? "Unblock Transaction" : "Block Transactions"}</button>
            </form>
        </main>
     );
}
 
export default BlockTransaction;