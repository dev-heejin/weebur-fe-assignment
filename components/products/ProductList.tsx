import { ProductCard } from '@/components/products';

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <section className="w-full flex flex-col gap-[20px]">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode={'list'} />
      ))}
    </section>
  );
}
