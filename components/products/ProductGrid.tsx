import { ProductCard } from '@/components/products';

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section className="w-full grid grid-cols-4 grid-auto-rows-[420px] justify-start items-start gap-[20px] px-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode={'grid'} />
      ))}
    </section>
  );
}
