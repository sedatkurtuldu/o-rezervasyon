import { createSlice } from "@reduxjs/toolkit";

export const initialState = [];

const searchScreenRoomsSlice = createSlice({
  name: "searchScreenRooms",
  initialState,
  reducers: {
    setSearchScreenRooms: (state, action) => {
      const payload = action.payload;
      if (payload !== null) {
        const existingRoom = state.find(
          (room) => room.roomTypeId === payload.roomTypeId
        );
        if (existingRoom) {
          existingRoom.isChecked = payload.isChecked;
        } else {
          state.push(payload);
        }
      } else {
        return initialState;
      }
    },
  },
});


export const searchScreenRoomsReducer = searchScreenRoomsSlice.reducer;
export const { setSearchScreenRooms } = searchScreenRoomsSlice.actions;
