import { Product } from "../../products/types/products.types";

export interface RecentlyAddedState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}