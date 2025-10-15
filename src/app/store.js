import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../redux/productsSlice";
import cartReducer from "../redux/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});
