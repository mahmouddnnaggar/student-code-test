import  recentlyAddedReducer  from '@/features/RecentlyAdded/store/recently-added.slice';
import featyredReducer from "@/features/featured-products/store/featured-products.slice"
 
import offersReducer from "@/features/offers/store/offers.slice"
import electronicsReducer from "@/features/electronics/store/electronics.slice"
import brandsReducer from"../../brands/store/brands.slice"
import mansReducer from "@/features/mans-fashions/store/mans.slice"
import WomenReducer from"@/features/women-fashoins/store/women.slice"
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../server/auth.slice";
import { cartReducer } from "@/features/cart/store/cart.slice";
import wishlistReducer from "@/features/wishlist/store/wishlist.slice"; 
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import offers from '@/app/offers/page';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    recentlyAdded: recentlyAddedReducer, 
    featured:featyredReducer,
    offers:offersReducer,
    brands:brandsReducer,
    mansFashion:mansReducer,
      womenFashion:WomenReducer,
      electronics: electronicsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;