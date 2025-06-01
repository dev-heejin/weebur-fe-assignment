'use client';

import { ProductCard } from '@/app/products/components/index';
import { useIntersection } from '@/hooks/useIntersection';

type ProductListProps = {
  products: Product[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};
export default function ProductList({
  products,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: ProductListProps) {
  const lodMoreRef = useIntersection(() => {
    if (hasNextPage && !isFetchingNextPage) {
      console.log('ProductGrid lod more');
      fetchNextPage();
    }
  });

  return (
    <div>
      <div className="container w-full flex flex-col gap-[20px]">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} viewMode={'list'} />
        ))}
      </div>
      <div ref={lodMoreRef} className="h-10"></div>
    </div>
  );
}
