import { IInitialState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import { getMessages } from "./reducers/getMessages";

const initialState: IInitialState = {
  receiverUser: null,
  currentUser: null,
  openDialog: false,
  messages: null,
  socket: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setReceiverUser: (state, action) => {
      state.receiverUser = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setOpenDialog: (state) => {
      state.openDialog = !state.openDialog;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setSocketMessage: (state, action) => {
      state.messages?.push(action.payload);
    },
    setMessages : (state,action) => {
      state.messages = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
  },
});

export default chatSlice.reducer;

export const {
  setReceiverUser,
  setCurrentUser,
  setOpenDialog,
  setSocket,
  setSocketMessage,
  setMessages
} = chatSlice.actions;
