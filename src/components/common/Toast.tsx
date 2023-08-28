import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AiFillCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

type Props = {
  isVisible: boolean;
  list: any;
  deleteToast: any;
};

const Toast = ({ isVisible, list, deleteToast }: Props) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed z-10 text-sm top-14 right-4`}>
      {list.map((item: any, index: any) => (
        <div
          className={`mb-2 h-[55px] w-[300px]
          rounded-md shadow-slate-400 shadow-md
            hover:shadow-slate-500 hover:ease-in-out duration-300 animate-fade flex justify-between items-center 
            ${
              item.title == "Success"
                ? "bg-green-300"
                : item.title == "Error"
                ? "bg-red-300"
                : "bg-blue-300"
            }  ${isVisible && "animate-trans-left"}`}
          key={index}
        >
          <div className="w-full h-full flex">
            <div className="w-[20%] flex justify-center items-center">
              <AiFillCheckCircle
                size={25}
                className={`${
                  item.title == "Success"
                    ? "text-green-600"
                    : item.title == "Error"
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              />
            </div>
            <div className="w-[60%] p-2 flex flex-col space-y-0">
              <span
                className={`text-sm font-bold ${
                  item.title == "Success"
                    ? "text-green-800"
                    : item.title == "Error"
                    ? "text-red-800"
                    : "text-blue-800"
                }`}
              >
                {item.title}
              </span>
              <span
                className={`text-xs ${
                  item.title == "Success"
                    ? "text-green-600"
                    : item.title == "Error"
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              >
                {item.message}
              </span>
            </div>
            <div
              className="w-[20%] flex justify-end p-2"
              onClick={() => deleteToast(item.id)}
            >
              <AiOutlineCloseCircle
                size={20}
                className="text-red-500 hover:text-red-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;

export function useToast() {
  const [list, setList] = useState<any>([]);
  let toastProperties = null;
  const [isVisible, setIsVisible] = useState(false);

  const showToast = (type: string, message: string) => {
    setIsVisible(true);

    switch (type) {
      case "success":
        toastProperties = {
          id: list.length + 1,
          title: "Success",
          message: message,
          color: "green",
        };
        break;
      case "error":
        toastProperties = {
          id: list.length + 1,
          title: "Error",
          message: message,
          color: "red",
        };
        break;
      default:
        toastProperties = [];
    }

    setList([...list, toastProperties]);
  };

  const deleteToast = useCallback(
    (id: any) => {
      const toastListItem = list.filter((e: any) => e.id !== id);
      setList(toastListItem);
    },
    [list, setList]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (list.length) {
        deleteToast(list[0].id);
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [list]);

  return {
    Toast: (
      <Toast isVisible={isVisible} list={list} deleteToast={deleteToast} />
    ),
    showToast,
  };
}
