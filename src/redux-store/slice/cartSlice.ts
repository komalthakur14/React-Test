import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../Products";

export interface CartItem extends Product {}

export interface CartState {
  items: CartItem[];
  total: number;
}

export interface RootState {
  cart: CartState;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.items.push({ ...action.payload });
      state.total = state.items.reduce((total, item) => total + item.price, 0);
    },
    emptyCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
