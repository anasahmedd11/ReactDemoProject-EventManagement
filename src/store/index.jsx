import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from "./Favorites-Slice.jsx";

const reduxStore = configureStore({
    reducer: {
        favorites: favoritesSlice.reducer,
    },
});

export default reduxStore;