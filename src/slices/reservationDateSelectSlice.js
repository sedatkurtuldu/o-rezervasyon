import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  startDate: '',
  endDate: '',
  status: "idle",
  error: null,
};

const reservationDateSelectSlice = createSlice({
    name: "reservationDateSelect",
    initialState: intialState,
    reducers: {
        setReservationDateSelect: (state, action) => {
        state.startDate = action.payload.startDate;
        state.endDate = action.payload.endDate;
      },
    },
  });
  
  export const reservationDateSelectSliceReducer = reservationDateSelectSlice.reducer;
  export const { setReservationDateSelect } = reservationDateSelectSlice.actions;
  