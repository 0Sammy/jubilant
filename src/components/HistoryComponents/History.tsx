import Link from "next/link";
import { formatDate } from "@/lib/dateTimeUtils";
import { formatDateTime } from "@/lib/dateTimeUtils";
//Import Needed Icons
import { Bill, DirectboxReceive, Send2, WalletMoney } from "iconsax-react";



const History = ({transactions, currentCurrency}: any ) => {
    return ( 
        <main className="border border-[#7676801F] rounded-lg p-4 mb-24 overflow-y-auto special1 max-h-screen">
            <p className="text-sm lg:text-base text-[#06121B] font-semibold">All transactions</p>
            <div className="flex flex-col gap-y-2 mt-6 mb-4">
                {transactions && transactions.map((transaction: any) => (
                    
                <Link key={transaction.id} href={`history/${transaction.id}`} className="hover:bg-slate-100 duration-500">
                    <div className="flex items-center justify-between py-4 cursor-pointer">
                        <div className="flex gap-x-1 items-center">
                            <div className="bg-[#EBEBF599] rounded-[50%] p-2">
                                {transaction.type === "Deposit" ? <DirectboxReceive size="20" color="#1C1F33"/> : transaction.type.includes('Wire_Transfer') ? <Send2 size="20" color="#1C1F33"/> : transaction.type === "Utility_Bill" ? <Bill size="20" color="#1C1F33"/> : <WalletMoney size="20" color="#1C1F33"/> } 
                                
                            </div>

                            <div className="flex flex-col gap-y-0.5">
                                <p className="text-[#141619] text-xs md:text-sm xl:text-base font-medium capitalize">{transaction.type === "Deposit" ? "Deposit" : transaction.type === "Domestic_Wire_Transfer" ? "Domestic Transfer" : transaction.type === "International_Wire_Transfer" ? "International Transfer" : transaction.type === "Utility_Bill" ? "Utility Bill" : "Savings"}</p>
                                <p className="text-[#9EA0A3] text-[0.6rem] xl:text-xs">{transaction.doneByAdmin ? formatDateTime(transaction.customCreatedTime) : formatDate(transaction.createdAt)}</p>
                            </div>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <p className={`${transaction.type === "Deposit" ? "text-[#20BF55]" : "text-[#FF5964]"} text-xs md:text-sm xl:text-base font-medium`}>{transaction.type === "Deposit" ? `+${currentCurrency ?? "€"}${transaction.amount.toLocaleString()}` : `-${currentCurrency ?? "€"}${transaction.amount.toLocaleString()}`}</p> 
                            <p className={`${transaction.status === "pending" && "bg-[#FEF6E7] text-[#DF930E]"} ${transaction.status === "successfull" && "bg-[#E6F5EE] text-[#026C3C]"} ${transaction.status === "failed" && "text-red-600 bg-red-100"} rounded-2xl px-2 py-1  text-[8px] md:text-[10px] xl:text-[12px] font-medium`}>{transaction.status}</p>
                        </div>
                    </div>
                 </Link>
                ))}
            </div>
        </main>
     );
}
 
export default History;