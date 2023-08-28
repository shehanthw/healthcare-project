"use client";

import React, { useContext, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useLayoutContext } from "@/contexts/NavbarContext";
import Profile from "./Profile";

type Props = {};

const Header = (props: Props) => {
  const { isOpen, setOpen } = useLayoutContext();
  const [isProfileOn, setProfileOn] = useState(false);

  return (
    <div
      className={`fixed bg-white ${
        isOpen ? "w-[calc(100vw-230px)] ml-[230px] " : "w-[100vw]"
      } h-[50px] border flex items-center layout-transition justify-between absolute`}
    >
      <div className="p-1">
        <BiMenuAltLeft
          onClick={() => setOpen(!isOpen)}
          size={25}
          className="cursor-pointer text-neutral-600"
        />
      </div>

      <div
        className="w-[15%] h-full p-1 flex items-center justify-center pr-3 border-l cursor-pointer"
        onClick={() => setProfileOn(true)}
      >
        {isProfileOn && <Profile setProfileOn={setProfileOn} />}
        <div className="w-[20%]">
          <CgProfile size={35} className="text-gray-500" />
        </div>
        <div className="flex flex-col w-[80%] h-[100%] justify-center pl-4 text-sm">
          <span className="truncate overflow-hidden">shehan</span>
          <span className="text-xs">admin</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
