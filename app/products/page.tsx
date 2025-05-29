import { ProductViewModeClient } from '@/components/products';

export default async function ProductsPage() {
  const data = await fetch(
    'https://dummyjson.com/products/search?q=phone&limit=20&skip=1&sortBy=rating&order=desc',
  );
  const { products } = await data.json();
  return <ProductViewModeClient products={products} />;
}
