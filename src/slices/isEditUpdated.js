import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUpdated: false,
};

const isEditUpdatedSlice = createSlice({
  name: 'isUpdated',
  initialState,
  reducers: {
    setIsUpdated: (state, action) => {
      state.phone = action.payload;
    }
  },
});

export const { setIsUpdated } = isEditUpdatedSlice.actions;
export default isEditUpdatedSlice.reducer;
