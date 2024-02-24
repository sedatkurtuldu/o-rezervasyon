import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  reservationAdultCount: 0,
  reservationChildCount: 0,
  reservationBabyCount: 0,
  status: 'idle',
  error: null,
};

const reservationPeopleCounterSlice = createSlice({
  name: 'reservationPeople',
  initialState: initialState,
  reducers: {
    setReservationPeopleCount: (state, action) => {
      state.reservationAdultCount = action.payload.reservationAdultCount;
      state.reservationChildCount = action.payload.reservationChildCount;
      state.reservationBabyCount = action.payload.reservationBabyCount;
    },
  },
});

export const reservationPeopleCounterReducer = reservationPeopleCounterSlice.reducer;
export const { setReservationPeopleCount } = reservationPeopleCounterSlice.actions;
