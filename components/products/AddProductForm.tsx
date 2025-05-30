'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { startTransition, useEffect } from 'react';
import { createProduct } from '@/app/products/new/actions/createProduct';

const formSchema = z.object({
  title: z.string().min(1).max(15, '상품명은 15자 이내로 입력해주세요.'),
  description: z.string().optional(),
  price: z.preprocess((val) => Number(val), z.number().min(1000)),
  discountPercentage: z.preprocess((val) => Number(val), z.number().min(0).max(100)),
  brand: z.string().optional(),
});

export default function AddProductForm() {
  const form = useForm({
    resolver: zodResolver(formSchema), // ✅ 여기서 Zod 스키마 연결
    defaultValues: {
      title: '',
      description: '',
      price: '',
      discountPercentage: '',
      brand: '',
    },
  });

  const price = form.watch('price') as number;
  const discountPercentage = form.watch('discountPercentage') as number;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    startTransition(() => {
      createProduct(data);
    });
  };

  useEffect(() => {
    if (discountPercentage && discountPercentage > 0 && price > 0) {
      const discounted = Math.floor(price * (1 - discountPercentage / 100));
      form.setValue('price', discounted, { shouldValidate: true });
    }
  }, [discountPercentage]);

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormDescription>description</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Price" {...field} value={field.value as number} />
              </FormControl>
              <FormDescription>Price</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discountPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>discountPercentage</FormLabel>
              <FormControl>
                <Input
                  disabled={!price}
                  type="number"
                  placeholder="discountPercentage"
                  {...field}
                  value={field.value as number}
                />
              </FormControl>
              <FormDescription>discountPercentage</FormDescription>
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
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white">
                  <SelectItem value="Apple">Apple</SelectItem>
                  <SelectItem value="Samsung">Samsung</SelectItem>
                  <SelectItem value="Weebur">Weebur</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit" variant="destructive">
          Submit
        </Button>
      </form>
    </Form>
  );
}
