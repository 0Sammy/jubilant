import { getUserDetails } from "@/providers/userDetails";
import getUserBeneficiaries from "@/actions/getUserBeneficiaries";
import { permanentRedirect } from "next/navigation";


//Import Needed Components
import Header from "@/components/DashboardComponents/Header";
import Transfer from "@/components/TransferComponents/Transfer";
import LastTransactions from "@/components/TransferComponents/LastTransactions";
import Balance from "@/components/TransferComponents/Balance";
import PaymentDetails from "@/components/TransferComponents/PaymentDetails";
import BalanceUpdate from "@/components/DashboardComponents/BalanceUpdate";
import Beneficiary from "@/components/TransferComponents/Beneficiary";




export const revalidate = 1
const page = async () => {

    const { user } = await getUserDetails();
    const transactions = user?.transactions
    const lastFiveTransactions = transactions?.slice(-5);
    const currentCurrency = user?.currency 
    const userEmail = user?.email
    const beneficiaries = await getUserBeneficiaries(userEmail ?? "");
    //console.log({beneficiaries})

    if (user?.isSuspended){
        permanentRedirect('/suspend') 
     }

    return ( 
        <main>
            <BalanceUpdate transactions={transactions} transactionBlocked={user?.transactionSuspended}/>
            <Header page="Transfers" profilePicSrc={user?.profileImgSrc} name={`${user?.firstName} ${user?.lastName}`} accountNumber={user?.accountNumber}/>
            <div className="px-4 md:px-6 xl:px-8 flex flex-col gap-y-10 lg:gap-y-0 lg:flex-row justify-between mt-5 lg:mt-10">
                <div className="lg:w-[49%] flex flex-col gap-y-10 border border-[#7676801F] rounded-lg p-4">
                    <Transfer />
                </div>
                <div className="lg:w-[49%] flex flex-col gap-y-10 border border-[#7676801F] rounded-lg p-4">
                    <Balance currentCurrency={currentCurrency}/>
                    <PaymentDetails userid={user?.id} userPin={user?.transactionPin} name={`${user?.firstName} ${user?.lastName}`} email={userEmail} currentCurrency={currentCurrency} isSuspended={user?.isSuspended}/>
                    <Beneficiary beneficiaries={beneficiaries}/>
                    <LastTransactions transactions={lastFiveTransactions}/>
                </div>
            </div>
        </main>
     );
}
 
export default page;