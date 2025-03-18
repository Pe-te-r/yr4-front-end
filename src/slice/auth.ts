// features/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, UserRegistrationData,LoginData } from "../types/authType";
import { BASE_URL } from "./url";

// Define types for login data
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    // Register User Mutation
    registerUser: builder.mutation<ApiResponse, UserRegistrationData>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),

    // Login Mutation
    loginUser: builder.mutation<ApiResponse, LoginData>({
      query: (loginData) => ({
        url: "/login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

// Export hooks for usage in components
export const { useRegisterUserMutation, useLoginUserMutation } = apiSlice;