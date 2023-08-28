type FormItems = {
  title: string;
  id: string;
  type: string;
  required?: string;
}[];

const formItems: FormItems = [
  {
    title: "Drug Name",
    id: "drugName",
    type: "text",
    required: "Drug Name is required",
  },
  {
    title: "Manufacturing date",
    id: "mfgDate",
    type: "date",
    required: "Manufacturing date is required",
  },
  {
    title: "Expiration Date",
    id: "expDate",
    type: "date",
    required: "Expiration date is required",
  },
  {
    title: "Quantity",
    id: "quantity",
    type: "number",
    required: "Quantity is required",
  },
];

export { formItems };
