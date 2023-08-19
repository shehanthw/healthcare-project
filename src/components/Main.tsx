import React from "react";
import { useLayoutContext } from "@/contexts/NavbarContext";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  const { isOpen } = useLayoutContext();
  return (
    <div
      className={`fixed ${
        isOpen ? "ml-[230px] w-[calc(100vw-230px)]" : "w-[100vw]"
      } mt-[50px] h-[calc(100vh-50px)] bg-neutral-100 layout-transition overflow-auto`}
    >
      {children}
    </div>
  );
};

export default Layout;
