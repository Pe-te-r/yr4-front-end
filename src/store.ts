// app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slice/auth";
import { codeSlice } from "./slice/code";
import { usersAPi } from "./slice/user";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [codeSlice.reducerPath]: codeSlice.reducer,
    [usersAPi.reducerPath]:usersAPi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware,codeSlice.middleware,usersAPi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;