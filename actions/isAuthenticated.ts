import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const isAuthenticated = async () => {
  try {
    const token = cookies().get("token")?.value;

    let isAuth;

    if (token) {
      isAuth = jwt.verify(token, process.env.JWT_SECRET!);
    }
    return isAuth;
  } catch (e) {
    console.log(`Error in ${e}`);
  }
};
