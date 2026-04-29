export interface WishlistItem {
  _id: string; // عدلنا دي من id لـ _id
  title: string;
  price: number;
  imageCover: string;
  ratingsAverage: number;
}

export interface WishlistState {
    wishlistData:WishlistItem[],
  wishlistIds: string[];        
  isLoading: boolean;
  error: string | null;
}