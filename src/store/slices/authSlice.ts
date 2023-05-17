import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { ITokens } from "../../types";
import { authLogin } from "../../api";

export type AuthState = {
  isLoading: boolean;
  error: string;
  statusAuthorization: string;
  phones: string[];
  idInstance: string;
  apiTokenInstance: string;
};

export const loginUser = createAsyncThunk("auth/login", async (data: ITokens) =>
  authLogin(data)
);

const initialState: AuthState = {
  isLoading: false,
  error: "",
  statusAuthorization: "",
  phones: [],
  idInstance: "",
  apiTokenInstance: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },

    addPhones(state, action: PayloadAction<string>) {
      state.phones.push(action.payload);
    },

    addTokens(state, action: PayloadAction<ITokens>) {
      state.idInstance = action.payload.idInstance;
      state.apiTokenInstance = action.payload.apiTokenInstance;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.statusAuthorization = action.payload;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
        state.idInstance = "";
        state.apiTokenInstance = "";
      })

      .addDefaultCase(() => {
        ("");
      });
  },
});

const { actions, reducer } = authSlice;

export const { clearError, addPhones, addTokens } = actions;

export default reducer;
