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
    icon: <AiFillEdit size={20} />,
    title: "Medication",
    isActive: false,
    subItems: [
      {
        subName: "Appointments",
        path: "/appointments",
        icon: "VU",
      },
      {
        subName: "Prescriptions",
        path: "/prescriptions",
        icon: "VU",
      },
    ],
  },
  {
    icon: <AiFillMedicineBox size={20} />,
    title: "Drugs Manager",
    isActive: false,
    subItems: [
      {
        subName: "Create & View Drugs",
        path: "/drugs",
        icon: "VD",
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
