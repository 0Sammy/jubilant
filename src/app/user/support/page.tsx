import { getUserDetails } from "@/providers/userDetails";
import { permanentRedirect } from "next/navigation";


//Import Needed Components
import Header from "@/components/DashboardComponents/Header";
import SupportForm from "@/components/SupportComponents/SupportForm";
import LiveChat from "@/components/molecules/LiveChat";


export const revalidate = 30
const page = async () => {

    const { user } = await getUserDetails();

    if (user?.isSuspended){
        permanentRedirect('/suspend') 
     }
    return ( 

        <main>
            <Header page="Support" profilePicSrc={user?.profileImgSrc} name={`${user?.firstName} ${user?.lastName}`} accountNumber={user?.accountNumber}/> 
            <div className="px-4 md:px-6 xl:px-8 py-4">
                <SupportForm/>
            </div>
            <LiveChat />
        </main>

     );
}
 
export default page;