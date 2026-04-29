export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number; // الخصم اختياري لأنه مش عند كل المنتجات
  imageCover: string;
  images: string[];
  category: ICategory;
  brand: IBrand;
  ratingsAverage: number;
  id: string;
}

export interface IOffersState {
  products: IProduct[];
  isLoading: boolean;
  error: string | null;
}