// app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slice/auth";
import { codeSlice } from "./slice/code";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [codeSlice.reducerPath]: codeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware,codeSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;