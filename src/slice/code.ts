// features/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "../types/authType";
import {BASE_URL} from './url'

export const codeSlice = createApi({
  reducerPath: "code",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
  endpoints: (builder) => ({
    getCodeById: builder.query<ApiResponse, string>({
        query: (id) => ({
          url: `/codes/${id}`,
          method: "GET",
        }),
      }),
    getCodeByEmail: builder.mutation<ApiResponse, { email: string }>({
      query: ({ email }) => ({
        url: "/codes",
        method: "POST",
          body: { email },
        }),
  })

  }),
});

export const { useGetCodeByIdQuery,useGetCodeByEmailMutation } = codeSlice;