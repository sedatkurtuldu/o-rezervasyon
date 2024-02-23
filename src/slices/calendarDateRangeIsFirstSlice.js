import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFirst: true,
  minDate: ''
};

const calendarDateRangeIsFirstSlice = createSlice({
  name: 'calendarDateRangeIsFirst',
  initialState,
  reducers: {
    setCalendarDateRangeIsFirst: (state, action) => {
      state.isFirst = action.payload.isFirst;
      state.minDate = action.payload.minDate;
    },
  },
});

export const { setCalendarDateRangeIsFirst } = calendarDateRangeIsFirstSlice.actions;
export const calendarDateRangeIsFirstReducer = calendarDateRangeIsFirstSlice.reducer;
