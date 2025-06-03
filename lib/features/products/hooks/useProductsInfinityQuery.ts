import { useInfiniteQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/features/products/api/getProducts';

export function useProductsInfinityQuery() {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam = 0 }) => getProducts({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { skip, limit, total } = lastPage;
      const nextSkip = skip + limit;

      return nextSkip >= total ? undefined : nextSkip;
    },
  });
}
