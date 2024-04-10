"use client";
import { useState } from "react";
import { useTransactionStore } from "@/store/transactionStore";
import { useBalanceStore } from "@/store/BalanceDetails";
import VerifyPin from "./VerifyPin";
import { toast } from "sonner";
import { permanentRedirect } from "next/navigation";


const PaymentDetails = ({ userid, userPin, name, email, currentCurrency, isSuspended }: string | any) => {
  const { mainBalance } = useBalanceStore()
    //Verification Modal
    const [verifyModal, setVerifyModal] = useState<boolean>(false)
    //Function
    const showVerification = () => {
          setVerifyModal((prev) => !prev)
    }
    const {
        isSavebox,
        amount,
        accountName,
        accountNumber,
        depositMethod,
        bankName,
        swiftCode,
        description,
        iban,
      } = useTransactionStore();

      //verifyModal && permanentRedirect('/suspend') 
      
  return (
    <>
    {verifyModal && <VerifyPin hideModal={showVerification} id={userid} userPin={userPin} name={name} email={email}/>}
      <main className={`${!accountNumber && "hidden"} text-xs md:text-sm xl:text-base`}>
        <p className="text-sm lg:text-base text-[#06121B] font-semibold mb-4">
          Payment Details
        </p>
        <div className="border border-[#7676801F] mt-4 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="text-[10px] xl:text-[12px] text-[#B2B3BA]">
              Transfer Fee
            </p>
            <p className="font-medium text-[#06121B] text-right">
              {depositMethod === "International_Wire_Transfer" ? (currentCurrency ?? "€") + "5"
                : depositMethod === "Domestic_Wire_Transfer"
                ? (currentCurrency ?? "€") + "0"
                : ""}
            </p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-[10px] xl:text-[12px] text-[#B2B3BA]">
              Account Name
            </p>
            <p className="font-medium text-[#06121B] text-right">{accountName}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-[10px] xl:text-[12px] text-[#B2B3BA]">
              Account Number
            </p>
            <p className="font-medium text-[#06121B] text-right">{accountNumber}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-[10px] xl:text-[12px] text-[#B2B3BA]">
              Bank Name
            </p>
            <p className="font-medium text-[#06121B] text-right">{bankName}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-[10px] xl:text-[12px] text-[#B2B3BA]">
              Deposit Method
            </p>
            <p className="font-medium text-[#06121B] text-right">
              {depositMethod === "International_Wire_Transfer"
                ? "International Wire Transfer"
                : depositMethod === "Domestic_Wire_Transfer"
                ? "Local Transfer"
                : ""}
            </p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-[10px] xl:text-[12px] text-[#B2B3BA]">Amount</p>
            <p className="font-medium text-[#06121B] text-right">{currentCurrency ?? "€"}{amount}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-[10px] xl:text-[12px] text-[#B2B3BA]">
              Description
            </p>
            <p className="font-medium text-[#06121B] text-right">{description}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-[10px] xl:text-[12px] text-[#B2B3BA]">Save 1%</p>
            <p className="font-medium text-[#06121B] text-right">
              {isSavebox === true ? "Yes" : "No"}
            </p>
          </div>
          {depositMethod === "International_Wire_Transfer" && (
            <div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-[10px] xl:text-[12px] text-[#B2B3BA]">
                  Swift Code
                </p>
                <p className="font-medium text-[#06121B] text-right">{swiftCode}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-[10px] xl:text-[12px] text-[#B2B3BA]">
                  IBAN
                </p>
                <p className="font-medium text-[#06121B] text-right">{iban}</p>
              </div>
            </div>
          )}
        </div>
        <form>
          <input 
            onClick={() => {
              if (amount > mainBalance) {
                toast.error("Insufficient Funds");
              } else {
                showVerification();
              }
            }}
            type="button"
            value="Confirm"
            className="w-full bg-[#D56F3E] border border-[#D56F3E] hover:text-[#D56F3E] hover:bg-white duration-500 cursor-pointer mt-8 rounded-md py-2 text-sm text-white sm:text-base md:py-3 lg:text-lg"
          />
        </form>
      </main>
    </>
  );
};

export default PaymentDetails;
