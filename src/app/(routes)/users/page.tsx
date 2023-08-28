"use client";

import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import UsersTable from "../../../components/users/UsersTable";
import FilterUsers from "@/components/users/FilterUsers";
import CreateUserForm from "@/components/users/CreateUserForm";
import { getUsers } from "@/app/services/UsersEndPoints";
import { useToast } from "@/components/common/Toast";
import UpdateUserForm from "@/components/users/UpdateUserForm";

const Users = () => {
  // custom hook for toast notifications
  const { Toast, showToast } = useToast();

  const [usersDataSet, setUsersDataSet] = useState([]);
  const [usersApiMessage, setUsersApiMessage] = useState<string>();
  const [isFilterOn, setFilterOn] = useState(false);
  const [isCreateUserFormOn, setCreateUserFormOn] = useState(false);
  const [isUpdateUserFormOn, setUpdateUserFormOn] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [updateId, setUpdateId] = useState<string>("");

  const toggleFilter = () => {
    setFilterOn(!isFilterOn);
  };

  const toggleUpdateUserFrom = (id: string) => {
    console.log(id);
    setUpdateId(id);
    setUpdateUserFormOn(true);
  };

  const handleUserCreationButton = () => {
    setCreateUserFormOn(true);
  };

  const callGetUsersEndPoint = async () => {
    const res = await getUsers(username, role, "");
    setUsersDataSet(res.users);
    setUsersApiMessage(res.message);
  };

  useEffect(() => {
    callGetUsersEndPoint();
  }, [username, role, isCreateUserFormOn, isUpdateUserFormOn]);

  return (
    <div className="overflow-auto h-full">
      {isCreateUserFormOn && (
        <CreateUserForm
          setCreateUserFormOn={setCreateUserFormOn}
          showToast={showToast}
        />
      )}
      {isUpdateUserFormOn && (
        <UpdateUserForm
          setUpdateUserFormOn={setUpdateUserFormOn}
          updateId={updateId}
          showToast={showToast}
        />
      )}
      {Toast} {/* initializes toast component */}
      {isFilterOn && (
        <FilterUsers
          setFilterOn={setFilterOn}
          setUsername={setUsername}
          setRole={setRole}
        />
      )}
      <div className="w-full flex justify-between p-2">
        <button className="btn btn-secondary" onClick={toggleFilter}>
          Filter
        </button>
        <button
          onClick={handleUserCreationButton}
          className="btn btn-secondary flex space-x-2 items-center"
        >
          <span>Create User</span>
          <AiOutlinePlus size={15} />
        </button>
      </div>
      <div className="w-full p-2">
        <UsersTable
          data={usersDataSet}
          usersApiMessage={usersApiMessage}
          toggleUpdateUserFrom={toggleUpdateUserFrom}
          showToast={showToast}
          callGetUsersEndPoint={callGetUsersEndPoint}
        />
      </div>
    </div>
  );
};

export default Users;
