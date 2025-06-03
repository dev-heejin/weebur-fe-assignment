import { ProductRequestType } from '@/lib/features/products/schemas/product.request.schema';

export async function createProduct(data: ProductRequestType) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('상품을 정상적으로 생성하지 못했습니다.');
  }

  return response.json();
}
