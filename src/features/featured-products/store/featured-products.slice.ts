import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  featuredProducts: [],
  isLoading: true,
  error: null,
};

const featuredSlice = createSlice({
  name: 'featured',
  initialState,
  reducers: {
    setFeaturedProducts: (state, action) => {
      state.featuredProducts = action.payload;
      state.isLoading = false;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const { setFeaturedProducts, setLoading } = featuredSlice.actions;
export default featuredSlice.reducer;