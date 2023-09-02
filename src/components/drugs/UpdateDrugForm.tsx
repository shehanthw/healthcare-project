"use client";
import { Roboto } from "next/font/google";
import { resolve } from "path";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { formItems } from "@/components/drugs/DrugsFormItems";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiFillCloseCircle } from "react-icons/ai";
import { getDrugs, postDrug, putDrug } from "@/app/services/DrugsEndPoints";
import { data } from "autoprefixer";
import { useLoaderContext } from "@/contexts/NavbarContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
});

type Props = {
  setUpdateDrugFormOn: Dispatch<SetStateAction<boolean>>;
  userToUpdate?: DrugData; // Provide existing user data for update
  updateId: string;
  showToast: any;
  getDataFromDatabase: any;
};

type DrugData = {
  drugName: string;
  mfgDate: string;
  expDate: string;
  quantity: number;
};

const drugCreationSchema = z.object({
  drugName: z
    .string()
    .max(10, "drug name must be at most 100 characters")
    .min(1, "Drug name is required"),
  mfgDate: z.string().min(1, "Manugacturing date is required"),
  expDate: z.string().min(1, "Expiration date is required"),
  quantity: z.string(),
});

const UpdateDrugForm = (props: Props) => {
  const { setLoaderOn } = useLoaderContext();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(drugCreationSchema),
  });

  const existingUserData = async () => {
    setLoaderOn(true);
    const res = await getDrugs("", "", "", props.updateId);

    const mfgDateRaw = res.drugs.mfgDate;
    const mfgDate = mfgDateRaw.split("T")[0];

    const expDateRaw = res.drugs.expDate;
    const expDate = expDateRaw.split("T")[0];

    const quantityInt = res.drugs.quantity;

    setValue("drugName", res.drugs.drugName);
    setValue("mfgDate", mfgDate);
    setValue("expDate", expDate);
    setValue("quantity", quantityInt.toString());
    setLoaderOn(false);
  };

  const onSubmit = async (data: FieldValues) => {
    const { ...postData } = data;
    postData.quantity = parseInt(postData.quantity);
    const res = await putDrug(props.updateId, postData);
    console.log(res);
    props.setUpdateDrugFormOn(false);
    props.showToast("success", res);
    props.getDataFromDatabase();
    await new Promise((resolve) => setTimeout(resolve, 500));
    reset();
  };

  useEffect(() => {
    existingUserData();
  }, [props.updateId]);
  return (
    <div className="absolute bg-black w-full h-full z-30 overflow-auto bg-opacity-10 backdrop-blur-sm backdrop-filter flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[40%] h-[520px] bg-white mt-[60px] shadow-md shadow-neutral-700] flex flex-col space-y-1"
      >
        <div
          id="title"
          className="h-[60px] flex items-center pl-6 border font-medium text-gray-600 relative"
        >
          Update Drug
          <div
            className="absolute right-0 mr-2 top-0 mt-4"
            onClick={() => props.setUpdateDrugFormOn(false)}
          >
            <AiFillCloseCircle
              size={25}
              className="text-red-600 hover:text-red-400 cursor-pointer"
            />
          </div>
        </div>

        {formItems.map((item, index) => (
          <div
            className="flex flex-col pl-6 pt-2 space-y-1 text-sm"
            key={index}
          >
            <span className="text-gray-500">{item.title}</span>
            <input
              id={item.id}
              type={item.type}
              className="form-input w-[90%] h-[35px]"
              placeholder={`Enter ${item.title}`}
              {...register(item.id)}
            />
            <div className="h-[18px] text-xs w-[60%] text-red-600 flex items-center">
              {errors[item.id] && (
                <span>{errors[item.id]?.message?.toString()}</span>
              )}
            </div>
          </div>
        ))}

        <div className="w-[60%] p-6">
          <button className="btn btn-secondary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDrugForm;
