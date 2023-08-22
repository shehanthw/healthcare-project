import { AiFillMedicineBox, AiFillEdit } from "react-icons/ai";
import { BiSolidUserPlus } from "react-icons/bi";

type Props = {};

type SubItems = {
  subName: string;
  path: string;
  icon: string;
}[];

type NavMenuItems = {
  icon: JSX.Element;
  title: string;
  isActive: boolean;
  subItems?: SubItems;
  path?: string;
}[];

const menuItems: NavMenuItems = [
  {
    icon: <AiFillMedicineBox size={20} />,
    title: "Drugs Manager",
    isActive: false,
    subItems: [
      {
        subName: "View Drugs",
        path: "/drugs",
        icon: "VD",
      },
      {
        subName: "Create & Edit Drugs",
        path: "/",
        icon: "ED",
      },
    ],
  },

  {
    icon: <AiFillEdit size={20} />,
    title: "Document Manager",
    isActive: false,
    subItems: [
      {
        subName: "View Documents",
        path: "/documents",
        icon: "VU",
      },
      {
        subName: "Create & Edit Documents",
        path: "/documents/create",
        icon: "EU",
      },
    ],
  },

  {
    icon: <BiSolidUserPlus size={22} />,
    title: "User Manager",
    isActive: false,
    subItems: [
      {
        subName: "View Users",
        path: "/users",
        icon: "VU",
      },
      {
        subName: "Create & Edit User",
        path: "/users/create",
        icon: "EU",
      },
    ],
  },
];

export { menuItems };
