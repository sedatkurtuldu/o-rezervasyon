import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  adultCount: 0,
  childCount: 0,
  babyCount: 0,
  status: 'idle',
  error: null,
};

const peopleCounterSlice = createSlice({
  name: 'peopleCounter',
  initialState: initialState,
  reducers: {
    setCount: (state, action) => {
      state.adultCount = action.payload.adultCount;
      state.childCount = action.payload.childCount;
      state.babyCount = action.payload.babyCount;
    },
  },
});

export const peopleCounterReducer = peopleCounterSlice.reducer;
export const { setCount } = peopleCounterSlice.actions;
