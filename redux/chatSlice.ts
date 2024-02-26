import { IInitialState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState:IInitialState = {
    receiverUser:null,
    currentUser : null,
    openDialog:false,
}

const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{
        setReceiverUser : (state,action) => {
            state.receiverUser = action.payload;
        },
        setCurrentUser : (state,action) => {
            state.currentUser = action.payload;
        },
        setOpenDialog : (state) => {
            state.openDialog = !state.openDialog;
        }
    }
})


export default chatSlice.reducer;

export const{ setReceiverUser,setCurrentUser,setOpenDialog } = chatSlice.actions;