import { combineReducers, createSlice } from "@reduxjs/toolkit";

const backendStatusSlice = createSlice({
  name: "Backend-Status",
  initialState: {
    status: false,
    statusMessage: "Backend Initialization has Failed",
  },
  reducers: {
    uppdateBackendStatus: (state, action) => {
      state.status = action.payload.status;
      state.statusMessage = action.payload.statusMessage;
    },
  },
});

const loginStatusSlice = createSlice({
  name: "Login-Status",
  initialState: {
    loginResult: false,
    logoutResult: false,
    fullName: null,
    emailAddress: null,
    gender: null,
    token: null,
  },
  reducers: {
    updateLoginStatus: (state, action) => {
      state.loginResult = action.payload.loginResult;
      state.fullName = action.payload.fullName;
      state.emailAddress = action.payload.emailAddress;
      state.gender = action.payload.gender;
      state.token = action.payload.token;
    },
    updateLogoutStatus: (state) => {
      state.loginResult = false;
      state.logoutResult = true;
      state.fullName = null;
      state.emailAddress = null;
      state.gender = null;
      state.token = null;
    }
  },
});

export const { uppdateBackendStatus } = backendStatusSlice.actions;
export const { updateLoginStatus, updateLogoutStatus } = loginStatusSlice.actions;

export { backendStatusSlice, loginStatusSlice };