import { getUserDetails } from "@/providers/userDetails";
import { permanentRedirect } from "next/navigation";


//Import Needed Components
import Header from "@/components/DashboardComponents/Header";
import Balance from "@/components/TransferComponents/Balance";
import CapitalWealth from "@/components/SavingsComponents/CapitalWealth";
import Savebox from "@/components/SavingsComponents/Savebox";
import TargetSavings from "@/components/SavingsComponents/TargetSavings";
import SavingDetails from "@/components/SavingsComponents/SavingDetails";
import SavingsHeader from "@/components/SavingsComponents/SavingsHeader";
import BalanceUpdate from "@/components/DashboardComponents/BalanceUpdate";




export const revalidate = 1
const page = async () => {

    const { user } = await getUserDetails();
    const transactions = user?.transactions
    const currentCurrency = user?.currency 

    if (user?.isSuspended){
        permanentRedirect('/suspend') 
     }

    return ( 
        <main>
            <BalanceUpdate transactions={transactions}/>
            <Header page="Savings" profilePicSrc={user?.profileImgSrc} name={`${user?.firstName} ${user?.lastName}`} accountNumber={user?.accountNumber}/>
            <div className="px-4 md:px-6 xl:px-8 flex flex-col gap-y-10 lg:gap-y-0 lg:flex-row justify-between mt-5 lg:mt-10">
                <div className="lg:w-[49%] border border-[#7676801F] rounded-lg p-4">
                    <SavingsHeader currentCurrency={currentCurrency}/>
                    <div className="flex flex-wrap justify-between gap-y-5">
                        <CapitalWealth currentCurrency={currentCurrency}/>
                        <Savebox currentCurrency={currentCurrency}/>
                        <TargetSavings />
                    </div>
                </div>
                <div className="lg:w-[49%] flex flex-col gap-y-10 border border-[#7676801F] rounded-lg p-4">
                    <Balance currentCurrency={currentCurrency}/>
                    <SavingDetails currentCurrency={currentCurrency}/>
                </div>
            </div>
        </main>
     );
}
 
export default page;