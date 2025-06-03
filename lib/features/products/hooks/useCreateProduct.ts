import { useMutation } from '@tanstack/react-query';
import { createProduct } from '@/lib/features/products/api/createProduct';
import { ProductRequestType } from '@/lib/features/products/schemas/product.request.schema';

export function useCreateProduct() {
  return useMutation({
    mutationKey: ['createProduct'],
    mutationFn: (data: ProductRequestType) => createProduct(data),
    onError: (error: Error) => {
      if (error) {
        console.error(error);
      }
    },
  });
}
