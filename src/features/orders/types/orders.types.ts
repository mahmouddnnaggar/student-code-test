export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

// User Type
export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

// Category Type
export interface OrderCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Brand Type
export interface OrderBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Subcategory Type
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// Product Type
export interface OrderProduct {
  _id: string;
  title: string;
  imageCover: string;
  category: OrderCategory;
  brand: OrderBrand;
  ratingsAverage: number;
  ratingsQuantity: number;
  subcategory: Subcategory[];
  id: string;
}

// Cart Item Type
export interface OrderCartItem {
  count: number;
  _id: string;
  product: OrderProduct;
  price: number;
}

// Order Type
export interface Order {
  _id: string;
  user: OrderUser;
  cartItems: OrderCartItem[];
  totalOrderPrice: number;
  taxPrice: number;
  shippingPrice: number;
  shippingAddress: ShippingAddress;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

// Create Order Response Type
export interface CreateOrderResponse {
  status: string;
  data: Order;
}

// Get Orders Response Type
export interface GetOrdersResponse {
  status: string;
  results: number;
  data: Order[];
}

// Get Single Order Response Type
export interface GetOrderResponse {
  status: string;
  data: Order;
}