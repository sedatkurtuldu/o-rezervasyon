import { configureStore } from "@reduxjs/toolkit";
import { selectedCityReducer } from "../slices/selectedCitySlice";
import { calendarDateRangeReducer } from "../slices/calendarDateRangeSlice";
import { peopleCounterReducer } from "../slices/peopleCounterSlice";
import userPhoneSlice from "../slices/userPhoneSlice";

const store = configureStore({
    reducer: {
        selectedCity: selectedCityReducer,
        calendarDateRange: calendarDateRangeReducer,
        peopleCounter: peopleCounterReducer,
        userPhone: userPhoneSlice
    }
  });
  
  export default store;