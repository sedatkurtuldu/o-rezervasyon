import { configureStore } from "@reduxjs/toolkit";
import { selectedCityReducer } from "../slices/selectedCitySlice";
import { calendarDateRangeReducer } from "../slices/calendarDateRangeSlice";
import { peopleCounterReducer } from "../slices/peopleCounterSlice";
import userSlice from "../slices/userSlice";

const store = configureStore({
    reducer: {
        selectedCity: selectedCityReducer,
        calendarDateRange: calendarDateRangeReducer,
        peopleCounter: peopleCounterReducer,
        user: userSlice
    }
  });
  
  export default store;