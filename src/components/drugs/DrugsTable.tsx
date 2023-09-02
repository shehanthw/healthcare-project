import { deleteDrug } from "@/app/services/DrugsEndPoints";
import React from "react";
import { AiFillEdit, AiFillDelete, AiOutlineCloseCircle } from "react-icons/ai";
import { GoIssueClosed } from "react-icons/go";

type DrugsItems = {
  drugName: string;
  mfgDate: string;
  expDate: string;
  availability: boolean;
  quantity: number;
};
type Props = {
  data: DrugsItems[];
  toggleUpdateUserFrom: any;
  getDataFromDatabase: any;
  showToast: any;
};

const DrugsTable = (props: Props) => {
  const handleDelete = async (id: string) => {
    if (confirm("Please confirm to delete the drug !") == true) {
      const res = await deleteDrug(id);
      props.showToast("success", "drug has been deleted");
      props.getDataFromDatabase();
    } else {
      console.log(null);
    }
  };

  return (
    <div className="p-2 relative sm:rounded-lg w-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-md mb-8">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-400 h-[50px] z-10">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              drug title
            </th>
            <th scope="col" className="px-6 py-3">
              mfg date
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
          {props.data.map((item: any, index) => (
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
                className="px-6 py-4 font-medium whitespace-nowrap max-w-[200px] overflow-auto"
              >
                {item.drugName}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap max-w-[80px] overflow-auto"
              >
                {item.mfgDate}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap max-w-[80px] overflow-auto"
              >
                {item.expDate}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap max-w-[100px] overflow-auto flex items-center justify-center"
              >
                {item.availability ? (
                  <GoIssueClosed size={20} className="text-green-500" />
                ) : (
                  <AiOutlineCloseCircle size={20} className="text-red-500" />
                )}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap max-w-[50px] overflow-auto"
              >
                {item.quantity}
              </td>
              <td
                scope="row"
                className="px-2 py-2 font-medium text-neutral-700 whitespace-nowrap max-w-[100px] overflow-auto flex space-x-3"
              >
                <div onClick={() => props.toggleUpdateUserFrom(item._id)}>
                  <AiFillEdit
                    size={20}
                    className="text-blue-500 cursor-pointer hover:text-blue-900"
                  />
                </div>
                <div onClick={() => handleDelete(item._id)}>
                  <AiFillDelete
                    size={20}
                    className="text-red-500 cursor-pointer hover:text-red-900"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DrugsTable;
