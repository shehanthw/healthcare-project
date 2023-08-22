"use client";
import { Roboto } from "next/font/google";
import { resolve } from "path";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { formItems } from "./UserFormItems";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiUserCircle } from "react-icons/bi";
import { postUser } from "@/app/services/UsersEndPoints";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
});

type Props = {};

const userCreationSchema = z
  .object({
    username: z
      .string()
      .max(10, "Username must be at most 10 characters")
      .min(1, "Username is required"),
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email(),
    role: z.string().min(1, "Role is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confPassword: z.string(),
  })
  .refine((data) => data.password === data.confPassword, {
    message: "Password must match",
    path: ["confPassword"],
  });

const CreateUser = (props: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userCreationSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    const { confPassword, ...postData } = data;
    const res = await postUser(postData);
    console.log(res);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  return (
    <div className="p-2 flex flex-col items-center w-full overflow-auto h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col items-center p-4 w-[80%] space-y-3 text-neutral-700 text-sm ${roboto.className} bg-white rounded-2xl shadow-sm shadow-neutral-500`}
      >
        <div className="text-md text-slate-500 flex items-center space-x-2">
          <BiUserCircle size={20} />
          <span>Create a user</span>
        </div>
        {formItems.map((item, index) => (
          <div
            className="flex flex-col w-full justify-center items-center"
            key={index}
          >
            <span className="flex w-[60%] h-[25px] justify-start space-x-1 text-gray-500">
              <span>{item.title}</span>
            </span>
            <input
              className="form-input"
              type={item.type}
              id={item.id}
              placeholder={`Enter ${item.title}`}
              {...register(item.id)}
              autoComplete="false"
            />
            <div className="h-[18px] text-xs w-[60%] text-red-600 flex items-center">
              {errors[item.id] && (
                <span>{errors[item.id]?.message?.toString()}</span>
              )}
            </div>
          </div>
        ))}
        <div className="w-[60%]">
          <button className="btn btn-secondary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
