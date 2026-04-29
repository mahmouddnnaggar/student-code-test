export interface Product {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  category: {
    name: string;
  };
  ratingsAverage: number;
  description: string;
}

export interface MansFashionResponse {
  data: Product[];
}