import { configureStore } from "@reduxjs/toolkit";
import { selectedCityReducer } from "../slices/selectedCitySlice";
import { calendarDateRangeReducer } from "../slices/calendarDateRangeSlice";
import { peopleCounterReducer } from "../slices/peopleCounterSlice";
import userSlice from "../slices/userSlice";
import isEditUpdated from "../slices/isEditUpdated";
import { reservationDateSelectSliceReducer } from "../slices/reservationDateSelectSlice";
import { calendarDateRangeIsFirstReducer } from "../slices/calendarDateRangeIsFirstSlice";
import { reservationPeopleCounterReducer } from "../slices/reservationPeopleSelectSlice";
import { searchScreenRoomsReducer } from "../slices/searchScreenRoomsSlice";
import { reservationRoomReducer } from "../slices/reservationRoomSlice";

const store = configureStore({
    reducer: {
        selectedCity: selectedCityReducer,
        calendarDateRange: calendarDateRangeReducer,
        peopleCounter: peopleCounterReducer,
        user: userSlice,
        isUpdated: isEditUpdated,
        reservationDateSelect: reservationDateSelectSliceReducer,
        calendarDateRangeIsFirst: calendarDateRangeIsFirstReducer,
        reservationPeople: reservationPeopleCounterReducer,
        searchScreenRooms: searchScreenRoomsReducer,
        reservationRoom: reservationRoomReducer
    }
  });
  
  export default store;