type Product = Pick<
  ProductRaw,
  | 'id'
  | 'title'
  | 'description'
  | 'thumbnail'
  | 'price'
  | 'discountPercentage'
  | 'rating'
  | 'reviews'
>;
