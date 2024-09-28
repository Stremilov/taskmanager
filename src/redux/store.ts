import { configureStore } from "@reduxjs/toolkit";

import teamsSlice from "./slices/teams/teamsSlice";

export const store = configureStore({
  reducer: {
    teamsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
