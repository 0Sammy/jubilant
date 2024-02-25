import Image from "next/image";

import getIndividualUser from "@/actions/getIndividualUser";
import getIndividualUserTransaction from "@/actions/getIndividualUserTransaction";
import { formatDate, formatDateTime } from "@/lib/dateTimeUtils";
import Link from "next/link";

//Import Needed Components
import Header from "@/components/AdminComponents/Header";
import SuspendButton from "@/components/AdminComponents/SuspendButton";
import VerifyButton from "@/components/AdminComponents/VerifyButton";
import DeleteButton from "@/components/AdminComponents/DeleteButton";
import UserCurrencyChange from "@/components/AdminComponents/UserCurrencyChange";


import {
  Bill,
  Import,
  MoneyRecive,
  MoneySend,
  Send2,
  WalletMoney,
} from "iconsax-react";



export const revalidate = 1;
const page = async ({ params }: { params: { id: string } }) => {
  const userId = params.id;
  const currentUser = await getIndividualUser(userId);
  //console.log({currentUser})
  const userTransaction = await getIndividualUserTransaction(userId);
  const currentCurrency = currentUser?.currency

  //console.log({userTransaction})
  const wireTransferTransactions = userTransaction?.filter((transaction) =>
    transaction.type.includes("Wire_Transfer")
  );
  const deposits = userTransaction?.filter(
    (transaction) => transaction.type === "Deposit"
  );
  // Filter and accumulate Withdrawals
  const withdrawalAmount =
    userTransaction &&
    userTransaction
      .filter(
        (transaction: { type: string }) => transaction.type === "Withdrawal"
      )
      .reduce(
        (total: any, transaction: { amount: any }) =>
          total + transaction.amount,
        0
      );

  // Filter and accumulate Deposits
  const depositAmount =
    userTransaction &&
    userTransaction
      .filter((transaction: { type: string }) => transaction.type === "Deposit")
      .reduce(
        (total: any, transaction: { amount: any }) =>
          total + transaction.amount,
        0
      );

  // Filter and accumulate Capital_Wealth userTransaction with isActive true
  const capitalWealthAmount =
    userTransaction &&
    userTransaction
      .filter(
        (transaction: { type: string; isActive: any }) =>
          transaction.type === "Capital_Wealth" && transaction.isActive
      )
      .reduce(
        (total: any, transaction: { amount: any }) =>
          total + transaction.amount,
        0
      );

  // Filter and accumulate Utility_Bill userTransaction
  const utilityBillAmount =
    userTransaction &&
    userTransaction
      .filter(
        (transaction: { type: string }) => transaction.type === "Utility_Bill"
      )
      .reduce(
        (total: any, transaction: { amount: any }) =>
          total + transaction.amount,
        0
      );

  // Filter and accumulate Domestic_Wire_Transfer transactions with status 'successfull'
  const domesticWireTransferAmount =
    userTransaction &&
    userTransaction
      .filter(
        (transaction: { type: any; status: any }) =>
          transaction.type === "Domestic_Wire_Transfer" &&
          transaction.status === "successfull"
      )
      .reduce(
        (total: any, transaction: { amount: any }) =>
          total + transaction.amount,
        0
      );

  // Filter and accumulate International_Wire_Transfer transactions with status 'successfull'
  const internationalWireTransferAmount =
    userTransaction &&
    userTransaction
      .filter(
        (transaction: { type: any; status: any }) =>
          transaction.type === "International_Wire_Transfer" &&
          transaction.status === "successfull"
      )
      .reduce(
        (total: any, transaction: { amount: any }) =>
          total + transaction.amount,
        0
      );

  // Filter and accumulate SaveBox userTransaction
  const saveBoxAmount =
    userTransaction &&
    userTransaction
      .filter((transaction: { isSaveBox: any }) => transaction.isSaveBox)
      .reduce(
        (total: any, transaction: { saveBoxAmount: any }) =>
          total + transaction.saveBoxAmount,
        0
      );
  //Get main balance
  const mainBalance =
    depositAmount -
    withdrawalAmount -
    capitalWealthAmount -
    utilityBillAmount -
    domesticWireTransferAmount -
    internationalWireTransferAmount -
    saveBoxAmount;
  const totalSavings = capitalWealthAmount + saveBoxAmount;
  return (
    <main>
      <Header page={`${currentUser?.firstName} Profile`} />
      <div className="px-4 md:px-6 xl:px-8 py-4">
        <div className="flex flex-col gap-y-3 lg:gap-y-0 lg:flex-row lg:justify-between">
          <div className="lg:w-[40%] border border-[#7676801F] p-4 rounded-xl">
            <p className="text-xs md:text-sm xl:text-base font-semibold text-[#141619]">
              Personal Information
            </p>
            <div className="flex flex-col gap-y-2 lg:gap-y-0 lg:flex-row lg:gap-x-4 mt-8">
              <div className="relative size-10 md:size-12 xl:size-16 rounded-[50%]">
                <Image
                  src={currentUser?.profileImgSrc ?? ""}
                  alt={`${currentUser?.firstName} picture`}
                  className="rounded-[50%] absolute"
                  fill
                />
              </div>
              <div className="flex flex-col gap-y-2 text-[#141619] text-xs md:text-sm xl:text-base">
                <p className="capitalize">
                  {currentUser?.firstName} {currentUser?.lastName}
                </p>
                <p>{currentUser?.email}</p>
                <p>{formatDateTime(currentUser?.dateOfBirth ?? "")}</p>
              </div>
            </div>
          </div>
          <div className="lg:w-[58%] border border-[#7676801F] p-4 rounded-xl">
            <p className="text-xs md:text-sm xl:text-base font-semibold text-[#141619]">
              Contact Information
            </p>
            <div className="flex flex-col gap-y-2 lg:gap-y-0 lg:flex-row lg:gap-x-2 mt-8 text-[#141619] text-xs md:text-sm xl:text-base">
              <div className="flex flex-col gap-y-2">
                <div className="flex gap-x-1">
                  <p className="text-[#B9BAC0]">City:</p>
                  <p>{currentUser?.city}</p>
                </div>
                <div className="flex gap-x-1">
                  <p className="text-[#B9BAC0]">State:</p>
                  <p>{currentUser?.state}</p>
                </div>
                <div className="flex gap-x-1">
                  <p className="text-[#B9BAC0]">Mobile Number:</p>
                  <p>{currentUser?.mobileNumber}</p>
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex gap-x-1">
                  <p className="text-[#B9BAC0]">Address:</p>
                  <p>{currentUser?.address}</p>
                </div>
                <div className="flex gap-x-1">
                  <p className="text-[#B9BAC0]">Country:</p>
                  <p>{currentUser?.country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 lg:gap-y-0 lg:flex-row lg:justify-between mt-8">
          <div className="lg:w-[49%] border border-[#7676801F] p-4 rounded-xl">
            <p className="text-xs md:text-sm xl:text-base font-semibold text-[#141619]">
              Security details
            </p>
            <div className="mt-8 flex flex-col gap-y-2 text-[#141619] text-xs md:text-sm xl:text-base">
              <div className="flex gap-x-1">
                <p className="text-[#B9BAC0]">ID Type:</p>
                <p>{currentUser?.idType}</p>
              </div>
              <div className="flex gap-x-1">
                <p className="text-[#B9BAC0]">ID Number:</p>
                <p>{currentUser?.idNumber}</p>
              </div>
              <div className="flex gap-x-1">
                <p className="text-[#B9BAC0]">Date of Expiration:</p>
                <p>{formatDateTime(currentUser?.dateOfExpiry ?? "")}</p>
              </div>
              <div className="flex gap-x-1">
                <p className="text-[#B9BAC0]">Account creation date:</p>
                <p>{formatDate(currentUser?.createdAt ?? new Date)}</p>
              </div>
              <p className="text-xs md:text-sm xl:text-base font-semibold text-[#141619] mt-4">Account Details</p>
              <div className="flex gap-x-1">
                <p className="text-[#B9BAC0]">Account Number:</p>
                <p>{currentUser?.accountNumber}</p>
              </div>
              <div className="flex gap-x-1">
                <p className="text-[#B9BAC0]">Transaction Pin:</p>
                <p>{currentUser?.transactionPin}</p>
              </div>
              <div className="flex gap-x-1">
                <p className="text-[#B9BAC0]">Has client verified his email?:</p>
                <p>{currentUser?.isEmailVerified ? "Yes" : "No"}</p>
              </div>
              <div className="flex gap-x-1">
                <p className="text-[#B9BAC0]">Did client request for an ATM?:</p>
                <p>{currentUser?.atmRequest ? "Yes" : "No"}</p>
              </div>
              <div className="flex gap-x-1">
                <p className="text-[#B9BAC0]">Is Client Suspended:</p>
                <p>{currentUser?.isSuspended ? "Yes" : "No"}</p>
              </div>
              <div className="flex gap-x-1">
                <p className="text-[#B9BAC0]">Is Client Verified:</p>
                <p>{currentUser?.isVerified ? "Yes" : "No"}</p>
              </div>

            </div>
          </div>
          <div className="lg:w-[49%] border border-[#7676801F] p-4 rounded-xl">
            <p className="text-xs md:text-sm xl:text-base font-semibold text-[#141619]">
              IDs
            </p>
            <div className="flex justify-between mt-8">
              <div className="relative rounded-lg w-[49%] h-60">
                <Image
                  src={currentUser?.idCardFrontImgSrc ?? ""}
                  alt={`${currentUser?.firstName} Front ID`}
                  className="rounded-lg absolute"
                  fill
                />
              </div>
              <div className="relative rounded-lg w-[49%] h-60">
                <Image
                  src={currentUser?.idCardBackImgSrc ?? ""}
                  alt={`${currentUser?.firstName} Back ID`}
                  className="rounded-lg absolute"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 lg:gap-y-0 lg:flex-row lg:justify-between mt-8">
          <div className="lg:w-[49%] border border-[#7676801F] p-4 rounded-xl">
            <p className="text-xs md:text-sm xl:text-base font-semibold text-[#141619]">
              Activity
            </p>
            <div className="flex justify-between mt-8">
              <div className="flex flex-col gap-y-1">
                <p className="text-[8px] md:text-[10px] xl:text-[12px] text-secondary">
                  Current Balance
                </p>
                <p className="text-[#D56F3E] text-lg md:text-xl lg:text-2xl font-semibold">
                  {currentCurrency ?? "€"}{mainBalance.toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col gap-y-1">
                <p className="text-[8px] md:text-[10px] xl:text-[12px] text-secondary">
                  Savings
                </p>
                <p className="text-[#34C759] text-lg md:text-xl lg:text-2xl font-semibold">
                  +{currentCurrency ?? "€"}{totalSavings.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex justify-between mt-10">
              <div className="w-[49%] border border-[#7676801F] h-24 rounded-lg bg-[#F3F6FB] flex items-center gap-x-2 p-2 sm:p-4 xl:p-6">
                <div className="size-10 md:size-12 xl:size-14 rounded-[50%] bg-white border border-[#78788029] flex items-center justify-center">
                  <Send2
                    className="text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px]"
                    color="#06121B"
                  />
                </div>
                <div>
                  <p className="text-[0.6rem] md:text-xs">Transfers</p>
                  <p className="font-medium text-xl text-[#06121B] mt-1">
                    {wireTransferTransactions &&
                      wireTransferTransactions.length}
                  </p>
                </div>
              </div>
              <div className="w-[49%] border border-[#7676801F] h-24 rounded-lg bg-[#F3F6FB] flex items-center gap-x-2 p-2 sm:p-4 xl:p-6">
                <div className="size-10 md:size-12 xl:size-14 rounded-[50%] bg-white border border-[#78788029] flex items-center justify-center">
                  <Import
                    className="text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px]"
                    color="#06121B"
                  />
                </div>
                <div>
                  <p className="text-[0.6rem] md:text-xs">Deposits</p>
                  <p className="font-medium text-xl text-[#06121B] mt-1">
                    {deposits && deposits.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-[49%] border border-[#7676801F] p-4 rounded-xl max-h-[30rem] special overflow-y-auto">
            <p className="text-xs md:text-sm xl:text-base font-semibold text-[#141619] mb-4">
              Transaction History
            </p>
            {userTransaction &&
              userTransaction.map((transaction: any) => (
                <Link
                  key={transaction.id}
                  href={`/admin/history/${transaction.id}`}
                >
                  <div className="flex items-center justify-between py-4">
                    <div className="flex gap-x-1 items-center">
                      <div
                        className={`${
                          transaction.type === "Deposit"
                            ? "bg-[#2DE3001A]"
                            : "bg-[#DB64641A]"
                        }  rounded-[50%] p-2`}
                      >
                        {transaction.type === "Deposit" ? (
                          <MoneyRecive size="24" color="#198754" />
                        ) : transaction.type.includes("Wire_Transfer") ? (
                          <MoneySend size="24" color="#DC3545" />
                        ) : transaction.type === "Utility_Bill" ? (
                          <Bill size="24" color="#DC3545" />
                        ) : (
                          <WalletMoney size="24" color="#DC3545" />
                        )}
                      </div>

                      <div className="flex flex-col gap-y-0.5">
                        <p className="text-[#141619] text-[12px] md:text-[14px] xl:text-[16px] font-semibold capitalize">
                          {transaction.type === "Deposit"
                            ? "Deposit"
                            : transaction.type === "Domestic_Wire_Transfer"
                            ? "Local Wire Transfer"
                            : transaction.type === "International_Wire_Transfer"
                            ? "International Wire Transfer"
                            : transaction.type === "Utility_Bill"
                            ? "Utility Bill"
                            : "Savings"}
                        </p>
                        <p className="text-[#9EA0A3] text-[0.6rem] xl:text-xs">
                          {transaction.doneByAdmin
                            ? formatDateTime(transaction.customCreatedTime)
                            : formatDate(transaction.createdAt)}
                          .
                        </p>
                      </div>
                    </div>
                    <p
                      className={`${
                        transaction.type === "Deposit"
                          ? "text-[#198754]"
                          : "text-[#DC3545]"
                      } text-xs md:text-sm xl:text-base font-medium`}
                    >
                      {transaction.type === "Deposit"
                        ? `+${currentCurrency ?? "€"}${transaction.amount}`
                        : `-${currentCurrency ?? "€"}${transaction.amount}`}
                    </p>
                  </div>
                </Link>
              ))}
            {userTransaction && userTransaction.length === 0 && (
              <div className="flex justify-center py-4">
                <p className="text-sm xl:text-base text-secondary text-center">
                  No Transaction Yet
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 border border-[#7676801F] p-4 rounded-xl">
            <p className="text-xs md:text-sm xl:text-base font-semibold text-[#141619]">
              Quick Actions
            </p>    
            <div className="flex justify-between mt-4 gap-x-2">
                <VerifyButton userEmail={currentUser?.email ?? ""} userVerified={currentUser?.isVerified ?? false} name={`${currentUser?.firstName} ${currentUser?.lastName}`}/> <SuspendButton userEmail={currentUser?.email ?? ""} userSuspended={currentUser?.isSuspended ?? false} accountNumber={currentUser?.accountNumber ?? ""} name={`${currentUser?.firstName} ${currentUser?.lastName}`} /> <DeleteButton userEmail={currentUser?.email ?? ""}/>
            </div>
        </div>
        <UserCurrencyChange currentCurrency= {currentCurrency} userEmail= {currentUser?.email} name={`${currentUser?.firstName} ${currentUser?.lastName}`}/>
      </div>
    </main>
  );
};

export default page;
