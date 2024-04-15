import { BASE_URL_SERVER } from "@/lib/BASE_URL";
import axios from "axios";

export const getContacts = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL_SERVER}/api/user/get-users`);
    return data;
  } catch (e: any) {
    console.log(e.response);
    console.log(`Error in getContacts ${e}`);
  }
};
