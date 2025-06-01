'use client';
import { ProductGrid, ProductList } from '@/app/products/components/index';
import useInfinityProducts from '@/hooks/useInfinityProducts';
import { transformProductType } from '@/lib/transformProductType';

export default function ProductViewModeClient({ initialViewMode }: { initialViewMode: string }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfinityProducts();
  const products = data?.pages.flatMap((page) => page.products.map(transformProductType)) || [];

  return initialViewMode === 'grid' ? (
    <ProductGrid
      products={products}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  ) : (
    <ProductList
      products={products}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
