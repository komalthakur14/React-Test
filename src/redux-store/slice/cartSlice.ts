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
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    emptyCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
