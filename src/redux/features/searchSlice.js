import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  dataSearch: "",
};
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    checkDataSearch: (state, action) => {
      state.dataSearch = action.payload;
    },
  },
});
export const { checkDataSearch } = searchSlice.actions;
export default searchSlice.reducer;
