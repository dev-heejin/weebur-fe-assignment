export async function getProducts({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<ProductApiResponse> {
  const res = await fetch(`/api/products?skip=${pageParam}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}
