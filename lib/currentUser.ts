"use client"
import { IContacts } from "./types";

export const currentUser: IContacts =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("currentUser") || "{}")
    : "";
