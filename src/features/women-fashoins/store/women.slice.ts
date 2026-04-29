import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const womenSlice = createSlice({
  name: "womenFashion",
  initialState,
  reducers: {
    setWomenProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setWomenProducts } = womenSlice.actions;
export default womenSlice.reducer;