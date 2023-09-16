"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import DrugsTable from "../../../components/drugs/DrugsTable";
import { AiOutlinePlus } from "react-icons/ai";
import CreateAppointForm from "@/components/appointments/CreateAppointForm";
import UpdateDrugForm from "@/components/drugs/UpdateDrugForm";
import FilterDrugs from "@/components/drugs/FilterDrugs";
import { useRouter } from "next/navigation";
import { CheckAvailability } from "@/app/utils/drugsUtils";
import { useToast } from "@/components/common/Toast";
import { getDrugs } from "@/app/services/DrugsEndPoints";
import { BeatLoader } from "react-spinners";

type DrugsObject = {
  drugName: string;
  mfgDate: string;
  expDate: string;
  availability: boolean;
  quantity: number;
}[];

const Appointments = () => {
  const router = useRouter();
  const [updatedData, setData] = useState<DrugsObject>([]);
  const [isCreateAppointFormOn, setCreateAppointFormOn] = useState(false);
  const [isUpdateDrugFormOn, setUpdateDrugFormOn] = useState(false);
  const [updateId, setUpdateId] = useState<string>("");
  const { Toast, showToast } = useToast();
  const [isLoading, setLoading] = useState(false);
  const [isFilterOn, setFilterOn] = useState(false);
  const [drugName, setDrugName] = useState("");

  const handleUserCreationButton = () => {
    setCreateAppointFormOn(true);
  };

  const toggleFilter = () => {
    setFilterOn(!isFilterOn);
  };

  const toggleUpdateUserFrom = (id: string) => {
    setUpdateId(id);
    setUpdateDrugFormOn(true);
  };

  const getDataFromDatabase = async () => {
    setLoading(true);
    const res = await getDrugs(drugName, "", "", "");
    const dataObj = res.drugs;
    const updatedDrugs = dataObj.map((item: any) => {
      const formattedExpDate = item.expDate.split("T")[0].trim();
      const formattedMfgDate = item.mfgDate.split("T")[0].trim();
      const newAvailability = CheckAvailability(item.quantity, item.expDate);
      setLoading(false);
      return {
        ...item,
        expDate: formattedExpDate,
        mfgDate: formattedMfgDate,
        availability: newAvailability,
      };
    });

    setData(updatedDrugs);
  };

  useEffect(() => {
    getDataFromDatabase();
  }, []);

  useEffect(() => {
    getDataFromDatabase();
  }, [drugName]);

  return (
    <div className="overflow-auto h-full">
      {isCreateAppointFormOn && (
        <CreateAppointForm
          setCreateAppointFormOn={setCreateAppointFormOn}
          showToast={showToast}
          getDataFromDatabase={getDataFromDatabase}
        />
      )}
      {isUpdateDrugFormOn && (
        <UpdateDrugForm
          setUpdateDrugFormOn={setUpdateDrugFormOn}
          updateId={updateId}
          showToast={showToast}
          getDataFromDatabase={getDataFromDatabase}
        />
      )}
      {Toast} {/* initializes toast component */}
      {isFilterOn && (
        <FilterDrugs setFilterOn={setFilterOn} setDrugName={setDrugName} />
      )}
      <div className="flex flex-col items-center">
        <div className="w-[95%] flex justify-between p-2">
          <button className="btn btn-secondary" onClick={toggleFilter}>
            Filter
          </button>
          <button
            onClick={() => handleUserCreationButton()}
            className="btn btn-secondary flex space-x-2 items-center"
          >
            <span>Create</span>
            <AiOutlinePlus size={15} />
          </button>
        </div>
        <div className="flex w-[95%] h-full justify-center">
          {isLoading ? (
            <BeatLoader size={10} color={"#36d7b7"} />
          ) : (
            <DrugsTable
              data={updatedData}
              toggleUpdateUserFrom={toggleUpdateUserFrom}
              getDataFromDatabase={getDataFromDatabase}
              showToast={showToast}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
