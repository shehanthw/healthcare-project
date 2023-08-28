import React from "react";
import { PuffLoader } from "react-spinners";

type Props = {};

const LoaderPage = (props: Props) => {
  return (
    <div className="absolute z-50 w-full h-full bg-neutral-400 bg-opacity-10 flex flex-col justify-center items-center backdrop-blur-sm backdrop-filter">
      <PuffLoader size={95} color="#36d7b7" className="text-white" />
    </div>
  );
};

export default LoaderPage;
