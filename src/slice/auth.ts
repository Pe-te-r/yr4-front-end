// features/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, UserRegistrationData } from "../types/authType";

const BASE_URL= 'http://192.168.0.112:8000/api'

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
  endpoints: (builder) => ({
    registerUser: builder.mutation<ApiResponse, UserRegistrationData>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = apiSlice;