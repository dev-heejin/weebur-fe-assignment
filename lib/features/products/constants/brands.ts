export const brandList = ['Apple', 'Samsung', 'Weebur'] as const;
export type Brand = (typeof brandList)[number];
export const brandOptions = brandList.map((brand) => ({
  label: brand,
  value: brand,
}));
