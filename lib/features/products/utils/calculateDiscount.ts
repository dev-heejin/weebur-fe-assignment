export const calculateDiscount = (original: number, discountPercentage: number): number => {
  return Math.floor(original * (1 - discountPercentage / 100));
};
