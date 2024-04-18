"use client";
import { useEffect } from "react";
import { useBalanceStore } from "@/store/BalanceDetails";
const BalanceUpdate = ({ transactions, transactionBlocked }: any) => {
  const {
    updateMainBalance,
    updateCapitalWealthBalance,
    updateSaveboxBalance,
    updateTotalSavingsBalance,
    updateTransactionStatus,
  } = useBalanceStore();

  useEffect(() => {
    updateTransactionStatus(transactionBlocked)
    
    // Filter and accumulate Withdrawals
    const withdrawalAmount = transactions && transactions 
      .filter(
        (transaction: { type: string }) => transaction.type === "Withdrawal"
      )
      .reduce(
        (total: any, transaction: { amount: any }) =>
          total + transaction.amount,
        0
      );

    // Filter and accumulate Deposits
    const depositAmount = transactions && transactions
      .filter((transaction: { type: string }) => transaction.type === "Deposit")
      .reduce(
        (total: any, transaction: { amount: any }) =>
          total + transaction.amount,
        0
      );

    // Filter and accumulate Capital_Wealth transactions with isActive true
    const capitalWealthAmount = transactions && transactions
      .filter(
        (transaction: { type: string; isActive: any }) =>
          transaction.type === "Capital_Wealth" && transaction.isActive
      )
      .reduce(
        (total: any, transaction: { amount: any }) =>
          total + transaction.amount,
        0
      );

    // Filter and accumulate Utility_Bill transactions
    const utilityBillAmount = transactions && transactions
      .filter(
        (transaction: { type: string }) => transaction.type === "Utility_Bill"
      )
      .reduce(
        (total: any, transaction: { amount: any }) =>
          total + transaction.amount,
        0
      );

    // Filter and accumulate Domestic_Wire_Transfer transactions with status 'successfull'
    const domesticWireTransferAmount = transactions && transactions
      .filter(
        (transaction: { type: string; status: string }) =>
          transaction.type === "Domestic_Wire_Transfer" &&
          transaction.status === "successfull"
      )
      .reduce(
        (total: any, transaction: { amount: any }) =>
          total + transaction.amount,
        0
      );

    // Filter and accumulate International_Wire_Transfer transactions with status 'successfull'
    const internationalWireTransferAmount = transactions && transactions
      .filter(
        (transaction: { type: string; status: string }) =>
          transaction.type === "International_Wire_Transfer" &&
          transaction.status === "successfull"
      )
      .reduce(
        (total: any, transaction: { amount: any }) =>
          total + transaction.amount,
        0
      );

    // Filter and accumulate SaveBox transactions
    const saveBoxAmount = transactions && transactions
      .filter((transaction: { isSaveBox: any }) => transaction.isSaveBox)
      .reduce(
        (total: any, transaction: { saveBoxAmount: any }) =>
          total + transaction.saveBoxAmount,
        0
      );
    //Get main balance
const mainBalance = depositAmount - withdrawalAmount - capitalWealthAmount - utilityBillAmount - domesticWireTransferAmount - internationalWireTransferAmount - saveBoxAmount;
const totalSavings = capitalWealthAmount + saveBoxAmount
//Update individual balances
      updateSaveboxBalance(saveBoxAmount)
      updateCapitalWealthBalance(capitalWealthAmount)
      updateMainBalance(mainBalance)
      updateTotalSavingsBalance(totalSavings)
  }, [transactionBlocked, transactions, updateCapitalWealthBalance, updateMainBalance, updateSaveboxBalance, updateTotalSavingsBalance, updateTransactionStatus]);


  return <main></main>;
};

export default BalanceUpdate;
