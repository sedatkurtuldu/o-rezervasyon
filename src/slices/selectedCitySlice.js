import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  city: "",
  status: "idle",
  error: null,
};

const selectedCitySlice = createSlice({
  name: "selectedCity",
  initialState: initialState,
  reducers: {
    setSelectedCity: (state, action) => {
      if (action.payload !== null) {
        state.city = action.payload;
      }
      else {
        return initialState;
      }
    },
  },
});

export const selectedCityReducer = selectedCitySlice.reducer;
export const { setSelectedCity } = selectedCitySlice.actions;
