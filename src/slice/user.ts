// features/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  UserResponse, UsersResponse } from "../types/authType";
import { BASE_URL } from "./url";

// Function to get token from localStorage
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken") || "";
  }
  return "";
};

// Configure baseQuery to include Authorization header
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = getAuthToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
 

    // Get all users (Requires Auth)
    getAllUsers: builder.query<UsersResponse, void>({
      query: () => "/users",
    }),

    // Get a single user by ID (Requires Auth)
    getUserById: builder.query<UserResponse, string>({
      query: (id) => `/users/${id}`,
    }),
  }),
});

// Export hooks for usage in components
export const {

  useGetAllUsersQuery,
  useGetUserByIdQuery,
} = apiSlice;
