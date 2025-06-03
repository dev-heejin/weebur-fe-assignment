import { cookies } from 'next/headers';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getProducts } from '@/lib/features/products/api';
import { ProductListViewMode } from '@/lib/features/products/types';
import { ProductsPageClient } from './components';

export default async function ProductsPage() {
  const cookieStore = await cookies();
  const viewMode = cookieStore.get('viewMode')!.value as ProductListViewMode;

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
      <ProductsPageClient viewMode={viewMode} />
    </HydrationBoundary>
  );
}
