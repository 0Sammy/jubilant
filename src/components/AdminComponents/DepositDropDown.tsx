"use client"
import { useState } from 'react';
import { useTransactionStore } from "@/store/AdminTransactionStore";

const DepositDropDown = () => {
    const options = ["Deposit", "Capital_Wealth",  "Utility_Bill", "Domestic_Wire_Transfer", "International_Wire_Transfer"]
    const {updateDepositMethod } = useTransactionStore()
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleSelectChange = (event : any) => {
      setSelectedOption(event.target.value);
      updateDepositMethod(event.target.value)
    };
  
    return (
      <div className='flex flex-col gap-y-1 mt-4'>
        <label htmlFor="userDropdown" className='text-sm lg:text-base text-[#06121B] cursor-pointer'>Select Transaction</label>
        <select id="userDropdown" onChange={handleSelectChange} value={selectedOption} className='bg-white capitalize cursor-pointer border border-[#E6E7E8] px-2 xl:px-4 py-2 md:py-3 focus:border-primary rounded-md focus:outline-none'>
          <option value="">Select the transaction</option>
          {options.map((option, index) : any => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
  
        {/* <p>Selected User ID: {selectedOption}</p> */}
      </div>
    );
  };
 
export default DepositDropDown;