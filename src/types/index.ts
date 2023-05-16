export interface IAuth {
  idInstance: string;
  apiTokenInstance: string;
}

export interface IAuthResponse {
  stateInstance: "authorized" | "notAuthorized";
}

export interface IGetPhone {
  phone: string;
}

export interface IPostMessages extends IAuth {
  chatId: string;
  message: string;
}

export interface IMessages {
  type: 'incoming' | 'outgoing';
  textMessage: string;
  timestamp: number;
  
}

export interface IGetMessagesHistory extends IAuth {
  chatId: string;
  count?: number;
}
