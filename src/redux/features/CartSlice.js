import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
  order: [],
};
export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (itemInCart) {
        if(action.payload.increaseOne){
          itemInCart.quantity_p += action.payload.quantity_p;
        }else{
          itemInCart.quantity_p = action.payload.quantity_p;
        }
        
      } else {
        state.cart.push({
          ...action.payload,
        });
      }
    },

    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload);
      if (item) {
        item.quantity_p++;
      } else {
        state.cart.push({
          ...action.payload,
          quantity_p:
            action.payload.quantity_p !== undefined
              ? action.payload.quantity_p
              : 1,
        });
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload);
      if (item.quantity_p === 1) {
        item.quantity_p = 1;
      } else {
        item.quantity_p--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item._id !== action.payload
      );
      state.cart = removeItem;
    },
    confirmOrder: (state, action) => {
      state.order.push(action.payload);
    },
  },
});
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  confirmOrder,
} = CartSlice.actions;
export default CartSlice.reducer;
