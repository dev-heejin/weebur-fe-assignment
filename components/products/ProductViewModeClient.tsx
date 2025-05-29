'use client';
import { useViewMode } from '@/hooks/useViewMode';
import { ProductGrid, ProductList } from '@/components/products/index';

export default function ProductViewModeClient({ products }: { products: Product[] }) {
  const { viewMode } = useViewMode();
  // return viewMode === 'grid' ? (
  // return <ProductGrid products={products} />;
  // ) : (
  return <ProductList products={products} />;
  // );
}
