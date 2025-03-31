import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AiData, ApiResponse } from "../types/authType";
import { BASE_URL } from "./url";

export const aiSlice = createApi({
  reducerPath: "ai",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    sendQuestion: builder.mutation<ApiResponse, AiData>({
      query: (userData) => ({
        url: "/ai",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const {useSendQuestionMutation } = aiSlice;