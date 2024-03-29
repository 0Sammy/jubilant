import Image from "next/image";

//Import Needed Images
import logo from "../../../public/Images/logo.svg";
//Import Needed Components
import Form from "@/components/AuthComponents/Form";

const page = () => {
    return ( 
        <main className="h-screen lg:flex">
            <div className="flex h-full flex-col justify-center px-6 sm:px-8 md:px-10 lg:w-1/2 lg:px-12 xl:px-14 2xl:px-16">
                <div className="flex gap-x-1">
                    <Image src={logo} alt="Capital Sphere Bank Logo" priority={true}/>
                    <div className="text-[#1C1F33] font-semibold text-xs sm:text-sm xl:text-base">
                        <p>Capital</p>
                        <p className="-mt-1">Sphere</p>
                        <p className="-mt-1">Bank</p>
                    </div>
                </div>
                <div className="text-[#161618] mt-10">
                    <p className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold">Set up your account</p>
                    <p className="text-xs sm:text-sm xl:text-base font-semibold mt-4">Welcome, let&apos;s get started</p>
                </div>
                <Form />
            </div>
            <div className="createBackground hidden lg:block lg:w-1/2"></div>
        </main>
     );
}
 
export default page;