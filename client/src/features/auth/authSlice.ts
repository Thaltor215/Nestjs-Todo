import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string;
  username: string;
  firstname: string;
  lastname: string;
}

interface login {
  username: string;
  password: string;
}

interface loginResponse {
  token: string;
}

const authDefaultState: AuthState = {
  isLoggedIn: false,
  accessToken: "",
  username: "",
  firstname: "",
  lastname: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: authDefaultState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.username = action.payload.email;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
    },
    logOut: (state) => {
      state.accessToken = "";
      state.isLoggedIn = false;
      state.username = "";
      state.firstname = "";
      state.lastname = "";
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth;
export const selectCurrentToken = (state: any) => state.auth.accessToken;
