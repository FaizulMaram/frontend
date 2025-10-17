import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../config/api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/auth`,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Login user
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // Signup user
    signupUser: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),

    // Get user profile
    getMyProfile: builder.query({
      query: () => "/myProfile",
      providesTags: ["User"],
    }),

    // Logout user
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useGetMyProfileQuery,
  useLogoutUserMutation,
} = authApi;
