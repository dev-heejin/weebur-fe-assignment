export function transformProductType(
  product: ProductRaw,
): Pick<
  ProductRaw,
  | 'id'
  | 'title'
  | 'description'
  | 'thumbnail'
  | 'price'
  | 'discountPercentage'
  | 'rating'
  | 'reviews'
> {
  const { id, title, description, thumbnail, rating, reviews, price, discountPercentage } = product;
  return {
    id,
    title,
    description,
    thumbnail,
    rating,
    reviews,
    price,
    discountPercentage,
  };
}
