export interface ITokens {
  idInstance: string;
  apiTokenInstance: string;
}

export interface IAuthResponse {
  stateInstance: "authorized" | "notAuthorized";
}

export interface IGetPhone {
  phone: string;
}

export interface IPostMessages extends ITokens {
  chatId: string;
  message: string;
}

export interface IMessages {
  type: "incoming" | "outgoing";
  textMessage: string;
  timestamp: number;
}

export interface IGetMessagesHistory extends ITokens {
  chatId: string;
  count?: number;
}

export interface IDeleteNotification extends ITokens {
  receiptId: number;
}

export interface IResponseNotification {
  body: {
    messageData: {
      typeMessage: string;
      textMessageData: {
        textMessage: string;
      };
    };
  };
  
  receiptId: number;
}