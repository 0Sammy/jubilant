import { getUserDetails } from "@/providers/userDetails";
import { permanentRedirect } from "next/navigation";


//Import Needed Components
import Header from "@/components/DashboardComponents/Header";
import AccountDetails from "@/components/DashboardComponents/AccountDetails";
import Activity from "@/components/DashboardComponents/Activity";
import History from "@/components/HistoryComponents/History";
import BalanceUpdate from "@/components/DashboardComponents/BalanceUpdate";



export const revalidate = 30
const page = async () => {

    const { user } = await getUserDetails();
    const transactions = user?.transactions
    const wireTransferTransactions = transactions?.filter((transaction) => transaction.type.includes('Wire_Transfer'));
    const deposits = transactions?.filter((transaction) => transaction.type === "Deposit");
    const currentCurrency = user?.currency

    if (user?.isSuspended){
        permanentRedirect('/suspend') 
     }

    return ( 
        <main>
            <BalanceUpdate transactions={transactions} />
            {/* <Header page="History" profilePicSrc={user?.profileImgSrc} name={`${user?.firstName} ${user?.lastName}`} accountNumber={user?.accountNumber}/> */}
            <div className="px-4 md:px-6 xl:px-8 flex flex-col gap-y-10 lg:gap-y-0 lg:flex-row justify-between mt-5 lg:mt-10">
                {/* <div className="lg:w-[49%] flex flex-col gap-y-10">
                    <AccountDetails />
                </div> */}
                <div className="lg:w-[49%] flex flex-col gap-y-10">
                    <Activity wireTransfer={wireTransferTransactions} deposits={deposits}/>
                </div>
            </div>
            <div className="px-4 md:px-6 xl:px-8 mt-10">
                <History transactions={transactions} currentCurrency={currentCurrency}/>
            </div>
        </main> 
     );
}
 
export default page;