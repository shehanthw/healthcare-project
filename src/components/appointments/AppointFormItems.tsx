type FormItems = {
  title: string;
  id: string;
  type: string;
  required?: string;
}[];

const formItems: FormItems = [
  {
    title: "Patient Name",
    id: "patientName",
    type: "text",
    required: "Patient Name is required",
  },
  {
    title: "Age",
    id: "age",
    type: "number",
    required: "Age is required",
  },
  {
    title: "Diagnosis",
    id: "diagnosis",
    type: "text",
    required: "Diagnosis is required",
  },
  {
    title: "Medicine",
    id: "medicine",
    type: "text",
    required: "Medicine is required",
  },
  {
    title: "Advice",
    id: "advices",
    type: "text",
    required: "Advice is required",
  },
  {
    title: "Advice",
    id: "advices",
    type: "text",
    required: "Advice is required",
  },
  {
    title: "Advice",
    id: "advices",
    type: "text",
    required: "Advice is required",
  },
  {
    title: "Advice",
    id: "advices",
    type: "text",
    required: "Advice is required",
  },
];

export { formItems };
