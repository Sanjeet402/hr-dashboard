import axios from "axios";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

export async function fetchUsers(limit = 20): Promise<User[]> {
  const response = await axios.get(`https://dummyjson.com/users?limit=${limit}`);
  return response.data.users;
}
