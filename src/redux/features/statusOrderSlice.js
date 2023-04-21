import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  status: {},
};
export const statusOrderSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    checkStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});
export const { checkStatus } = statusOrderSlice.actions;
export default statusOrderSlice.reducer;
