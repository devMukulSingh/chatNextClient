import { Socket } from "socket.io-client";

export interface IContacts{
    name:string,
    email:string,
    id:string,

}

export interface IInitialState{
    receiverUser:IContacts| null,
    currentUser : IContacts | null,
    openDialog:boolean,
    messages : IMessage[] | null,
    socket : Socket | null,

}

export interface IMessage{
    createdAt:Date,
    id:string,
    senderId:string,
    receiverId:string,
    message:string,
    type:string,
    
}
