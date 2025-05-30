import { ThumbnailWrapper } from '@/components/products';

export default function ProductCard({
  product,
  viewMode,
}: {
  product: Product;
  viewMode?: 'grid' | 'list';
}) {
  return (
    <div
      className={`w-full h-full flex bg-white rounded-lg shadow-md border border-gray-300 gap-6 py-2 justify-center ${
        viewMode === 'grid' ? 'flex-col pb-2' : ''
      }`}
    >
      <ThumbnailWrapper alt={product.title} src={product.thumbnail} />

      <div className="flex flex-col justify-between h-full px-2 gap-6 overflow-hidden">
        <div className="flex flex-col flex-1 gap-2 h-full">
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-600 truncate">{product.description}</p>
          <div className="flex items-baseline gap-2">
            {product.discountPercentage && product.discountPercentage > 0 ? (
              <>
                <span className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xl font-bold text-red-600">
                  ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>

          {product.reviews && product.reviews.length > 0 && (
            <span className="text-md">reviews: {product.reviews.length}</span>
          )}
        </div>

        <button
          className={`p-4 bg-gray-500 text-white rounded-md ${viewMode === 'grid' ? 'w-full' : 'w-fit self-start'}`}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
