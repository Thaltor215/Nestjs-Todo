import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_URL || "http://localhost:5001/",
  credentials: "same-origin",
  prepareHeaders: (headers, { getState }: any) => {
    const token = getState().auth.accessToken;

    if (token) {
      headers.set("authorization", `Basic ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === "FETCH_ERROR") {
    api.dispatch(logOut());
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  tagTypes: ["Todo"],
});
