'use server';

import { redirect } from 'next/navigation';

export async function createProduct(data: {
  title: string;
  description?: string;
  price: number;
  discountPercentage?: number;
  brand?: string;
}) {
  const response = await fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('상품을 정상적으로 생성하지 못했습니다.');
  }

  redirect('/products');
}
