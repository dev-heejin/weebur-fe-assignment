import { z } from 'zod';
import { brandList } from '@/lib/features/products/constants/brands';

export const productFormSchema = z.object({
  title: z.string().min(1, '상품명을 입력해주세요').max(15, '상품명은 15자 이내로 입력해주세요'),
  description: z.string().optional(),
  price: z.string().refine((val) => {
    const n = Number(val);
    return !isNaN(n) && n >= 1000;
  }, '1,000원 이상 입력해주세요'),
  discountPercentage: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const n = Number(val);
      return !isNaN(n) && n >= 0 && n <= 100;
    }, '0~100 사이 숫자를 입력해주세요'),
  brand: z.enum(brandList).optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
