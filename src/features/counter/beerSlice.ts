import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BeerInfo } from "../../models/BeerInfo";
import { FavoriteBeerInfo } from "../../models/FavoriteBeerInfo";

interface BeerState {
  // maps all favorite beers' ids to their info
  favorites: { [key: string]: FavoriteBeerInfo };
}

const initialState: BeerState = {
  favorites: {},
};

export const beerSlice = createSlice({
  name: "beer",
  initialState,
  reducers: {
    addToFav: (state, action: PayloadAction<BeerInfo>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.favorites[action.payload.id] = {
        ...action.payload,
        rank: undefined,
      };
    },
    removeFromFav: (state, action: PayloadAction<string>) => {
      delete state.favorites[action.payload];
    },
    updateRank: (
      state,
      action: PayloadAction<{ id: string; rank: number }>
    ) => {
      const beer = state.favorites[action.payload.id];
      if (beer !== undefined) {
        beer.rank = action.payload.rank;
      }
    },
  },
});

export const { addToFav, removeFromFav, updateRank } = beerSlice.actions;

export default beerSlice.reducer;
