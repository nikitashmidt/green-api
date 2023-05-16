import axios from "axios";
import {
  IAuth,
  IAuthResponse,
  IGetMessagesHistory,
  IMessages,
  IPostMessages,
} from "../types";

const baseURL = "https://api.green-api.com/";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authLogin = async (data: IAuth) => {
  const response = await instance.get<IAuthResponse>(
    `waInstance${data.idInstance}/getStateInstance/${data.apiTokenInstance}`
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
