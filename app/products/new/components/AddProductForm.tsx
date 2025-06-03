'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  productFormSchema,
  ProductFormValues,
  productRequestSchema,
} from '@/lib/features/products/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateProduct } from '@/lib/features/products/hooks/useCreateProduct';
import { useMemo } from 'react';
import { calculateDiscount } from '@/lib/features/products/utils';
import { Button, Form } from '@/components/ui';
import { FormInput, FormSelect } from '@/components/shared/ui';
import { brandOptions } from '@/lib/features/products/constants';

export default function AddProductForm() {
  const router = useRouter();
  const { mutate } = useCreateProduct();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      discountPercentage: '',
      brand: 'Apple',
    },
  });

  const price = form.watch('price');
  const discountPercentage = form.watch('discountPercentage');

  const discountedPrice = useMemo(() => {
    return calculateDiscount(Number(price), Number(discountPercentage));
  }, [price, discountPercentage]);

  const onSubmit = (data: ProductFormValues) => {
    const formattedData = productRequestSchema.safeParse({
      ...data,
      price: Number(data.price),
      discountPercentage:
        data.discountPercentage === '' ? undefined : Number(data.discountPercentage),
    });

    if (!formattedData.success) {
      alert('입력값이 유효하지 않습니다.');
      return;
    }

    mutate(formattedData.data, {
      onSuccess: () => {
        alert('상품이 성공적으로 등록되었습니다.');
        router.push('/products');
      },
      onError: (error) => {
        alert(`상품 등록에 실패했습니다: ${error.message}`);
      },
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          control={form.control}
          name="title"
          label={'상품명'}
          type="text"
          placeholder="상품명을 입력해주세요."
        />

        <FormInput
          control={form.control}
          name="description"
          label={'상품 설명'}
          type="text"
          placeholder="상품 설명을 입력해주세요."
        />

        <FormInput
          control={form.control}
          name="price"
          label={'가격'}
          type="number"
          placeholder="가격을 입력해주세요."
        />

        <FormInput
          control={form.control}
          name="discountPercentage"
          label={'할인율'}
          type="number"
          placeholder="할인율을 입력해주세요."
        />

        <FormSelect
          control={form.control}
          name="brand"
          label="브랜드"
          options={brandOptions}
          placeholder="브랜드를 선택하세요"
          className="w-[180px]"
        />

        {price && (
          <section>
            <p className="text-sm text-gray-600">최종 금액</p>
            <strong className="text-xl font-semibold">
              {discountedPrice.toLocaleString()} <span className="text-base">원</span>
            </strong>
          </section>
        )}

        <Button type="submit" variant="secondary" className="cursor-pointer">
          상품 등록
        </Button>
      </form>
    </Form>
  );
}
