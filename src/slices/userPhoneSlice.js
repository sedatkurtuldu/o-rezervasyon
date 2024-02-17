import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  phone: '',
};

const userPhoneSlice = createSlice({
  name: 'userPhone',
  initialState,
  reducers: {
    setPhone: (state, action) => {
      state.phone = action.payload;
    }
  },
});

export const { setPhone } = userPhoneSlice.actions;
export default userPhoneSlice.reducer;
