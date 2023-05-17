import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  IPostMessages,
  IMessages,
  IGetMessagesHistory,
  ITokens,
  IDeleteNotification,
} from "../../types";
import {
  postMessages,
  getMessagesHistory,
  receiveNotification,
  deleteNotification,
} from "../../api";

export type MessagesState = {
  isLoading: boolean;
  error: string;
  messages: IMessages[];
  textMessage: string;
};

export const sendMessages = createAsyncThunk(
  "messages/send",
  async (data: IPostMessages) => {
    postMessages(data);
  }
);

export const getHistory = createAsyncThunk(
  "messages/get",
  async (data: IGetMessagesHistory) => {
    return getMessagesHistory(data);
  }
);

export const getReceiveNotification = createAsyncThunk(
  "get/reciveNotification",
  async (data: ITokens) => {
    return receiveNotification(data);
  }
);

export const getDeleteNotification = createAsyncThunk(
  "delete/deleteNotification",
  async (data: IDeleteNotification) => {
    return deleteNotification(data);
  }
);

const initialState: MessagesState = {
  isLoading: false,
  error: "",
  messages: [],
  textMessage: "",
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },

    addMessages(state, action: PayloadAction<IMessages>) {
      state.messages.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendMessages.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })

      .addCase(sendMessages.fulfilled, (state) => {
        state.isLoading = false;
        state.error = "";
      })

      .addCase(sendMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })

      .addCase(getHistory.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })

      .addCase(getHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.messages = action.payload.reverse();
      })

      .addCase(getHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })

      .addCase(getReceiveNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.textMessage = action.payload.body.messageData.textMessageData.textMessage;
      })

      .addCase(getReceiveNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });

    builder.addDefaultCase(() => {
      ("");
    });
  },
});

const { actions, reducer } = messagesSlice;

export const { addMessages } = actions;

export default reducer;
