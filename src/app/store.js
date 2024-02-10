import { configureStore } from "@reduxjs/toolkit";
import { selectedCityReducer } from "../slices/selectedCitySlice";
import { calendarDateRangeReducer } from "../slices/calendarDateRangeSlice";

const store = configureStore({
    reducer: {
        selectedCity: selectedCityReducer,
        calendarDateRange: calendarDateRangeReducer,
    }
  });
  
  export default store;