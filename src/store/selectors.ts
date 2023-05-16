import type { AuthState } from "./slices/authSlice";
import type { MessagesState } from "./slices/messagesSlice";

export const authSelector = (state: { authSlice: AuthState }) =>
  state.authSlice;

export const messagesSelector = (state: { messagesSlice: MessagesState }) =>
  state.messagesSlice;
