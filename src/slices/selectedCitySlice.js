import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  city: '',
  status: "idle",
  error: null,
};

const selectedCitySlice = createSlice({
    name: "selectedCity",
    initialState: intialState,
    reducers: {
      setSelectedCity: (state, action) => {
        state.city = action.payload;
      },
    },
  });
  
  export const selectedCityReducer = selectedCitySlice.reducer;
  export const { setSelectedCity } = selectedCitySlice.actions;
  