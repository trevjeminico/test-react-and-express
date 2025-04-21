import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "../api/axios";
export const userLogin = createAsyncThunk(
  "user/login",
  async (params, { rejectWithValue }) => {
    try {
      const req = await axios.post("/v1/auth/login", params);
      const res = await req.data;
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const userRegister = createAsyncThunk(
  "user/register",
  async (params, { rejectWithValue }) => {
    try {
      const req = await axios.post("/v1/auth/register", params);
      const res = await req.data;
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const userChangePassword = createAsyncThunk(
  "user/change-password",
  async (params, { rejectWithValue }) => {
    try {
      const req = await axios.patch("/v1/auth/change-password", params);
      const res = await req.data;
      return res;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: null,
    tokenAuth: null,
    error: {},
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          userLogin.pending,
          userRegister.pending,
          userChangePassword.pending
        ),
        (state, action) => {
          switch (action.type) {
            case "user/login/pending":
              state.isLoading = true;
              state.user = null;
              state.tokenAuth = null;
              state.error = null;
              break;
            default:
              state.isLoading = true;
              state.error = null;
              break;
          }
        }
      )
      .addMatcher(
        isAnyOf(
          userLogin.fulfilled,
          userRegister.fulfilled,
          userChangePassword.fulfilled
        ),
        (state, action) => {
          switch (action.type) {
            case "user/login/fulfilled":
              {
                const { user, tokenAuth } = action.payload;
                state.isLoading = false;
                state.user = user;
                state.tokenAuth = tokenAuth;
                state.error = null;
                localStorage.setItem("token", tokenAuth);
                localStorage.setItem("user", JSON.stringify(user));
              }
              break;
            default:
              state.isLoading = false;
              state.error = null;
              break;
          }
        }
      )
      .addMatcher(
        isAnyOf(
          userRegister.rejected,
          userLogin.rejected,
          userChangePassword.rejected
        ),
        (state, action) => {
          const { data } = action.payload;
          switch (action.type) {
            case "user/login/rejected":
              state.isLoading = false;
              state.user = null;
              state.tokenAuth = null;
              if (action.error.code === "ERR_BAD_REQUEST") {
                state.error = "Couldnt find any records on the user";
              } else {
                state.error = data.errors;
              }
              break;
            case "user/register/rejected":
              state.isLoading = false;
              if (action.error.code === "ERR_BAD_REQUEST") {
                state.error = "Couldnt create user";
              } else {
                state.error = data.error;
              }
              break;
            case "user/change-password/rejected":
              state.isLoading = false;
              if (action.error.code === "ERR_BAD_REQUEST") {
                state.error = "Couldnt update password";
              } else {
                state.error = action.error.message;
              }
              break;
          }
        }
      );
  },
});

export default authSlice.reducer;
