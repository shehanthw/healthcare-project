type FormItems = {
  title: string;
  id: string;
  type: string;
  required?: string;
}[];

const formItems: FormItems = [
  {
    title: "Username",
    id: "username",
    type: "text",
    required: "Username is required",
  },
  {
    title: "First Name",
    id: "firstName",
    type: "text",
    required: "First Name is required",
  },
  {
    title: "Last Name",
    id: "lastName",
    type: "text",
    required: "Last Name is required",
  },
  {
    title: "Email",
    id: "email",
    type: "text",
    required: "Email is required",
  },
  {
    title: "Role",
    id: "role",
    type: "text",
    required: "Role is required",
  },
  {
    title: "Password",
    id: "password",
    type: "password",
    required: "Password is required",
  },
  {
    title: "Confirm Password",
    id: "confPassword",
    type: "password",
    required: "Confirm Password is required",
  },
];

export { formItems };
