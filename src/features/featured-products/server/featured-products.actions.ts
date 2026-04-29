import axios, { AxiosRequestConfig } from "axios";
import { setFeaturedProducts, setLoading } from "../store/featured-products.slice";
import { AppDispatch } from "@/features/auth/store/store";

export const fetchFeaturedProducts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading());

    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };

    const { data } = await axios.request(options);

    // هنعرض أول 10 منتجات كـ Featured
    dispatch(setFeaturedProducts(data.data.slice(0, 10))); 
  } catch (error) {
    console.error("Error fetching featured products:", error);
  }
};