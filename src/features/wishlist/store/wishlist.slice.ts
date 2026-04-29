import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWishlist, addToWishlist, removeFromWishlist } from "../server/wishlist.actions";
import { WishlistState } from "../types/wishlist.types";

const initialState: WishlistState = {
  wishlistData: [],
  wishlistIds: [],
  isLoading: false,
  error: null,
};

// 1. جلب المنتجات
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getWishlist();
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ 2. إضافة منتج (دي اللي كانت ناقصة ومسببة الخطأ)
export const addProductToWishlist = createAsyncThunk(
  "wishlist/add",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await addToWishlist(id);
      return response.data; // بيرجع الـ IDs الجديدة
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 3. مسح منتج
export const removeWishlistItem = createAsyncThunk(
  "wishlist/remove",
  async (id: string, { rejectWithValue }) => {
    try {
      await removeFromWishlist(id);
      return id; 
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlistData = action.payload;
        state.wishlistIds = action.payload.map((item: any) => item._id);
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // ✅ Add Item (تحديث الـ IDs عشان القلب يلون أحمر)
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.wishlistIds = action.payload; // الـ API بيرجع مصفوفة الـ IDs الجديدة
      })
      // Remove Item
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.wishlistData = state.wishlistData.filter(
          (item) => item._id !== action.payload
        );
        state.wishlistIds = state.wishlistIds.filter(
          (id) => id !== action.payload
        );
      });
  },
});

export default wishlistSlice.reducer;