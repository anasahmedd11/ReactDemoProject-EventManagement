import { createSlice } from "@reduxjs/toolkit";

const initialFavoritesState = {
  favoriteItems: [],
  totalLikedItems: 0,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: initialFavoritesState,
  reducers: {

    toggleFavorite(state, action) {
      const newItem = action.payload; 
      const existingItem = state.favoriteItems.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        state.favoriteItems = state.favoriteItems.filter(
          (item) => item.id !== newItem.id
        );
        state.totalLikedItems--;
      } else {
        state.favoriteItems.push(newItem);
        state.totalLikedItems++;
      }
    },

    clearFavorites(state) {
      state.favoriteItems = [];
      state.totalLikedItems = 0;
    },
    
  },
});

export const favoritesActions = favoritesSlice.actions;
export default favoritesSlice;
