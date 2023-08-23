"use client";

import React, { Dispatch, useEffect, useState } from "react";
import UsersTable from "../../../components/users/UsersTable";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { getUsers } from "@/app/services/UsersEndPoints";
import FilterUsers from "@/components/users/FilterUsers";
import { useLoaderContext } from "@/contexts/NavbarContext";
import CreateUserForm from "@/components/users/CreateUserForm";

const Users = () => {
  const router = useRouter();
  const { setLoaderOn } = useLoaderContext();
  const [usersDataSet, setUsersDataSet] = useState([]);
  const [usersApiMessage, setUsersApiMessage] = useState<string>();
  const [isFilterOn, setFilterOn] = useState(false);
  const [isCreateUserFormOn, setCreateUserFormOn] = useState(false);

  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const handleUserCreationButton = () => {
    setCreateUserFormOn(true);
  };

  const callGetUsersEndPoint = async () => {
    const res = await getUsers(username, role);
    setUsersDataSet(res.users);
    setUsersApiMessage(res.message);
  };

  useEffect(() => {
    callGetUsersEndPoint();
  }, []);

  useEffect(() => {
    callGetUsersEndPoint();
  }, [username, role, isCreateUserFormOn]);

  return (
    <div className="overflow-auto h-full">
      {isCreateUserFormOn && (
        <CreateUserForm setCreateUserFormOn={setCreateUserFormOn} />
      )}
      <div className="w-full flex justify-between p-2">
        {/* toggle filter users component on & off */}
        <button
          className="btn btn-secondary"
          onClick={() => setFilterOn(!isFilterOn)}
        >
          Filter
        </button>

        {/* conditionally render Filter users component */}
        {isFilterOn ? (
          <FilterUsers
            setFilterOn={setFilterOn}
            setUsername={setUsername}
            setRole={setRole}
          />
        ) : (
          <div className="layout-transition ease-in-out"></div>
        )}

        {/* redirect to user creation page */}
        <button
          onClick={() => handleUserCreationButton()}
          className="btn btn-secondary flex space-x-2 items-center"
        >
          <span>Create User</span>
          <AiOutlinePlus size={15} />
        </button>
      </div>

      {/* render User table component */}
      <div className="w-full border">
        <UsersTable data={usersDataSet} usersApiMessage={usersApiMessage} />
      </div>
    </div>
  );
};

export default Users;
