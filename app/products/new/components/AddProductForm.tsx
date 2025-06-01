'use client';
import { startTransition, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { createProduct } from '@/lib/actions/createProduct';
import { calculateDiscountedPrice } from '@/lib/calculateDiscountedPrice';

export const brandType = z.enum(['Apple', 'Samsung', 'Weebur']);

const newProductSchema = z.object({
  title: z.string().min(1, '상품명을 입력해주세요.').max(15, '상품명은 15자 이내로 입력해주세요.'),
  description: z.string().optional(),
  price: z.preprocess((val) => Number(val), z.number().min(1000, '최소 1000원 이상 입력해주세요.')),
  discountPercentage: z.preprocess((val) => Number(val), z.number().min(0).max(100)).optional(),
  brand: brandType.optional(),
});

export default function AddProductForm() {
  const originalPriceRef = useRef<number>(0);

  const form = useForm({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      discountPercentage: '',
      brand: 'Apple',
    },
  });

  const price = form.watch('price') as number;
  const discountPercentage = form.watch('discountPercentage') as number;

  const onSubmit = (data: z.infer<typeof newProductSchema>) => {
    startTransition(() => {
      createProduct(data);
    });
  };

  const applyDiscount = () => {
    const original = originalPriceRef.current;

    if (!original) return;

    const finalPrice = calculateDiscountedPrice(original, discountPercentage);
    form.setValue('price', finalPrice, { shouldValidate: true });
  };

  const handlePriceBlur = () => {
    if (!price) {
      originalPriceRef.current = 0;
      form.setError('price', {
        type: 'manual',
        message: '가격을 입력해주세요.',
      });
      form.setValue('discountPercentage', '');
      return;
    }

    originalPriceRef.current = price;
    form.clearErrors('discountPercentage');
  };

  const handleDiscountBlur = () => {
    const hasPrice = price && price >= 1000;

    if (!hasPrice) {
      form.setError('discountPercentage', {
        type: 'manual',
        message: '가격을 먼저 입력해주세요.',
      });
      return;
    }

    applyDiscount();
  };

  useEffect(() => {
    if (price > 0 && originalPriceRef.current === 0) {
      originalPriceRef.current = price;
    }

    applyDiscount();
  }, [discountPercentage]);

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>상품명</FormLabel>
              <FormControl>
                <Input placeholder="상품명을 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>상품 설명</FormLabel>
              <FormControl>
                <Input placeholder="상품 설명을 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>가격</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="가격을 입력해주세요."
                  {...field}
                  value={field.value as number}
                  onBlur={() => {
                    field.onBlur();
                    handlePriceBlur();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discountPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>할인율</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="할인율을 입력해주세요."
                  {...field}
                  value={field.value as number}
                  onBlur={() => {
                    field.onBlur();
                    handleDiscountBlur();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>brand</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  {brandType.options.map((option) => (
                    <SelectItem value={option} key={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit" variant="secondary" className="cursor-pointer">
          상품 등록
        </Button>
      </form>
    </Form>
  );
}
