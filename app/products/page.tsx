import { ProductViewModeClient } from '@/app/products/components';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getProducts } from '@/lib/queries/getProducts';
import { cookies } from 'next/headers';

export default async function ProductsPage() {
  const cookieStore = await cookies();
  const viewMode = cookieStore.get('viewMode')!.value;

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
      <ProductViewModeClient initialViewMode={viewMode} />
    </HydrationBoundary>
  );
}
