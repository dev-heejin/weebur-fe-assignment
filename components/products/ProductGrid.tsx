'use client';
import { ProductCard } from '@/components/products';
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
    if (hasNextPage || !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <div>
      <div className="w-full grid grid-cols-4 grid-auto-rows-[420px] justify-start items-start gap-[20px] px-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} viewMode={'grid'} />
        ))}
      </div>

      <div ref={lodMoreRef} className="h-10"></div>
    </div>
  );
}
