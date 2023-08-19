"use client";

import React from "react";
import UsersTable from "../../../components/users/UsersTable";
import { AiOutlinePlus } from "react-icons/ai";
import CreateUserForm from "@/components/users/CreateUserForm";
import { useRouter } from "next/navigation";

type UsersObject = {
  id: number;
  title: string;
  manufacturingDate: string;
  expiryDate: string;
  availability: boolean;
  quantity: number;
}[];

const Users = () => {
  const router = useRouter();
  const users: UsersObject = [
    {
      id: 1,
      title: "Paracetamol",
      manufacturingDate: "2023-05-01",
      expiryDate: "2023-11-05",
      availability: true,
      quantity: 520,
    },
    {
      id: 2,
      title: "Piriton",
      manufacturingDate: "2023-05-12",
      expiryDate: "2023-11-30",
      availability: true,
      quantity: 8000,
    },
    {
      id: 3,
      title: "Piriton and elhhujj",
      manufacturingDate: "2023-05-12",
      expiryDate: "2023-11-30",
      availability: true,
      quantity: 8000,
    },
  ];

  return (
    <div className="p-2">
      <div className="w-full flex justify-end p-2">
        <button
          onClick={() => router.push("/users/create")}
          className="border-1 dark:bg-gray-600 hover:bg-gray-500 p-2 rounded-md shadow-sm text-neutral-100 shadow-neutral-500 cursor-pointer text-sm flex space-x-2 items-center"
        >
          <span>Create User</span>
          <AiOutlinePlus size={15} />
        </button>
      </div>
      <UsersTable data={users} />
    </div>
  );
};

export default Users;
