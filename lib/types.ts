export interface IContacts{
    name:string,
    email:string,
    id:string
}

export interface IInitialState{
    receiverUser:IContacts| null,
    currentUser : IContacts | null,
    openDialog:boolean
}

export interface IMessage{
    createdAt:Date,
    id:string,
    senderId:string,
    receiverId:string,
    message:string,
    type:string,
    
}