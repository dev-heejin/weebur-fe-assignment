import { ProductViewModeClient } from '@/components/products';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getProducts } from '@/app/products/api/getProducts';

export default async function ProductsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products', { pageParam: 0 }],
    queryFn: ({ queryKey }) => {
      const [{ pageParam }] = queryKey as [{ pageParam: number }];
      return getProducts({ pageParam });
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductViewModeClient />;
    </HydrationBoundary>
  );
}
