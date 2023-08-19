"use client";
import { Roboto } from "next/font/google";
import { resolve } from "path";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
});

type Props = {};

type FormItems = {
  title: string;
  id: string;
  type: string;
  required?: string;
}[];

const CreateUser = (props: Props) => {
  const formItems: FormItems = [
    {
      title: "Username",
      id: "username",
      type: "text",
      required: "Username is required",
    },
    {
      title: "First Name",
      id: "firstName",
      type: "text",
      required: "First Name is required",
    },
    {
      title: "Last Name",
      id: "lastName",
      type: "text",
      required: "Last Name is required",
    },
    {
      title: "Email",
      id: "email",
      type: "text",
      required: "Email is required",
    },
    {
      title: "Role",
      id: "userRole",
      type: "text",
      required: "Role is required",
    },
    {
      title: "Password",
      id: "password",
      type: "password",
      required: "Password is required",
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  return (
    <div className="p-2 flex flex-col items-center w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col items-center p-4 w-[80%] space-y-1 text-neutral-700 text-sm ${roboto.className} bg-white rounded-sm shadow-sm shadow-neutral-500`}
      >
        <div className="text-md font-bold text-neutral-600">Create a user</div>
        {formItems.map((item, index) => (
          <div
            className="flex flex-col w-full justify-center items-center"
            key={index}
          >
            <span className="flex w-[60%] justify-start space-x-1">
              <span className="text-red-600">*</span> <span>{item.title}</span>
            </span>
            <input
              className="p-2 border border-neutral-300 w-[60%] outline-none rounded"
              type={item.type}
              id={item.id}
              placeholder={`Enter ${item.title}`}
              {...register(item.id, { required: item.required })}
            />
            <div className="h-[18px] text-xs w-[60%] text-red-600 flex items-center">
              {errors[item.id] && (
                <span>{errors[item.id]?.message?.toString()}</span>
              )}
            </div>
          </div>
        ))}
        <div className="w-[60%]">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
