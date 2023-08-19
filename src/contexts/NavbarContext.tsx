"use client";

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

interface LayoutContextProps {
  children: ReactNode;
}

interface LayoutContextValue {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

export default function LayoutContextProvider({
  children,
}: LayoutContextProps) {
  const [isOpen, setOpen] = useState(true);

  const contextValue: LayoutContextValue = {
    isOpen,
    setOpen,
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutContext() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error("Layout context is outside of LayoutContextProvider");
  }

  return context;
}
