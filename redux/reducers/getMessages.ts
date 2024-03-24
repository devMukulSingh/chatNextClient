import { BASE_URL_SERVER } from "@/lib/BASE_URL";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IGetMessagesArgs {
  senderId: string;
  receiverId: string | undefined;
}

export const getMessages = createAsyncThunk(
  "chatSlice/getMessages",

  async ({ senderId, receiverId }: IGetMessagesArgs) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL_SERVER}/api/message/get-messages`,
        {
          params: {
            senderId,
            receiverId,
          },
        },
      );
      return data;
    } catch (e) {
      console.log(`Error in getMessages ${e}`);
    }
  },
);
