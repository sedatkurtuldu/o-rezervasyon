import { configureStore } from "@reduxjs/toolkit";
import { selectedCityReducer } from "../slices/selectedCitySlice";
import { calendarDateRangeReducer } from "../slices/calendarDateRangeSlice";
import { peopleCounterReducer } from "../slices/peopleCounterSlice";

const store = configureStore({
    reducer: {
        selectedCity: selectedCityReducer,
        calendarDateRange: calendarDateRangeReducer,
        peopleCounter: peopleCounterReducer
    }
  });
  
  export default store;