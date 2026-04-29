import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/mans.types";

interface MansState {
  products: Product[];
}

const initialState: MansState = {
  products: [],
};

const mansSlice = createSlice({
  name: "mansFashion",
  initialState,
  reducers: {
    setMansProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setMansProducts } = mansSlice.actions;
export default mansSlice.reducer;