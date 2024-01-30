import { getUserDetails } from "@/providers/userDetails";

//Import Needed Components
import Header from "@/components/DashboardComponents/Header";
import AccountDetails from "@/components/DashboardComponents/AccountDetails";
import Activity from "@/components/DashboardComponents/Activity";
import History from "@/components/HistoryComponents/History";

export const revalidate = 30
const page = async () => {

    const { user } = await getUserDetails();
    const transactions = user?.transactions
    console.log({transactions})

    return ( 
        <main>
            <Header page="History" profilePicSrc={user?.profileImgSrc}/>
            <div className="px-4 md:px-6 xl:px-8 flex flex-col gap-y-10 lg:gap-y-0 lg:flex-row justify-between mt-5 lg:mt-10">
                <div className="lg:w-[49%] flex flex-col gap-y-10">
                    <AccountDetails />
                </div>
                <div className="lg:w-[49%] flex flex-col gap-y-10">
                    <Activity />
                </div>
            </div>
            <div className="px-4 md:px-6 xl:px-8 mt-10">
                <History transactions={transactions}/>
            </div>
        </main> 
     );
}
 
export default page;