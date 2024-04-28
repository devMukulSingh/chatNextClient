"use client";
import SingleContact from "./SingleContact";
import { IContacts } from "@/lib/types";
import useSWR from "swr";
import axios from "axios";
import { BASE_URL_SERVER } from "@/lib/BASE_URL";
import Loader from "@/components/Loader";

const fetcher = (url: string) =>
  axios
    .get(url, {
      //  withCredentials:true,
    })
    .then((res) => res.data);

const Contacts = () => {
  const {
    data: contacts,
    isLoading,
    error,
  } = useSWR(`${BASE_URL_SERVER}/api/user/get-users`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    refreshWhenHidden: false,
  });
  if (isLoading) return <Loader />;
  if (error) console.log(error);

  return (
    <div className="overflow-auto rounded-md flex flex-col min-w-[25rem] h-full">
      {contacts?.map((contact: IContacts) => (
        <SingleContact contact={contact} key={contact.id} />
      ))}
    </div>
  );
};

export default Contacts;
