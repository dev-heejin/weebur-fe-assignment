'use client';
import { useViewMode } from '@/hooks/useViewMode';
import { ProductGrid } from '@/components/products/index';
import useInfinityProducts from '@/hooks/useInfinityProducts';
import { transformProductType } from '@/lib/transformProductType';

export default function ProductViewModeClient() {
  const { viewMode } = useViewMode();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfinityProducts();
  const products = data?.pages.flatMap((page) => page.products.map(transformProductType)) || [];

  return (
    <ProductGrid
      products={products}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
