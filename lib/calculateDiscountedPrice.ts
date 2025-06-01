export const calculateDiscountedPrice = (original: number, discountPercentage?: number): number => {
  const percentage = discountPercentage ?? 0;
  return Math.floor(original * (1 - percentage / 100));
};
