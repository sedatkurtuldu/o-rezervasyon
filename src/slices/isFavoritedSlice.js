import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const isFavoritedSlice = createSlice({
  name: 'isFavorited',
  initialState,
  reducers: {
    setIsFavorited: (state, action) => {
      const { hotelId, isFavorite } = action.payload;
      const existingIndex = state.findIndex((item) => item.hotelId === hotelId);
      if (existingIndex !== -1) {
        state[existingIndex].isFavorite = isFavorite;
        return [...state];
      } else {
        return [...state, { hotelId, isFavorite }];
      }
    },
  },
});

export const { setIsFavorited } = isFavoritedSlice.actions;
export const isFavoritedReducer = isFavoritedSlice.reducer;
