import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import cartReducer from "./features/CartSlice";
import statusOrderSlice from "./features/statusOrderSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    status: statusOrderSlice,
  },
});
