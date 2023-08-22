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
        className="w-[30%] h-[30%] bg-white shadow-md shadow-neutral-300 rounded-sm flex flex-col text-neutral-700 space-y-3"
        onSubmit={(e) => handleForm(e)}
      >
        <span className="text-sm h-[50px] font-medium flex pl-4 relative border items-center">
          Filter Users
          <div
            className="absolute right-0 mr-1 top-0 mt-3"
            onClick={() => props.setFilterOn(false)}
          >
            <AiFillCloseCircle
              size={25}
              className="text-red-600 hover:text-red-400 cursor-pointer"
            />
          </div>
        </span>
        {/* search by username */}
        <div className="flex w-full text-xs justify-start pl-4">
          <div className="flex w-[50%] flex-col space-y-3">
            <span className="w-[30%]">Username</span>
            <input
              type="text"
              className="p-2 border border-neutral-300 w-[90%] outline-none h-[32px] focus:ring-blue-500/50 ring-offset-blue-500 focus:ring-1"
              id="username"
              name="username"
            />
          </div>

          {/* search by role */}
          <div className="flex  w-[50%] flex-col space-y-3">
            <span className="w-[30%]">Role</span>
            <input
              type="text"
              className="p-2 border border-neutral-300 w-[90%] outline-none h-[32px] focus:ring-blue-500/50 ring-offset-blue-500 focus:ring-1"
              id="role"
              name="role"
            />
          </div>
        </div>

        <div className="p-2 pl-4 space-x-4 text-sm flex items-center">
          <button className="btn btn-secondary">Search</button>
        </div>
      </form>
    </div>
  );
};

export default FilterUsers;
