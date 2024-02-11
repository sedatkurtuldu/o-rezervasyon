import { createSlice } from '@reduxjs/toolkit';

const intialState = {
  startDate: null,
  endDate: null,
  status: 'idle',
  error: null,
};

const calendarDateRangeSlice = createSlice({
  name: 'calendarDateRange',
  initialState: intialState,
  reducers: {
    setCalendarDateRange: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
  },
});

export const calendarDateRangeReducer = calendarDateRangeSlice.reducer;
export const { setCalendarDateRange } = calendarDateRangeSlice.actions;
