import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";

type Props = { setProfileOn: Dispatch<SetStateAction<boolean>> };

const Profile = (props: Props) => {
  const refOne = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: any) => {
    if (!refOne.current?.contains(e.target)) {
      props.setProfileOn(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  }, []);

  return (
    <div className="absolute w-[200px] z-[9999] h-[100px] top-8 right-[50px] flex items-center justify-center">
      <div
        className="bg-white h-[50%] w-full rounded-md shadow-md shadow-gray-500 flex items-center text-sm text-gray-600"
        ref={refOne}
      >
        <span className="h-[100%] w-full flex items-center hover:bg-blue-100 pl-4 cursor-pointer rounded-md">
          <button>Logout</button>
        </span>
      </div>
    </div>
  );
};

export default Profile;
