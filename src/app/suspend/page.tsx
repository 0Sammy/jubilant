"use client"
const page = () => {

    const handleButtonClick = () => {
        // Email details
        const email = 'restricted@cspherebank.com';
        const subject = 'Account Restricted';
    
        // Create the mailto link
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    
        // Open the user's email client
        window.location.href = mailtoLink;
      };

    return ( 
        <main className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] flex flex-col gap-y-5 items-center justify-center h-screen mx-auto">
            <h1 className="text-[#020100] font-semibold text-[16px] md:text-[20px] xl:text-[24px]">Account Suspended</h1>
            <p className="text-xs md:text-sm xl:text-base text-[#8E8E93] font-medium">Your Account is Temporarily Suspended. You have the option to submit an appeal for review. Our team will carefully assess your appeal to determine the reinstatement of your account.</p>
            <button onClick={handleButtonClick} className="px-6 md:px-8 xl:px-10 py-2 md:py-3 rounded-lg bg-primary text-white border border-primary hover:bg-white hover:text-primary duration-500">Send an appeal</button>
        </main>
     );
}
 
export default page;