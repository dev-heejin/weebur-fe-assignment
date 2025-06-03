import { z } from 'zod';
import { brandList } from '@/lib/features/products/constants/brands';

export const productRequestSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.number(),
  discountPercentage: z.number().optional(),
  brand: z.enum(brandList).optional(),
});

export type ProductRequestType = z.infer<typeof productRequestSchema>;
