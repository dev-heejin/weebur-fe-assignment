import { ProductApiResponse } from '@/lib/features/products/types/productApiResponse';

export async function getProducts({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<ProductApiResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?skip=${pageParam}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}
