"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import { makeApiRequest } from "@/lib/apiUtils";

//Import Needed Icons
import { AddCircle } from "iconsax-react";

type profileEdit = {
  hideModal?: () => void;
  email: string;
  transactionPin: string;
};

const SecurityForm = ({ hideModal, email, transactionPin }: profileEdit) => {
  const [oldTransactionPin, setOldTransactionPin] = useState<string>("");
  const [newTransactionPin, setNewTransactionPin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  //OnSubmit function
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if(oldTransactionPin !== transactionPin){

        toast.error("Old pin incorrect, kindly try again.")
        setLoading(false)
        return

    }
    const formData = { email: email, page: "security", newTransactionPin };
    makeApiRequest("/editProfile", "post", formData, {
      onSuccess: () => {
        setLoading(false);
        toast.success("New transaction pin updated successfully.");
        if (hideModal) {
          hideModal();
        }
        window.location.reload()
      },
      onError: (error: any) => {
        setLoading(false);
        toast.error(
          "Unable to update transaction pin, kindly try again later."
        );
        if (hideModal) {
          hideModal();
        }
        window.location.reload()
      },
    });
  };

  return (
    <main className="fixed h-screen w-full bg-black bg-opacity-80 flex items-center justify-center z-[700] top-0 left-0 text-xs md:text-sm xl:text-base text-[#161618]">
      <div className="relative w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] h-[18rem] lg:h-[22rem] bg-white p-4 md:p-8 rounded-md">
        <AddCircle
          size="20"
          className="absolute top-4 right-4 text-wrongRed cursor-pointer rotate-45"
          onClick={hideModal}
        />
        <form
          onSubmit={onSubmit}
          className="flex flex-col mt-4"
        >
        <div className="flex flex-col gap-y-2">
          <label className="cursor-pointer" htmlFor="oldpin">
            Old Pin
          </label>
          <input
            type="text"
            name="oldpin"
            id="oldpin"
            pattern="\d{4}"
            title="Please enter exactly 4 digits"
            className="border border-[#E6E7E8] px-2 xl:px-4 py-2 md:py-3 focus:border-primary rounded-md focus:outline-none"
            placeholder="XXXX"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setOldTransactionPin(e.target.value)}
          />
        </div>
          <div className="flex flex-col gap-y-2 mt-4">
            <label className="cursor-pointer" htmlFor="pin">
              New Pin
            </label>
            <input
              type="text"
              name="pin"
              id="pin"
              pattern="\d{4}"
              title="Please enter exactly 4 digits"
              className="border border-[#E6E7E8] px-2 xl:px-4 py-2 md:py-3 focus:border-primary rounded-md focus:outline-none"
              placeholder="XXXX"
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewTransactionPin(e.target.value)
              }
            />
          </div>
          <button
            type="submit"
            className="mt-6 bg-primary w-full py-2 md:py-3 text-sm md:text-base rounded-lg text-white border border-primary hover:bg-white hover:text-primary duration-500"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default SecurityForm;
