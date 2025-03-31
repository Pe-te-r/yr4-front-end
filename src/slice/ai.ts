import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AiData,  ApiResponseChat } from "../types/authType";
import { BASE_URL } from "./url";

export const aiSlice = createApi({
  reducerPath: "ai",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    sendQuestion: builder.mutation<ApiResponseChat, AiData>({
      query: (userData) => ({
        url: "/ai",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const {useSendQuestionMutation } = aiSlice;