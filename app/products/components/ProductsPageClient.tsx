'use client';

import { ProductClient, ProductListViewMode, ProductRaw } from '@/lib/features/products/types';
import { useProductsInfinityQuery } from '@/lib/features/products/hooks';
import { useIntersectionObserver } from '@/lib/shared/hooks/useIntersectionObserver';
import { ProductCard } from '@/app/products/components';

export default function ProductsPageClient({ viewMode }: { viewMode: ProductListViewMode }) {
  const isGrid = viewMode === 'grid';

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProductsInfinityQuery();

  const formatProductType = ({
    id,
    title,
    description,
    thumbnail,
    price,
    discountPercentage,
    rating,
    reviews,
  }: ProductRaw): ProductClient => ({
    id,
    title,
    description,
    thumbnail,
    price,
    discountPercentage,
    rating,
    reviews,
  });

  const products = data?.pages.flatMap((page) => page.products.map(formatProductType)) ?? [];

  const lodMoreRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <div>
      <div
        className={
          isGrid
            ? 'w-full grid grid-cols-4 justify-start items-start gap-6 px-4'
            : 'container w-full flex flex-col gap-[20px]'
        }
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} viewMode={viewMode} />
        ))}
      </div>

      <div ref={lodMoreRef} className="h-10" />
    </div>
  );
}
