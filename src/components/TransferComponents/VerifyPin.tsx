"use client";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

//Utils
import { makeApiRequest } from "@/lib/apiUtils";
import { errorModalProps, successModalProps } from "@/lib/modalPropsMessages";
import { getFormattedDate } from "@/lib/getCurrentDate";

//Zustand States
import { useTransactionStore } from "@/store/transactionStore";
import { useBalanceStore } from "@/store/BalanceDetails";


//Import Needed Components
import Toast from "../molecules/Toast";

//Import Needed Icons
import { AddCircle, ChartCircle } from "iconsax-react";
import { BsEye, BsEyeSlash } from "react-icons/bs";


type verifyPin = {
  hideModal?: () => void;
  id?: string;
  userPin?: string;
  name?: string;
  email?: string;
};

const VerifyPin = ({ hideModal, id, userPin, name, email }: verifyPin) => {
  const router = useRouter();
  //For the transaction Fee && Savebox
  const [fee, setFee] = useState<number>(0);
  const [saveboxAmount, setSaveboxAmount] = useState<number>();
  //For the pin
  const [enteredPin, setEnteredPin] = useState<string>("");
  //For the password
  const [seen, setSeen] = useState<boolean>(false);
  //Function
  const handleSeePassword = () => {
    setSeen((prev) => !prev);
  };
  const { transactionBlocked } = useBalanceStore();
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
    reset
  } = useTransactionStore();

  //Use Effect for values update
  useEffect(() => {
    //Getting the submission values
    if (isSavebox) {
      const onePercent = (1 / 100) * amount;
      setSaveboxAmount(onePercent);
    }
    if (depositMethod === "International_Wire_Transfer") {
      setFee(5);
    }
    
  }, [amount, depositMethod, isSavebox]);

  //console.log({transactionBlocked})

  //State for the modals
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalProps, setModalProps] = useState<object>({});
  const [message, setMessage] = useState<string>("");
  //For the loading state
  const [loading, setLoading] = useState<boolean>(false);
  //Display the correct function
  const handleSuccess = () => {
    setShowModal(true);
    setModalProps(successModalProps);
  };

  const handleError = () => {
    setShowModal(true);
    setModalProps(errorModalProps);
  };
  const handleFinal = () => {
    setShowModal(false);
  };

  //OnSubmit Function
  const onSubmit = (event: FormEvent) => {
    
    event.preventDefault();
    setLoading(true);

    if(transactionBlocked) {
      toast.error("Sorry, Unauthorized activity detected, account suspension initiated.")
      setLoading(false)
      router.push('/suspend')
      return
    }

    //Add a 4 seconds delay
    setTimeout(() => {

    //Check Pin
    if (enteredPin !== userPin) {
      toast.error("Incorrect transaction pin, please try again.");
      setLoading(false)
      return;
    }

    const formData = {
      userId: id,
      isSavebox,
      amount,
      accountName,
      accountNumber,
      depositMethod,
      bankName,
      swiftCode,
      description,
      iban,
      saveboxAmount,
      fee,
    };
    //console.log({ formData });

    const emailData = {
      to: email,
      subject: "New Transaction",
      name: name,
      transactionAmount: amount.toLocaleString(),
      transactionType:
        depositMethod === "International_Wire_Transfer"
          ? "International Wire Transfer"
          : "Local Wire Transfer",
      recipientName: accountName,
      recipientAccountNumber: accountNumber,
      transactionDate: getFormattedDate(),
      emailType: "transaction",
    };
    //console.log({ emailData });

    makeApiRequest("/transaction", "post", formData, {
      onSuccess: () => {
        // Handle success
        setLoading(false);
        setMessage("Your Transfer was successful.");
        handleSuccess();
        makeApiRequest("/send-email", "post", emailData, {
          onSuccess: () => {
            // Handle success
            console.log("Email was sent successfully");
          },
          onError: (error: any) => {
            // Handle error
            console.log("Couldn't send email.");
          },
        });
        reset()
      },
      onError: (error: any) => {
        // Handle error
        setLoading(false);
        setMessage("Unable to process your transfer currently. Please try again.");
        handleError();
        reset()
      },
    });

    }, 4000)
    
  };
  return (
    <>
      {showModal && (
        <Toast {...modalProps} message={message} hideModal={handleFinal} />
      )}

      <main className="fixed h-screen w-full bg-black bg-opacity-80 flex items-center justify-center z-[70] top-0 left-0">
        <div className="relative w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] h-[20rem] md:h-[22rem] bg-white p-4 md:p-8 rounded-md">
          <AddCircle
            size="20"
            className="absolute top-4 right-4 text-wrongRed cursor-pointer rotate-45"
            onClick={hideModal}
          />
          <p className="text-textPrimary font-bold text-lg sm:text-xl md:text-2xl xl:text-3xl mt-2">
            Transaction Pin
          </p>
          <p className="text-xs md:text-sm xl:text-base font-medium text-[#B2B3BA] mt-2">
            Enter the pin to complete the transaction
          </p>
          <form className="mt-6" onSubmit={onSubmit}>
            <div className="relative flex flex-col gap-y-1 ">
              <label className="cursor-pointer" htmlFor="pin">
                Pin
              </label>
              <input
                type={seen ? "text" : "password"}
                name="pin"
                id="pin"
                pattern="\d{4}"
                title="Please enter exactly 4 digits"
                className="border border-[#E6E7E8] px-2 xl:px-4 py-2 md:py-3 focus:border-primary rounded-md focus:outline-none"
                placeholder="XXXX"
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEnteredPin(e.target.value)
                }
              />
              <div
                className="absolute top-[55%] right-4 cursor-pointer text-base sm:text-lg md:text-xl xl:text-2xl"
                onClick={handleSeePassword}
              >
                {seen ? <BsEyeSlash /> : <BsEye />}
              </div>
            </div>
            <button disabled={loading}
              type="submit"
              className={`flex items-center justify-center mt-8 w-full bg-[#D56F3E] border border-[#D56F3E] hover:text-[#D56F3E] hover:bg-white duration-500 cursor-pointer rounded-lg text-sm text-white sm:text-base py-3 lg:text-lg`}
            >{loading ? "Transferring..." : "Confirm"} <ChartCircle size="24" className={`${loading ? "" : "hidden"} animate-spin`}/> </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default VerifyPin;
