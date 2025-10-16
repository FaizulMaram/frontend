import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // login
    loginUser: builder.mutation({
      query: ({ data }) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    // signup
    signupUser: builder.mutation({
      query: ({ data }) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useLoginUserMutation, useSignupUserMutation } = authApi;
