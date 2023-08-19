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
        subName: "view drugs",
        path: "/drugs",
      },
      {
        subName: "create & edit drugs",
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
        subName: "view users",
        path: "/users",
      },
      {
        subName: "create & edit User",
        path: "/users/create",
      },
    ],
  },
];

export { menuItems };
