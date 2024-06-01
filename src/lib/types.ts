//Authentication Types
export type Country = {
    code: string;
    name: string;
}

export type ID = {
  idType : string
}

//General Types


//User Dashboard Types

export type heading = {
  page: string,
  profilePicSrc: string | any
  name: string | any
  accountNumber: string | any
}

export type smallScreenAccount = {
  accountNumber: string | any,
  firstName: string | any,
  lastName: string | any,
}

//Transactions

// types.ts
export type TransactionType = 'Domestic_Wire_Transfer' | 'International_Wire_Transfer';

export type TransactionStatus = 'pending' | 'completed' | 'failed';

export type Transaction = {
  id?: string;
  type?: TransactionType;
  amount?: number;
  targetAccount?: string | null;
  targetName?: string | null;
  targetBankName?: string | null;
  swiftCode?: string | null;
  iban?: string | null;
  isSaveBox?: boolean;
  saveBoxAmount?: number | null;
  description?: string | null;
  doneByAdmin?: boolean;
  adminEmail?: string | null;
  transferFee?: number | null;
  isActive?: boolean;
  status?: TransactionStatus;
  userId?: string;
  customCreatedTime?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type verifyPin = {
  hideModal?: () => void;
  id?: string;
  userPin?: string;
  name?: string;
  email?: string;
};