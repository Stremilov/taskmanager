import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "@/redux/slices/filter/filterSlice";
import cartSlice from "@/redux/slices/cart/cartSlice";
import productSlice from "@/redux/slices/product/productSlice";

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
