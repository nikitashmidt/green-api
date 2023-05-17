import axios from "axios";
import type {
  ITokens,
  IAuthResponse,
  IGetMessagesHistory,
  IMessages,
  IPostMessages,
  IDeleteNotification,
  IResponseNotification,
} from "../types";

const baseURL = "https://api.green-api.com/";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authLogin = async (data: ITokens) => {
  const { apiTokenInstance, idInstance } = data;

  const response = await instance.get<IAuthResponse>(
    `waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
  );

  return response.data.stateInstance;
};

export const postMessages = async (data: IPostMessages) => {
  const { apiTokenInstance, idInstance, message, chatId } = data;

  const response = await instance.post(
    `waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    { chatId: `${chatId}@c.us`, message }
  );

  return response.data;
};

export const getMessagesHistory = async (
  data: IGetMessagesHistory
): Promise<IMessages[]> => {
  const { apiTokenInstance, idInstance, count, chatId } = data;

  const response = await instance.post<IMessages[]>(
    `waInstance${idInstance}/GetChatHistory/${apiTokenInstance}`,
    { chatId: `${chatId}@c.us`, count }
  );

  return response.data;
};

export const receiveNotification = async (data: ITokens) => {
  const { apiTokenInstance, idInstance } = data;

  const response = await instance.get<IResponseNotification>(
    `waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
  );

  return response.data;
};

export const deleteNotification = async (data: IDeleteNotification) => {
  const { apiTokenInstance, idInstance, receiptId } = data;

  const response = await instance.delete(
    `waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`
  );

  return response.data;
};
