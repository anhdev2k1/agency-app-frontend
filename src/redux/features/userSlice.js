import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    checkUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { checkUser } = userSlice.actions;
export default userSlice.reducer;
