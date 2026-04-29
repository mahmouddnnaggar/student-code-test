export interface CartProductDetails {
    title: string;
    quantity: number;
    imageCover: string;
    category: any; // يمكنك تفصيلها لـ CartCategory لاحقاً
    brand: any;    // يمكنك تفصيلها لـ CartBrand لاحقاً
    ratingsAverage: number;
    id: string;
}

export interface CartItem {
    count: number;
    _id: string;
    product: CartProductDetails;
    price: number;
}

export interface CartData {
    _id: string;
    cartOwner: string;
    products: CartItem[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCartPrice: number;
}

export interface CartResponse {
    status: string;
    numOfCartItems: number;
    cartId: string;
    data: CartData;
}