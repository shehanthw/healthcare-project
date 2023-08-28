"use client";

import React, { useEffect } from "react";
import { useLayoutContext, useLoaderContext } from "@/contexts/NavbarContext";
import { usePathname } from "next/navigation";
import LoaderPage from "./common/LoaderPage";
type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  const { isOpen } = useLayoutContext();
  const { isLoaderOn, setLoaderOn } = useLoaderContext();
  const path = usePathname();

  useEffect(() => {
    setLoaderOn(false);
  }, [path]);

  return (
    <div
      className={`fixed ${
        isOpen ? "ml-[230px] w-[calc(100vw-230px)]" : "w-[100vw]"
      } mt-[50px] h-[calc(100vh-50px)] bg-neutral-100 layout-transition`}
    >
      {isLoaderOn ? <LoaderPage /> : ""}
      {children}
    </div>
  );
};

export default Layout;
