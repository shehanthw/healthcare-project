"use client";
import { Roboto } from "next/font/google";
import { resolve } from "path";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { formItems } from "@/components/users/UserFormItems";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiFillCloseCircle } from "react-icons/ai";
import { getUsers, postUser, putUser } from "@/app/services/UsersEndPoints";
import { useLoaderContext } from "@/contexts/NavbarContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
});

type Props = {
  setUpdateUserFormOn: Dispatch<SetStateAction<boolean>>;
  userToUpdate?: UserData; // Provide existing user data for update
  updateId: string;
  showToast: any;
};

type UserData = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password?: string; // Optional for update
};

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

const UpdateUserForm = (props: Props) => {
  const { setLoaderOn } = useLoaderContext();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userCreationSchema),
  });

  const existingUserData = async () => {
    setLoaderOn(true);
    const res = await getUsers("", "", props.updateId);
    setValue("username", res.users.username);
    setValue("firstName", res.users.firstName);
    setValue("lastName", res.users.lastName);
    setValue("email", res.users.email);
    setValue("role", res.users.role);
    setLoaderOn(false);
  };

  const onSubmit = async (data: FieldValues) => {
    const res = await putUser(props.updateId, data);
    props.setUpdateUserFormOn(false);
    props.showToast("success", "user is updated successfully");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  useEffect(() => {
    existingUserData();
  }, [props.updateId]);
  return (
    <div className="absolute bg-black w-full h-full z-30 overflow-auto bg-opacity-10 backdrop-blur-sm backdrop-filter flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[40%] h-[800px] bg-white mt-[60px] mb-[50px] shadow-md shadow-neutral-700] flex flex-col space-y-1"
      >
        <div
          id="title"
          className="h-[60px] flex items-center pl-6 border font-medium text-gray-600 relative"
        >
          Update User
          <div
            className="absolute right-0 mr-2 top-0 mt-4"
            onClick={() => props.setUpdateUserFormOn(false)}
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserForm;
