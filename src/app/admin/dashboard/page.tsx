import getTransactions from "@/actions/getAllTransactions";

//Import Needed Components
import Header from "@/components/AdminComponents/Header";
import Activity from "@/components/AdminComponents/Activity";
import LastTransactions from "@/components/AdminComponents/LastTransactions";
import getUsers from "@/actions/getAllUsers";
import ChangeCurrency from "@/components/AdminComponents/ChangeCurrency";
import getCurrency from "@/actions/getCurrency";
import AdminChangePassword from "@/components/AdminComponents/AdminChangePassword";

export const revalidate = 1;
const page = async () => {
  
  const transactions = await getTransactions();
  //Get deposits
  const depositAmount =
    transactions &&
    transactions
      .filter((transaction: { type: string }) => transaction.type === "Deposit")
      .reduce(
        (total: any, transaction: { amount: any }) =>
          total + transaction.amount,
        0
      );
  // Filter and accumulate Domestic_Wire_Transfer transactions
  const domesticWireTransferAmount =
    transactions &&
    transactions
      .filter(
        (transaction: { type: string }) =>
          transaction.type === "Domestic_Wire_Transfer"
      )
      .reduce(
        (total: any, transaction: { amount: any }) =>
          total + transaction.amount,
        0
      );

  // Filter and accumulate International_Wire_Transfer transactions
  const internationalWireTransferAmount =
    transactions &&
    transactions
      .filter(
        (transaction: { type: string }) =>
          transaction.type === "International_Wire_Transfer"
      )
      .reduce(
        (total: any, transaction: { amount: any }) =>
          total + transaction.amount,
        0
      );
  // Filter and accumulate Capital_Wealth transactions with isActive true
  const capitalWealthAmount =
    transactions &&
    transactions
      .filter(
        (transaction: { type: string; isActive: any }) =>
          transaction.type === "Capital_Wealth" && transaction.isActive
      )
      .reduce(
        (total: any, transaction: { amount: any }) =>
          total + transaction.amount,
        0
      );
  // Filter and accumulate SaveBox transactions
  const saveBoxAmount =
    transactions &&
    transactions
      .filter((transaction: { isSaveBox: any }) => transaction.isSaveBox)
      .reduce(
        (total: any, transaction: { saveBoxAmount: any }) =>
          total + transaction.saveBoxAmount,
        0
      );
  const savedAmount = capitalWealthAmount + saveBoxAmount;
  const transferAmount = domesticWireTransferAmount + internationalWireTransferAmount;
  const lastSevenTransactions = transactions?.slice(0, 7);
  const clients = await getUsers();
  const currency = await getCurrency()
  const currentCurrency = currency?.currentCurrency

  return (
    <main>
      <Header page="Administration Dashboard" />
      <div className="px-4 md:px-6 xl:px-8 py-4">
        <Activity
          transferAmount={transferAmount}
          depositAmount={depositAmount}
          usersLength={clients?.length}
          savedAmount={savedAmount}
          currentCurrency={currentCurrency}
        />
        <LastTransactions transactions={lastSevenTransactions} currentCurrency={currentCurrency}/>
        <ChangeCurrency currentCurrency={currentCurrency}/>
        <AdminChangePassword />
      </div>
    </main>
  );
};

export default page;
