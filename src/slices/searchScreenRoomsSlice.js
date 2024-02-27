import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  forOnePerson: false,
  forTwoPerson: false,
  forThreePerson: false,
  forFourPerson: false,
  status: "idle",
  error: null,
};

const searchScreenRoomsSlice = createSlice({
    name: "reservationDateSelect",
    initialState: intialState,
    reducers: {
        setSearchScreenRooms: (state, action) => {
        state.startDate = action.payload.startDate;
        state.endDate = action.payload.endDate;
      },
    },
  });
  
  export const searchScreenRoomsSliceReducer = searchScreenRoomsSlice.reducer;
  export const { setSearchScreenRooms } = searchScreenRoomsSlice.actions;
  