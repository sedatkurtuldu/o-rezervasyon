import { createSlice } from '@reduxjs/toolkit';

export const initialState = {};

const reservationRoomSlice = createSlice({
  name: 'reservationRoom',
  initialState: initialState,
  reducers: {
    setReservationRoom: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetReservationRoom: () => {
      return initialState;
    },
  },
});

export const { setReservationRoom, resetReservationRoom } = reservationRoomSlice.actions;
export const reservationRoomReducer = reservationRoomSlice.reducer;
