"use client";

import React, { useContext } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { useLayoutContext } from "@/contexts/NavbarContext";

type Props = {};

const Header = (props: Props) => {
  const { isOpen, setOpen } = useLayoutContext();

  return (
    <div
      className={`fixed bg-white ${
        isOpen ? "w-[calc(100vw-230px)] ml-[230px] " : "w-[100vw]"
      } h-[50px] border flex items-center p-1 layout-transition`}
    >
      <BiMenuAltLeft
        onClick={() => setOpen(!isOpen)}
        size={25}
        className="cursor-pointer text-neutral-600"
      />
    </div>
  );
};

export default Header;
