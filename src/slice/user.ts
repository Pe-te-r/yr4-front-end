// features/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  UserResponse, UsersResponse } from "../types/authType";
import { BASE_URL } from "./url";

// Function to get token from localStorage
// Updated getAuthToken() in apiSlice.ts
const getAuthToken = () => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
            console.log(userData)
          const parsedUser = JSON.parse(userData); // Parse the JSON string
          return parsedUser.token; // Return only the token
        } catch (error) {
          console.error("Failed to parse user data:", error);
          return "";
        }
      }
    }
    return "";
  };
// Configure baseQuery to include Authorization header
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = getAuthToken();
    // console.log("Token being sent:", token); // Debug log
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const usersAPi = createApi({
  reducerPath: "usersApi",
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
} = usersAPi;
