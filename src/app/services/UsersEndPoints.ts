import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getUsers(username: string, role: string) {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/users?username=${username}&role=${role}`
    );
    return response.data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
