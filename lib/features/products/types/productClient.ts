import { ProductRaw } from '@/lib/features/products/types/productRaw';

export type ProductClient = Pick<
  ProductRaw,
  | 'id'
  | 'title'
  | 'description'
  | 'thumbnail'
  | 'price'
  | 'discountPercentage'
  | 'rating'
  | 'reviews'
>;
