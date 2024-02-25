"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
// import { signOut } from 'next-auth/react'

//Import Icons
import { AiOutlineCloseSquare } from "react-icons/ai";
import { LuMenuSquare } from "react-icons/lu";

//Import Needed Components
import SidebarLinks from "./molecules/SidebarLinks";
import Downbar from "./Downbar";

//Import Needed Icons
import { ArrowSwapHorizontal, Chart2, CloseCircle, Element3, I24Support, LogoutCurve, Profile, Profile2User, ProfileCircle, WalletMoney } from "iconsax-react";

//Import Needed Images
import logo from "../../public/Images/logoWhite.svg";

const Sidebar = ({role} : {role : string | any}) => {
  //For the sidebar
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //Function to toggle the sidebar
  const toggleOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  return (
    <main className="relative">
      <div className="fixed left-0 top-0 z-50 hidden h-screen w-80 bg-sidebar lg:block rounded-r-[2.5rem]">
                <div className="flex gap-x-1 w-fit ml-8 mt-4">
                    <Image src={logo} alt="Capital Sphere Bank Logo" priority={true}/>
                    <div className="text-textWhite  text-xs sm:text-sm xl:text-base">
                        <p>Capital</p>
                        <p className="-mt-2">Sphere</p>
                        <p className="-mt-2">Bank</p>
                    </div>
                </div>
        <div className={` my-10 flex flex-col gap-y-5`}>
          <div className={`${role !== "user" && "hidden" }`}>
            <SidebarLinks route="/user/dashboard" label="Dashboard" icon={<Element3 size={20}/>}/>
            <SidebarLinks route="/user/transfer" label="Transfers"  icon={<ArrowSwapHorizontal size={20}/>}/>
            <SidebarLinks route="/user/history" label="History" icon={<Chart2 size={20}/>}/>
            <SidebarLinks route="/user/savings" label="Savings"  icon={<WalletMoney size={20}/>}/>
            <SidebarLinks route="/user/profile" label="My Profile" icon={<ProfileCircle size={20}/>}/>
            <div className="absolute bottom-10 w-full">
                <SidebarLinks route="/user/support" label="Get Support" icon={<I24Support size={20}/>}/>
                <SidebarLinks route="/user/logout" label="Log Out" icon={<LogoutCurve size={20}/>}/> 
            </div>
          </div>
          <div className={`${role === "user" && "hidden"}`}>
            <SidebarLinks route="/admin/dashboard" label="Dashboard" icon={<Element3 size={20}/>}/>
            <SidebarLinks route="/admin/transfer" label="Transactions"  icon={<ArrowSwapHorizontal size={20}/>}/>
            <SidebarLinks route="/admin/history" label="History" icon={<Chart2 size={20}/>}/>
            <SidebarLinks route="/admin/users" label="Users" icon={<Profile2User size={20}/>}/>
            {role === "super_admin" && <SidebarLinks route="/admin/staff" label="Staff" icon={<Profile size={20}/>}/>}
            {role === "super_admin" && <SidebarLinks route="/admin/suspend" label="Suspend" icon={<CloseCircle size={20}/>}/>}
            <SidebarLinks route="/admin/support" label="Support" icon={<I24Support size={20}/>}/> 
            <div className="absolute bottom-10 w-full">
                <SidebarLinks route="/admin/logout" label="Log Out" icon={<LogoutCurve size={20}/>}/> 
            </div>
          </div>
          
        </div>
        
      </div>
      <div className={`${role === "user" && "hidden"}`}>
        <LuMenuSquare
          className="relative left-4 top-4 mt-2 cursor-pointer text-sidebarHover focus:text-blue lg:hidden"
          size={40}
          onClick={toggleOpen}
        />
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="fixed left-0 top-0 z-50 h-screen w-80 bg-sidebar lg:hidden rounded-r-lg"
            >
            <AiOutlineCloseSquare
              onClick={toggleOpen}
              size={40}
              className="mt-6 ml-8 mb-10 cursor-pointer text-textWhite"
            />
          <div className={` my-10 flex flex-col gap-y-5`}>
            <SidebarLinks route="/admin/dashboard" label="Dashboard" icon={<Element3 size={20}/>}/>
            <SidebarLinks route="/admin/transfer" label="Transactions"  icon={<ArrowSwapHorizontal size={20}/>}/>
            <SidebarLinks route="/admin/history" label="History" icon={<Chart2 size={20}/>}/>
            <SidebarLinks route="/admin/users" label="Users" icon={<Profile2User size={20}/>}/>
            {role === "super_admin" && <SidebarLinks route="/admin/staff" label="Staff" icon={<Profile size={20}/>}/>}
            {role === "super_admin" && <SidebarLinks route="/admin/suspend" label="Suspend" icon={<CloseCircle size={20}/>}/>}
            <SidebarLinks route="/admin/support" label="Support" icon={<I24Support size={20}/>}/>
            <div className="absolute bottom-10 w-full">
                <SidebarLinks route="/admin/logout" label="Log Out" icon={<LogoutCurve size={20}/>}/> 
            </div>
          </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {role === "user" && <Downbar /> }
    </main>
  );
};

export default Sidebar;
