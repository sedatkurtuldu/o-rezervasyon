import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hotelId: ""
};

const isFavoritedSlice = createSlice({
  name: 'isFavorited',
  initialState,
  reducers: {
    setIsFavorited: (state, action) => {
      state.hotelId = action.payload.hotelId;
    }
  },
});

export const { setIsFavorited } = isFavoritedSlice.actions;
export const isFavoritedReducer = isFavoritedSlice.reducer;
