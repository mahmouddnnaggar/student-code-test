import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    products: [] as any[],
    isLoading: false,
};

const offersSlice = createSlice({
    name: "offers",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        setOffers: (state, action: PayloadAction<any[]>) => {
            state.products = action.payload;
            state.isLoading = false;
        },
    },
});

export const { setLoading, setOffers } = offersSlice.actions;
export default offersSlice.reducer;