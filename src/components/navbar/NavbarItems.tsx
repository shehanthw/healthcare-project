import {
  AiOutlineUsergroupAdd,
  AiOutlineMedicineBox,
  AiOutlineDesktop,
} from "react-icons/ai";

type Props = {};

type SubItems = {
  subName: string;
  path: string;
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
    icon: <AiOutlineMedicineBox size={22} />,
    title: "Drugs Manager",
    isActive: false,
    subItems: [
      {
        subName: "View Drugs",
        path: "/drugs",
      },
      {
        subName: "Create Drugs",
        path: "/",
      },
    ],
  },

  {
    icon: <AiOutlineUsergroupAdd size={22} />,
    title: "User Manager",
    isActive: false,
    subItems: [
      {
        subName: "View Users",
        path: "/users",
      },
    ],
  },
];

export { menuItems };
