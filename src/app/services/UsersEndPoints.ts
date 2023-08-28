import axios from "axios";
import { FieldValues } from "react-hook-form";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getUsers(username: string, role: string, id: string) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/users?username=${username}&role=${role}&_id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function postUser(users: FieldValues) {
  try {
    const response = await axios.post(`${BASE_URL}/api/users`, users);
    console.log(response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function putUser(id: string, users: FieldValues) {
  try {
    const response = await axios.put(`${BASE_URL}/api/users?id=${id}`, users);
    console.log(response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function deleteUser(id: string) {
  try {
    const response = await axios.delete(`${BASE_URL}/api/users?id=${id}`);
    console.log(response.data.message);
    return response.data.message;
  } catch (error) {}
}
