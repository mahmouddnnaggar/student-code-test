export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}

export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Product {
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    images: string[];
    category: Category;
    subcategory: Subcategory[];
    brand: Brand;
    ratingsAverage: number;
    ratingsQuantity: number;
    id: string;
}

// ده الـ Interface الخاص بالرد اللي جاي من الـ API
export interface WomenFashionResponse {
    results: number;
    metadata: {
        currentPage: number;
        numberOfPages: number;
        limit: number;
    };
    data: Product[];
}