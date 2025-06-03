import { ProductRaw } from '@/lib/features/products/types/productRaw';

export interface ProductApiResponse {
  products: ProductRaw[];
  total: number;
  skip: number;
  limit: number;
}
