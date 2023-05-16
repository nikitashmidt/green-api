import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import messagesSlice  from "./slices/messagesSlice";

const store = configureStore({
  reducer: {
    authSlice,
    messagesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
