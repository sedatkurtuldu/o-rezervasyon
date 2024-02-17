import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  surname: '',
  phone: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSurname: (state, action) => {
      state.surname = action.payload;
    }
  },
});

export const { setPhone, setSurname, setName } = userSlice.actions;
export default userSlice.reducer;
