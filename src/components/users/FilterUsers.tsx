"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

type Props = {
  setFilterOn: Dispatch<SetStateAction<boolean>>;
  setUsername: Dispatch<SetStateAction<string>>;
  setRole: Dispatch<SetStateAction<string>>;
};

const FilterUsers = (props: Props) => {
  const [isChecked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const usernameValue = formData.get("username") || "";
    const roleValue = formData.get("role") || "";

    props.setUsername(String(usernameValue));
    props.setRole(String(roleValue));
    props.setFilterOn(false);
  };

  return (
    <div className="absolute layout-transition z-10 w-full h-full bg-neutral-400 bg-opacity-10 flex flex-col justify-center items-center backdrop-blur-sm backdrop-filter">
      <form
        className="w-[30%] h-[30%] bg-white shadow-md shadow-neutral-500 rounded-md flex flex-col text-neutral-700"
        onSubmit={(e) => handleForm(e)}
      >
        <span className="text-sm p-2 font-medium flex justify-center relative">
          Filter Users
          <div
            className="absolute right-0 mr-1 top-0 mt-2"
            onClick={() => props.setFilterOn(false)}
          >
            <AiFillCloseCircle
              size={25}
              className="text-red-600 hover:text-red-400 cursor-pointer"
            />
          </div>
        </span>
        {/* search by username */}
        <div className="p-2 space-x-4 text-sm flex items-center">
          <input
            type="checkbox"
            className="h-4 text-neutral-600 accent-green-500 w-[5%]"
            onChange={(e) => handleChange(e)}
          />
          <span className="w-[20%]">Username</span>
          <input
            type="text"
            className="p-1 pl-3 border border-neutral-300 w-[60%] outline-none h-[32px] focus:ring-blue-500/50 ring-offset-blue-500 focus:ring-1"
            disabled={isChecked ? false : true}
            id="username"
            name="username"
          />
        </div>

        {/* search by role */}
        <div className="p-2 space-x-4 text-sm flex items-center">
          <input
            type="checkbox"
            className="h-4 text-neutral-600 accent-green-500 w-[5%]"
            onChange={(e) => handleChange(e)}
          />
          <span className="w-[20%]">Role</span>
          <input
            type="text"
            className="p-1 pl-3 border border-neutral-300 w-[60%] outline-none h-[32px] focus:ring-blue-500/50 ring-offset-blue-500 focus:ring-1"
            disabled={isChecked ? false : true}
            id="role"
            name="role"
          />
        </div>

        <div className="p-2 space-x-4 text-sm flex items-center">
          <span className="w-[5%]"></span>
          <span className="w-[20%]"></span>
          <button className="btn btn-primary">Search</button>
        </div>
      </form>
    </div>
  );
};

export default FilterUsers;
