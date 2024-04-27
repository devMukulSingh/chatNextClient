"use client";
import { IContacts } from "./types";

interface IcurrentUser extends IContacts {
  token: string;
}

export const currentUser: IcurrentUser =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("currentUser") || "{}")
    : "";
