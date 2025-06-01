'use client';
import { ProductCard } from '@/app/products/components/index';
import { useIntersection } from '@/hooks/useIntersection';

type ProductGridProps = {
  products: Product[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export default function ProductGrid({
  products,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: ProductGridProps) {
  const lodMoreRef = useIntersection(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <div>
      <div className="w-full grid grid-cols-4 justify-start items-start gap-6 px-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} viewMode={'grid'} />
        ))}
      </div>

      <div ref={lodMoreRef} className="h-10"></div>
    </div>
  );
}
