"use client";

import React, { useState } from "react";
import {
  AiOutlineCaretDown,
  AiFillHome,
  AiOutlineCaretUp,
} from "react-icons/ai";
import { menuItems } from "./NavbarItems";
import { useLayoutContext } from "@/contexts/NavbarContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import { useLoaderContext } from "@/contexts/NavbarContext";

type Props = {};

const roboto = Inter({
  subsets: ["latin"],
  weight: ["400"],
});

const Navbar = (props: Props) => {
  const { isOpen } = useLayoutContext();
  const [items, setMenuItems] = useState(menuItems);
  const pathname = usePathname();
  const { isLoaderOn, setLoaderOn } = useLoaderContext();

  const handleMenuItemClick = (index: number) => {
    const updatedMenuItems = [...items];
    updatedMenuItems[index].isActive = !updatedMenuItems[index].isActive;
    setMenuItems(updatedMenuItems);
  };

  const handleLoader = () => {
    setLoaderOn(true);
  };

  return (
    <div
      className={`fixed bg-blue-950 ${
        isOpen ? "w-[230px]" : "w-[0px]"
      }  h-screen flex flex-col space-y-6 layout-transition p-2`}
    >
      {/* title div */}
      <div className="w-full flex justify-center h-[50px]">
        <div className="p-2 flex justify-center h-full w-[80%] border-b border-blue-500 text-neutral-50">
          Online Doca
        </div>
      </div>

      <div
        className={`w-full flex items-center flex-col space-y-2 select-none ${roboto.className}`}
      >
        {/*------------------------------------> static navbar items that have no subItems*/}

        <Link
          className={`navbar-menu-top ${
            pathname == "/dashboard" ? "bg-blue-900" : ""
          } `}
          href="/dashboard"
          onClick={() => handleLoader()}
        >
          <span className="w-[15%] flex">
            <AiFillHome size={20} />
          </span>
          <span className="w-[65%]">Dashboard</span>
          <span className="w-[20%]">
            {/* <AiOutlineCaretDown size={12} /> */}
          </span>
        </Link>
        {/*------------------------------------> dynamic navbar items */}

        {items.map((item, index) => (
          <div key={index} className="w-full flex flex-col space-y-1">
            <div
              className="navbar-menu-top"
              onClick={() => handleMenuItemClick(index)}
            >
              <span className="w-[15%] flex">{item.icon}</span>
              <span className="w-[75%]">{item.title}</span>
              <span className="w-[10%] flex justify-centerS">
                {item.isActive ? (
                  <AiOutlineCaretUp size={12} />
                ) : (
                  <AiOutlineCaretDown size={12} />
                )}
              </span>
            </div>

            {item.isActive ? (
              item.subItems?.map((subItem, index) => (
                <Link
                  className={` ${
                    pathname == subItem.path ? "bg-blue-900" : ""
                  }   submenu-menu-top layout-transition`}
                  key={index}
                  href={subItem.path}
                  onClick={() => handleLoader()}
                >
                  <span className="w-[15%] flex"></span>
                  <span className="w-[15%] text-xs">{subItem.icon}</span>
                  <span className="w-[60%] text-xs">{subItem.subName}</span>
                </Link>
              ))
            ) : (
              <div className="layout-transition"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
