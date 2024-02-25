//Import Needed Icons
import { Bank, Card, House2, MoneyAdd } from "iconsax-react";

const WhyUs = () => {
    return ( 
        <main className="inter bg-[#FBF1EC] py-14 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 text-xs md:text-sm xl:text-base">
            <div className="text-center">
               <p className="text-primary text-sm md:text-base xl:text-lg font-semibold">Why Capital Sphere Bank?</p>
                <p className="text-3xl md:text-4xl xl:text-5xl font-bold mt-2 text-[#161618]">The only bank <br />you&apos;ll ever need</p>
                <p className="text-[#56575C] font-semibold mt-4">Our online banking platform is user-friendly and easy to navigate.</p> 
            </div>
            <div className="flex justify-center flex-wrap gap-5 lg:gap-7 xl:gap-10 mt-14 text-center">
                <div className="w-[23%] min-w-[17rem] flex flex-col gap-y-5 items-center border border-[#B2B3BA] p-4 rounded-xl">
                        <div className="bg-primary rounded-[50%] size-12 md:size-14 xl:size-16 flex justify-center items-center">
                            <Bank size="26" className="text-secondary" variant="Bold"/>
                        </div>
                        <div>
                            <p className="text-sm md:text-base xl:text-lg font-bold text-sidebar">Savings Accounts and CDs</p>
                            <p className="text-[#56575C]">Protect your hard-earned money with FDIC insured savings accounts featuring highly competitive interest rates along with no hidden monthly fees. Choose terms from 3 months up to 5 years on Certificates of Deposit to lock in returns.</p>
                        </div>
                        
                </div>
                <div className="w-[23%] min-w-[17rem] flex flex-col gap-y-5 items-center border border-[#B2B3BA] p-4 rounded-xl">
                        <div className="bg-primary rounded-[50%] size-12 md:size-14 xl:size-16 flex justify-center items-center">
                            <Card size="26" className="text-secondary" variant="Bold"/>
                        </div>
                        <div>
                            <p className="text-sm md:text-base xl:text-lg font-bold text-sidebar">Checking and Debit Cards</p>
                            <p className="text-[#56575C]">Enjoy full-service checking accounts with no ATM fees worldwide and zero liability fraud protection on our German-issued debit cards with advanced EMV chip and PIN technology for enhanced European-standard security.</p>
                        </div>
                        
                </div>
                <div className="w-[23%] min-w-[17rem] flex flex-col gap-y-5 items-center border border-[#B2B3BA] p-4 rounded-xl">
                        <div className="bg-primary rounded-[50%] size-12 md:size-14 xl:size-16 flex justify-center items-center">
                            <MoneyAdd size="26" className="text-secondary" variant="Bold"/>
                        </div>
                        <div>
                            <p className="text-sm md:text-base xl:text-lg font-bold text-sidebar">Home & Auto Loans</p>
                            <p className="text-[#56575C]">Leverage over a century of Cyprus lending prudence with flexible loan offerings tailored around down payments, terms, and interest rates that meet your budget on your next auto or home. Fixed rate mortgages as low as 3%.</p>
                        </div>
                        
                </div>
                <div className="w-[23%] min-w-[17rem] flex flex-col gap-y-5 items-center border border-[#B2B3BA] p-4 rounded-xl">
                        <div className="bg-primary rounded-[50%] size-12 md:size-14 xl:size-16 flex justify-center items-center">
                            <House2 size="26" className="text-secondary" variant="Bold"/>
                        </div>
                        <div>
                            <p className="text-sm md:text-base xl:text-lg font-bold text-sidebar">Investing & Retirement</p>
                            <p className="text-[#56575C]">Access globally diversified portfolios, stocks, bonds, annuities, mutual funds and managed retirement offerings through our investment management partners. Take charge of your financial future with the help of time-tested German financial planning.</p>
                        </div>
                        
                </div>
            </div>


        </main>
     );
}
 
export default WhyUs;