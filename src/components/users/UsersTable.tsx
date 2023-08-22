"use client";

import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete, AiOutlineCloseCircle } from "react-icons/ai";
import { BeatLoader } from "react-spinners";

type Props = { data: any; usersApiMessage?: string };

const UsersTable = (props: Props) => {
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    if (props.usersApiMessage === "no users found") {
      setErrorMessage(true);
    } else if (props.data.length < 1) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [props.data, props.usersApiMessage]);

  return (
    <div className="p-2 relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-400 h-[50px] z-10">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              First Name
            </th>
            <th scope="col" className="px-6 py-3">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>

        <tbody className="relative">
          {isLoading ? (
            <tr className="text-2xl text-black px-6 py-4 text-center flex justify-center">
              <BeatLoader size={10} color={"#36d7b7"} />
            </tr>
          ) : props.data.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                No data found.
              </td>
            </tr>
          ) : (
            props.data.map((item: any, index: number) => (
              <tr
                className="bg-white border-b hover:bg-gray-200 dark:hover:bg-gray-50 text-xs text-gray-500 h-[50px]"
                key={index}
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap max-w-[100px] overflow-auto"
                >
                  {index + 1}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium max-w-[200px] break-words whitespace-break-spaces"
                >
                  {item.username}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium max-w-[100px] break-words whitespace-break-spaces"
                >
                  {item.firstName}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium max-w-[100px] break-words whitespace-break-spaces"
                >
                  {item.lastName}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium max-w-[100px] break-words whitespace-break-spaces"
                >
                  {item.email}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium max-w-[100px] break-words whitespace-break-spaces"
                >
                  {item.role}
                </td>
                <td
                  scope="row"
                  className="px-2 py-2 font-medium max-w-[100px] break-words whitespace-break-spaces flex space-x-3"
                >
                  <AiFillEdit
                    size={20}
                    className="text-blue-500 cursor-pointer hover:text-blue-900"
                  />
                  <AiFillDelete
                    size={20}
                    className="text-red-500 cursor-pointer hover:text-red-900"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
