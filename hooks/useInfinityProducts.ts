import { useInfiniteQuery } from '@tanstack/react-query';
import { getProducts } from '@/app/products/api/getProducts';

export default function useInfinityProducts() {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam = 0 }) => getProducts({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextSkip = allPages.length * 20;
      return nextSkip >= lastPage.total ? undefined : nextSkip;
    },
  });
}
