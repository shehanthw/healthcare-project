import axios from "axios";
import { FieldValues } from "react-hook-form";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getDrugs(
  drugname: string,
  mfgDate: string,
  expDate: string,
  id: string
) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/drugs?drugName=${drugname}&mfgDate=${mfgDate}&expDate=${expDate}&_id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching drugs:", error);
    throw error;
  }
}

export async function postDrug(drugs: FieldValues) {
  try {
    const response = await axios.post(`${BASE_URL}/api/drugs`, drugs);
    console.log(response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Error fetching drugs:", error);
    throw error;
  }
}

export async function putDrug(id: string, drugs: FieldValues) {
  try {
    const response = await axios.put(`${BASE_URL}/api/drugs?id=${id}`, drugs);
    console.log(response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Error fetching drugs:", error);
    throw error;
  }
}

export async function deleteDrug(id: string) {
  try {
    const response = await axios.delete(`${BASE_URL}/api/drugs?id=${id}`);
    console.log(response.data.message);
    return response.data.message;
  } catch (error) {}
}
