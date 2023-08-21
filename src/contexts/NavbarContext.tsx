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

interface LoaderContextValue {
  isLoaderOn: boolean;
  setLoaderOn: Dispatch<SetStateAction<boolean>>;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);
const LoaderContext = createContext<LoaderContextValue | null>(null);

export default function LayoutContextProvider({
  children,
}: LayoutContextProps) {
  const [isOpen, setOpen] = useState(true);
  const [isLoaderOn, setLoaderOn] = useState(false);

  const contextValue: LayoutContextValue = {
    isOpen,
    setOpen,
  };

  const loaderValue: LoaderContextValue = {
    isLoaderOn,
    setLoaderOn,
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      <LoaderContext.Provider value={loaderValue}>
        {children}
      </LoaderContext.Provider>
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

export function useLoaderContext() {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error("Loader context is outside of LayoutContextProvider");
  }

  return context;
}
