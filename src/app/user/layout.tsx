import { permanentRedirect } from 'next/navigation'
import Sidebar from "@/components/Sidebar";
import '../globals.css';
import { Toaster } from 'sonner';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/authOptions";
import getCurrentLoggedInUser from "@/actions/getCurrentUser";


export default async function UserLayout({
  
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (session?.user){ 
    const loggedInEmail = (session?.user.email)
    const currentUser = await getCurrentLoggedInUser(loggedInEmail)
    //console.log({currentUser})
    
    //Redirect accordingly
    if (currentUser?.isEmailVerified === false) {
      permanentRedirect('/onboarding/verification')
    } 

    if (currentUser?.hasTransactionPin === false){
      permanentRedirect('/onboarding/transaction')
    } 
    if (currentUser?.isVerified === false) {
      permanentRedirect('/onboarding/review')
    } 
    if (currentUser?.isSuspended === true) {
      permanentRedirect('/suspend')
    }
  }
  return (

      <section>
      <Sidebar role="user"/>
        <section className="mainWidth">{children}</section>
        <Toaster richColors position="top-center" closeButton />
      </section>

  )

}