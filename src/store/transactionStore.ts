import { create } from "zustand";

type transactionStore = {
  amount: number;
  accountName: string;
  accountNumber: string;
  depositMethod: string;
  bankName: string;
  swiftCode: string;
  description: string;
  iban: string;
  isSavebox: boolean;
  saveBeneficiary: boolean;
  updateAmount: (newAmount: number) => void;
  updateAccountName: (newName: string) => void;
  updateAccountNumber: (newAccountNumber: string) => void;
  updateDepositMethod: (newMethod: string) => void;
  updateBankName: (newName: string) => void;
  updateSwiftCode: (newCode: string) => void;
  updateDescription: (newDescription: string) => void;
  updateIban: (newIban: string) => void;
  updateSaveBox: (newSaveBox: boolean) => void;
  updateBeneficiary: (newBeneficiary: boolean) => void;
  reset: () => void;
};

export const useTransactionStore = create<transactionStore>((set) => ({
  amount: 0,
  accountName: "",
  accountNumber: "",
  depositMethod: "",
  bankName: "",
  swiftCode: "",
  description: "",
  iban: "",
  isSavebox: false,
  saveBeneficiary: false,
  updateAmount: (newAmount: number) => set({ amount: newAmount }),
  updateAccountName: (newName: string) => set({ accountName: newName }),
  updateAccountNumber: (newAccountNumber: string) =>
    set({ accountNumber: newAccountNumber }),
  updateDepositMethod: (newMethod: string) =>
    set({ depositMethod: newMethod }),
  updateBankName: (newName: string) => set({ bankName: newName }),
  updateSwiftCode: (newCode: string) => set({ swiftCode: newCode }),
  updateDescription: (newDescription: string) =>
    set({ description: newDescription }),
  updateIban: (newIban: string) => set({ iban: newIban }),
  updateSaveBox: (newSaveBox: boolean) => set({ isSavebox: newSaveBox }),
  updateBeneficiary: (newBeneficiary: boolean) => set({ saveBeneficiary: newBeneficiary }),
  reset: () =>
    set({
      amount: 0,
      accountName: "",
      accountNumber: "",
      depositMethod: "",
      bankName: "",
      swiftCode: "",
      description: "",
      iban: "",
      isSavebox: false,
      saveBeneficiary: false,
    }),
}));
