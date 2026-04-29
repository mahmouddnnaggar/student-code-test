import { createSlice } from "@reduxjs/toolkit";

const electronicsSlice = createSlice({
    name: "electronics",
    initialState: {
        products: [],
    },
    reducers: {
        setElectronicsProducts: (state, action) => {
            state.products = action.payload;
        },
    },
});

export const { setElectronicsProducts } = electronicsSlice.actions;
export default electronicsSlice.reducer;