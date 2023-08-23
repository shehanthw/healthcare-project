import React from "react";
import { AiFillEdit, AiFillDelete, AiOutlineCloseCircle } from "react-icons/ai";
import { GoIssueClosed } from "react-icons/go";
import { BeatLoader } from "react-spinners";

type DrugsItems = {
  id: number;
  title: string;
  manufacturingDate: string;
  expiryDate: string;
  availability: boolean;
  quantity: number;
};
type Props = { data: DrugsItems[] };

const DrugsTable = (props: Props) => {
  return (
    <div className="p-2 relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-400 h-[50px] z-10">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              drug title
            </th>
            <th scope="col" className="px-6 py-3">
              manufacturing date
            </th>
            <th scope="col" className="px-6 py-3">
              expiry date
            </th>
            <th scope="col" className="px-6 py-3">
              availability
            </th>
            <th scope="col" className="px-6 py-3">
              quantity
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>

        <tbody>
          {props.data.map((item, index) => (
            <tr
              className="bg-white border-b hover:bg-gray-200 dark:hover:bg-gray-50 text-xs text-gray-500 h-[50px]"
              key={index}
            >
              <td
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap max-w-[100px] overflow-auto"
              >
                {item.id}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap max-w-[200px] overflow-auto"
              >
                {item.title}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap max-w-[100px] overflow-auto"
              >
                {item.manufacturingDate}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap max-w-[100px] overflow-auto"
              >
                {item.expiryDate}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap max-w-[100px] overflow-auto"
              >
                {item.availability ? (
                  <GoIssueClosed size={20} className="text-green-500" />
                ) : (
                  <AiOutlineCloseCircle size={20} className="text-red-500" />
                )}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap max-w-[100px] overflow-auto"
              >
                {item.quantity}
              </td>
              <td
                scope="row"
                className="px-2 py-2 font-medium text-neutral-700 whitespace-nowrap max-w-[100px] overflow-auto flex space-x-3"
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DrugsTable;
