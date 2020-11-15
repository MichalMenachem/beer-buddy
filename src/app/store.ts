import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import beerReducer from "../features/counter/beerSlice";

export const store = configureStore({
  reducer: {
    beer: beerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
