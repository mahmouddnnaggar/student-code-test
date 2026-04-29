"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLoggedUserCart as getCartServer } from "../server/cart.actions";

export interface CartProductDetails {
  title: string;
  imageCover: string;
  category: any;
  id: string;
  quantity: number;
}

export interface CartItem {
  count: number;
  _id: string;
  product: CartProductDetails;
  price: number;
}

export interface CartState {
  numOfCartItems: number;
  cartId: string | null;
  products: CartItem[];
  totalCartPrice: number;
  isLoading: boolean;
  error: string | null;
}

// ✅ نجيب الكارت من السيرفر (cookies)
export const getLoggedUserCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCartServer();
      return data;
    } catch (err) {
      return rejectWithValue("Error fetching cart");
    }
  }
);

const initialState: CartState = {
  numOfCartItems: 0,
  cartId: null,
  products: [],
  totalCartPrice: 0,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartId = null;
      state.numOfCartItems = 0;
      state.products = [];
      state.totalCartPrice = 0;
    },
    updateQuantityLocally: (state, action) => {
      const { id, count } = action.payload;
      const item = state.products.find(p => p.product.id === id);
      if (item) {
        item.count = count;
      }

      state.numOfCartItems = state.products.reduce((sum, p) => sum + p.count, 0);
      state.totalCartPrice = state.products.reduce((sum, p) => sum + p.count * p.price, 0);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLoggedUserCart.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getLoggedUserCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.numOfCartItems = action.payload.numOfCartItems;
      state.cartId = action.payload.cartId;
      state.products = action.payload.data.products || [];
      state.totalCartPrice = action.payload.data.totalCartPrice || 0;
    });

    builder.addCase(getLoggedUserCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { updateQuantityLocally, clearCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
