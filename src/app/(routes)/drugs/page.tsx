"use client";

import React, { useEffect, useState } from "react";
import DrugsTable from "../../../components/drugs/DrugsTable";
import { AiOutlinePlus } from "react-icons/ai";
import CreateUserForm from "@/components/users/CreateUserForm";
import { useRouter } from "next/navigation";
import { CheckAvailability } from "@/app/utils/drugsUtils";

type DrugsObject = {
  id: number;
  title: string;
  manufacturingDate: string;
  expiryDate: string;
  availability: boolean;
  quantity: number;
}[];

const Drugs = () => {
  const router = useRouter();
  const [updatedData, setData] = useState<DrugsObject>([]);

  const drugs: DrugsObject = [
    {
      id: 1,
      title: "Paracetamol",
      manufacturingDate: "2023-05-01",
      expiryDate: "2023-12-05",
      availability: true,
      quantity: 520,
    },
    {
      id: 2,
      title: "Piriton",
      manufacturingDate: "2023-05-12",
      expiryDate: "2023-08-21",
      availability: false,
      quantity: 500,
    },
    {
      id: 3,
      title: "Piriton and elhhujj",
      manufacturingDate: "2023-05-12",
      expiryDate: "2023-02-05",
      availability: true,
      quantity: 8000,
    },
  ];

  const setAvailability = () => {
    const updatedDrugs = drugs.map((item) => {
      const newAvailability = CheckAvailability(item.quantity, item.expiryDate);
      return { ...item, availability: newAvailability };
    });
    return updatedDrugs;
  };

  useEffect(() => {
    const updatedData = setAvailability();
    console.log(updatedData);
    console.log(drugs);
    setData(updatedData);
  }, []);

  return (
    <div className="p-2">
      <div className="w-full flex justify-end p-2">
        <button
          onClick={() => router.push("/")}
          className="btn btn-secondary flex space-x-2 items-center"
        >
          <span>Add a Drug</span>
          <AiOutlinePlus size={15} />
        </button>
      </div>
      <DrugsTable data={updatedData} />
    </div>
  );
};

export default Drugs;
