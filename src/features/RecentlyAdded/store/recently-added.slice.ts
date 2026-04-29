import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RecentlyAddedState } from "../types/recently-added.types";
import { getRecentProductsAction } from "../server/recently-added.actions";

export const fetchRecentProducts = createAsyncThunk(
  "recentlyAdded/fetch",
  async () => {
    return await getRecentProductsAction();
  }
);

const initialState: RecentlyAddedState = {
  products: [],
  isLoading: false,
  error: null,
};

const recentlyAddedSlice = createSlice({
  name: "recentlyAdded",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecentProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchRecentProducts.rejected, (state) => {
        state.isLoading = false;
        state.error = "Failed to load products";
      });
  },
});

export default recentlyAddedSlice.reducer;