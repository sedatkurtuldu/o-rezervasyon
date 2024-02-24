import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  forOnePerson: 0,
  forTwoPerson: 0,
  forThreePerson: 0,
  forFourPerson: 0,
  status: 'idle',
  error: null,
};

const reservationRoomSelectSlice = createSlice({
  name: 'reservationRoomSelectCounter',
  initialState: initialState,
  reducers: {
    setReservationRoomCount: (state, action) => {
      state.forOnePerson = action.payload.forOnePerson;
      state.forTwoPerson = action.payload.forTwoPerson;
      state.forThreePerson = action.payload.forThreePerson;
      state.forFourPerson = action.payload.forFourPerson;
    },
  },
});

export const reservationRoomSelectReducer = reservationRoomSelectSlice.reducer;
export const { setReservationRoomCount } = reservationRoomSelectSlice.actions;
