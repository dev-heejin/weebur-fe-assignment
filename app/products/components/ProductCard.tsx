import { ThumbnailWrapper } from '@/app/products/components/index';

export default function ProductCard({
  product,
  viewMode,
}: {
  product: Product;
  viewMode?: 'grid' | 'list';
}) {
  console.log('ProductCard', product);
  return (
    <div
      className={`w-full h-full flex bg-white rounded-lg shadow-md border border-gray-300 gap-6 py-2 ${
        viewMode === 'grid' ? 'flex-col pb-2' : 'flex-row items-start justify-start'
      }`}
    >
      <div className="flex justify-center">
        <ThumbnailWrapper alt={product.title} src={product.thumbnail} />
      </div>

      <div className="flex flex-col justify-between h-full px-2 gap-6 w-full overflow-hidden">
        <div className="flex flex-col flex-1 gap-2 h-full">
          <h2 className="text-sm font-semibold">{product.title}</h2>
          <p className="text-sm text-gray-600 truncate overflow-hidden text-ellipsis">
            {product.description}
          </p>
          <div className="flex items-baseline gap-2">
            {product.discountPercentage && product.discountPercentage > 0 ? (
              <>
                <span className="text-sm text-gray-500 line-through overflow-hidden truncate text-ellipsis">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-lg font-bold text-red-600 overflow-hidden truncate text-ellipsis">
                  ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>

          {product.reviews && product.reviews.length > 0 && (
            <span className="text-sm">reviews: {product.reviews.length}</span>
          )}
        </div>

        <button
          className={`px-3 py-2 bg-blue-600 hover:bg-blue-900 font-bold text-sm text-white rounded-md ${viewMode === 'grid' ? 'w-full' : 'w-fit'}`}
        >
          장바구니 추가
        </button>
      </div>
    </div>
  );
}
