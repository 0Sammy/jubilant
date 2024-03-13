"use client";
import { useState, useEffect, FormEvent } from "react";
import { useTransactionStore } from "@/store/AdminTransactionStore";
import { toast } from "sonner";

//Import Needed Components
import Dropdown from "./Dropdown";
import DepositDropDown from "./DepositDropDown";
import { makeApiRequest } from "@/lib/apiUtils";

type transactionProps = {
  allUsers: any;
  loggedInEmail: string | any;
};

const TransactionForm = ({ allUsers, loggedInEmail }: transactionProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [saveboxAmount, setSaveboxAmount] = useState<number>();
  const [saveBox, setSaveBox] = useState<boolean>(false);
  //For the transaction Fee
  const [fee, setFee] = useState<number>(0);
  //For the safebox
  function handleSaveBoxChange() {
    setSaveBox((prev) => !prev);
  }

  const {
    amount,
    accountName,
    accountNumber,
    depositMethod,
    bankName,
    swiftCode,
    description,
    iban,
    isSavebox,
    doneByAdmin,
    adminEmail,
    userId,
    customDate,
  } = useTransactionStore();
  const {
    updateAmount,
    updateAccountName,
    updateAccountNumber,
    updateDepositMethod,
    updateBankName,
    updateSwiftCode,
    updateDescription,
    updateIban,
    updateSaveBox,
    updateAdminEmail,
    updateCustomDate,
    reset,
  } = useTransactionStore();

  useEffect(() => {
    updateAdminEmail(loggedInEmail);

    if (saveBox) {
      updateSaveBox(true);
    } else {
      updateSaveBox(false);
    }

    if (saveBox) {
      const onePercent = (1 / 100) * amount;
      setSaveboxAmount(onePercent);
    }

    if (depositMethod === "International_Wire_Transfer") {
      setFee(5);
    }
  }, [
    amount,
    depositMethod,
    loggedInEmail,
    saveBox,
    updateAdminEmail,
    updateDepositMethod,
    updateSaveBox,
  ]);

  //OnSubmit function
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const formData = {
      amount,
      accountName,
      accountNumber,
      depositMethod,
      bankName,
      swiftCode,
      description,
      iban,
      isSavebox,
      doneByAdmin,
      adminEmail,
      userId,
      saveboxAmount,
      customDate,
      fee,
      status: "successfull",
    };

    makeApiRequest("/transaction", "post", formData, {
      onSuccess: () => {
        // Handle success
        setLoading(false);
        toast.success("Transaction was added successfully");
        reset();
      },
      onError: (error: any) => {
        // Handle error
        setLoading(false);
        if (error.message === "Missing Fields") {
          toast.error("Missing fields, contact the developer.");
        }
        toast.error("Unable to add transaction now, please try again later.");
        reset();
      },
    });
  };

  return (
    <main className="text-xs md:text-sm xl:text-base">
      <form onSubmit={onSubmit}>
        <Dropdown allUsers={allUsers} />
        <DepositDropDown />
        <div className="flex flex-col gap-y-1 mt-4">
          <label
            htmlFor="amount"
            className="text-sm lg:text-base text-[#06121B] cursor-pointer"
          >
            Amount
          </label>
          <input
            value={amount}
            onChange={(e: any) => updateAmount(e.target.value)}
            required
            placeholder="Enter Amount"
            pattern="\d+" 
            title="Please enter a positive number"
            type="number"
            name="amount"
            id="amount"
            className="border border-[#E6E7E8] px-2 xl:px-4 py-2 md:py-3 focus:border-primary rounded-md focus:outline-none placeholder:text-xs xl:placeholder:text-sm placeholder:text-[#9EA0A3]"
          />
        </div>
        <div className="flex flex-col gap-y-1 mt-4">
          <label
            htmlFor="description"
            className="text-sm lg:text-base text-[#06121B] cursor-pointer"
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(e: any) => updateDescription(e.target.value)}
            required
            placeholder="Enter a brief Description"
            name="description"
            id="description"
            maxLength={50}
            className="resize-none border border-[#E6E7E8] px-2 xl:px-4 py-2 h-14 focus:border-primary rounded-md focus:outline-none placeholder:text-xs xl:placeholder:text-sm placeholder:text-[#9EA0A3]"
          />
        </div>
        {depositMethod !== "Capital_Wealth" &&
          depositMethod !== "Utility_Bill" && (
            <div className="flex flex-col gap-y-1 mt-4">
              <label
                htmlFor="bankName"
                className="text-sm lg:text-base text-[#06121B] cursor-pointer"
              >
                Bank name
              </label>
              <input
                value={bankName}
                onChange={(e: any) => updateBankName(e.target.value)}
                required
                placeholder="Deutsche Bank"
                type="text"
                title="Please enter the bank name"
                name="bankName"
                id="bankName"
                className="border border-[#E6E7E8] px-2 xl:px-4 py-2 md:py-3 focus:border-primary rounded-md focus:outline-none placeholder:text-xs xl:placeholder:text-sm placeholder:text-[#9EA0A3]"
              />
            </div>
          )}

        {depositMethod &&
          depositMethod !== "Deposit" &&
          depositMethod !== "Capital_Wealth" &&
          depositMethod !== "Utility_Bill" && (
            <div className="flex flex-col gap-y-4 mt-4">
              <div className="flex flex-col gap-y-1">
                <label
                  htmlFor="accountNumber"
                  className="text-sm lg:text-base text-[#06121B] cursor-pointer"
                >
                  Account number
                </label>
                <input
                  value={accountNumber}
                  onChange={(e) => {
                    updateAccountNumber(e.target.value);
                  }}
                  required
                  placeholder="0930202020"
                  pattern="\d{10}"
                  type="text"
                  title="Please enter a 10 digit account number"
                  name="accountNumber"
                  id="accountNumber"
                  max={10}
                  className="border border-[#E6E7E8] px-2 xl:px-4 py-2 md:py-3 focus:border-primary rounded-md focus:outline-none placeholder:text-xs xl:placeholder:text-sm placeholder:text-[#9EA0A3]"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label
                  htmlFor="accountName"
                  className="text-sm lg:text-base text-[#06121B] cursor-pointer"
                >
                  Account name
                </label>
                <input
                  value={accountName}
                  onChange={(e: any) => updateAccountName(e.target.value)}
                  required
                  placeholder="John Doe"
                  type="text"
                  name="accountName"
                  id="accountName"
                  className="border border-[#E6E7E8] px-2 xl:px-4 py-2 md:py-3 focus:border-primary rounded-md focus:outline-none placeholder:text-xs xl:placeholder:text-sm placeholder:text-[#9EA0A3]"
                />
              </div>
            </div>
          )}
        {depositMethod &&
          depositMethod !== "Deposit" &&
          depositMethod !== "Capital_Wealth" &&
          depositMethod !== "Utility_Bill" && (
            <label
              className={`mt-4 border border-[#E6E7E8] ${
                saveBox ? "bg-indigo-50 text-indigo-900 ring-indigo-200" : ""
              } p-2 md:p-3 flex justify-between rounded-lg cursor-pointer hover:bg-[#B9BAC0] hover:bg-opacity-20`}
            >
              Save 1% of the transfer amount
              <input
                onClick={handleSaveBoxChange}
                type="checkbox"
                checked={saveBox}
                className="checked:border-indigo-500"
              />
            </label>
          )}

        {depositMethod === "International_Wire_Transfer" && (
          <div>
            <div className="flex flex-col gap-y-1 mt-4">
              <label
                htmlFor="iban"
                className="text-sm lg:text-base text-[#06121B] cursor-pointer"
              >
                IBAN
              </label>
              <input
                value={iban}
                onChange={(e: any) => updateIban(e.target.value)}
                required
                placeholder="Enter Recipient IBAN"
                type="string"
                name="iban"
                id="iban"
                className="border border-[#E6E7E8] px-2 xl:px-4 py-2 md:py-3 focus:border-primary rounded-md focus:outline-none placeholder:text-xs xl:placeholder:text-sm placeholder:text-[#9EA0A3]"
              />
            </div>
            <div className="flex flex-col gap-y-1 mt-4">
              <label
                htmlFor="swiftCode"
                className="text-sm lg:text-base text-[#06121B] cursor-pointer"
              >
                Swift Code
              </label>
              <input
                value={swiftCode}
                onChange={(e: any) => updateSwiftCode(e.target.value)}
                required
                placeholder="Enter Bank SWIFT/BIC Code"
                type="string"
                name="swiftCode"
                id="swiftCode"
                className="border border-[#E6E7E8] px-2 xl:px-4 py-2 md:py-3 focus:border-primary rounded-md focus:outline-none placeholder:text-xs xl:placeholder:text-sm placeholder:text-[#9EA0A3]"
              />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-y-1 mt-4">
          <label
            htmlFor="customDate"
            className="text-sm lg:text-base text-[#06121B] cursor-pointer"
          >
            Custom Date
          </label>
          <input
            type="datetime-local"
            onChange={(e: any) => updateCustomDate(e.target.value)}
            name="customDate"
            id="CustomDate"
            className="w-full border border-[#E6E7E8] px-2 xl:px-4 py-2 md:py-3 focus:border-primary rounded-md focus:outline-none placeholder:text-xs xl:placeholder:text-sm placeholder:text-[#9EA0A3]"
          />
        </div>
        <input
          type="submit"
          value={loading ? "Creating Transaction..." : "Create Transaction"}
          className="w-full bg-[#D56F3E] border border-[#D56F3E] hover:text-[#D56F3E] hover:bg-white duration-500 cursor-pointer mt-8 rounded-md py-2 text-sm text-white sm:text-base md:py-3 lg:text-lg"
        />
      </form>
    </main>
  );
};

export default TransactionForm;
