"use client"
import { useState } from 'react';
import { useTransactionStore } from "@/store/AdminTransactionStore";


const Dropdown = ({ allUsers }: any) => {
    const {updateUserId } = useTransactionStore()
  const [selectedUserId, setSelectedUserId] = useState('');

  const handleSelectChange = (event : any) => {
    setSelectedUserId(event.target.value);
    updateUserId(event.target.value)
  };

  return (
    <div className='flex flex-col gap-y-1'>
      <label htmlFor="userDropdown" className='text-sm lg:text-base text-[#06121B] cursor-pointer'>Select Client</label>
      <select id="userDropdown" onChange={handleSelectChange} value={selectedUserId} className='bg-white capitalize cursor-pointer border border-[#E6E7E8] px-2 xl:px-4 py-2 md:py-3 focus:border-primary rounded-md focus:outline-none'>
        <option value="">Select a user</option>
        {allUsers.map((user : any) => (
          <option key={user.id} value={user.id}>
            {`${user.firstName} ${user.lastName}`}
          </option>
        ))}
      </select>

      {/* <p>Selected User ID: {selectedUserId}</p> */}
    </div>
  );
};

export default Dropdown;
