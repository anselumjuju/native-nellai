'use client';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { handleRequest } from '@/lib/serverActions';

export const formSchema = z.object({
  productName: z.string().min(1, 'Product Name is required'),
  caption: z.string().min(1, 'Short Caption is required'),
  mainImage: z.any().refine((file) => file?.length > 0, 'Main Image is required'),
  productDescription: z.string().min(1, 'Product Description is required'),
  productAbout: z.string().min(1, 'About section is required'),
  productQuantity: z.enum(['1/2kg', '1kg', '2kg', '1ltr', '2ltr', '1pc', '2pc'], {
    errorMap: () => ({ message: 'Invalid quantity selected' }),
  }),
  productStock: z.enum(['available', 'unavailable'], {
    errorMap: () => ({ message: 'Invalid stock status' }),
  }),
  productCategory: z.string().min(1, 'Category is required'),
  productLocation: z.string().min(1, 'Location is required'),
  originalPrice: z.preprocess((val) => Number(val), z.number().positive('Original Price must be greater than zero')),
  discountPrice: z.preprocess((val) => Number(val), z.number().nonnegative('Discount Price cannot be negative')).optional(),
  isBanner: z.boolean().optional(),
  bannerImage: z.any().optional(),
});

interface ProductFormProps {
  product?: z.infer<typeof formSchema>;
  productId?: string;
}

const ProductForm = ({ product, productId }: ProductFormProps) => {
  const [locations, setLocations] = useState<{ _id: string; name: string }[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    (async () => {
      const { data: categories } = await handleRequest({ endpoint: 'categories' });
      const { data: locations } = await handleRequest({ endpoint: 'locations' });

      setCategories(categories);
      setLocations(locations);
    })();
  }, []);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: 'Test',
      caption: 'Test Caption',
      mainImage: null,
      productDescription: 'Test Description',
      productAbout: 'Test About',
      productQuantity: '1/2kg',
      productStock: 'available',
      productCategory: '67aa3f16dd8959266cedc17f',
      productLocation: '67ab1196bb2c6d21d3051e51',
      originalPrice: '235',
      discountPrice: '',
      isBanner: false,
      bannerImage: null,
    },
  });

  const handleSubmit = async (data: any) => {
    console.log(product);
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full flex flex-col gap-8'>
      {/* Product Name */}
      <div className='grid lg:grid-cols-2 gap-x-4 gap-y-8'>
        <div className='space-y-3'>
          <Label className='text-sm font-semibold'>
            Product Name <span className='text-destructive'>*</span>
          </Label>
          <Input {...form.register('productName')} placeholder='Product Name' type='text' />
          {form.formState.errors.productName && <p className='text-xs text-red-700'>{form.formState.errors.productName.message}</p>}
        </div>

        <div className='space-y-3'>
          <Label className='text-sm font-semibold'>
            Short Caption <span className='text-destructive'>*</span>
          </Label>
          <Input {...form.register('caption')} placeholder='Short Caption' type='text' />
          {form.formState.errors.caption && <p className='text-xs text-red-700'>{form.formState.errors.caption.message}</p>}
        </div>
      </div>

      {/* Main Image */}
      <div className='space-y-3'>
        <Label>
          Main Image <span className='text-destructive'>*</span>
        </Label>
        <Input {...form.register('mainImage')} type='file' accept='image/*' />
        {form.formState.errors.mainImage && <p className='text-xs text-red-700'>{form.formState.errors.mainImage.message}</p>}
      </div>

      {/* Product Description */}
      <div className='space-y-3'>
        <Label>
          Product Description <span className='text-destructive'>*</span>
        </Label>
        <Input {...form.register('productDescription')} placeholder='Product Description' type='text' />
        {form.formState.errors.productDescription && <p className='text-xs text-red-700'>{form.formState.errors.productDescription.message}</p>}
      </div>

      {/* About */}
      <div className='space-y-3'>
        <Label className='text-sm font-semibold'>
          About <span className='text-destructive text-base'>*</span>
        </Label>
        <Textarea {...form.register('productAbout')} id='productAbout' placeholder='Explain about the product' className='max-h-52 resize-y' />
        {form.formState.errors.productAbout && <p className='text-xs text-red-700'>{form.formState.errors.productAbout.message}</p>}
      </div>

      {/* Quantity Selection */}
      <div className='grid lg:grid-cols-2 gap-x-4 gap-y-8'>
        <div className='space-y-3'>
          <Label>
            Quantity <span className='text-destructive'>*</span>
          </Label>
          <Controller
            control={form.control}
            name='productQuantity'
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder='Select Quantity' />
                </SelectTrigger>
                <SelectContent>
                  {['1/2kg', '1kg', '2kg', '1ltr', '2ltr', '1pc', '2pc'].map((quantity) => (
                    <SelectItem key={quantity} value={quantity}>
                      {quantity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.productQuantity && <p className='text-xs text-red-700'>{form.formState.errors.productQuantity.message}</p>}
        </div>
        <div className='space-y-3'>
          <Label>
            Stock <span className='text-destructive'>*</span>
          </Label>
          <Controller
            control={form.control}
            name='productStock'
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder='Select Stock' />
                </SelectTrigger>
                <SelectContent>
                  {['available', 'unavailable'].map((stock) => (
                    <SelectItem key={stock} value={stock} className='capitalize placeholder:capitalize'>
                      {stock}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.productStock && <p className='text-xs text-red-700'>{form.formState.errors.productStock.message}</p>}
        </div>
      </div>

      {/* Categories */}
      <div className='grid lg:grid-cols-2 gap-x-4 gap-y-8'>
        <div className='space-y-3'>
          <Label>
            Category <span className='text-destructive'>*</span>
          </Label>
          <Controller
            control={form.control}
            name='productCategory'
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder='Select Category' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.productCategory && <p className='text-xs text-red-700'>{form.formState.errors.productCategory.message}</p>}
        </div>
        <div className='space-y-3'>
          <Label>
            Location <span className='text-destructive'>*</span>
          </Label>
          <Controller
            control={form.control}
            name='productLocation'
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder='Select Location' />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location._id} value={location._id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.productLocation && <p className='text-xs text-red-700'>{form.formState.errors.productLocation.message}</p>}
        </div>
      </div>

      {/* Price */}
      <div className='grid lg:grid-cols-2 gap-x-4 gap-y-8'>
        <div className='space-y-3'>
          <Label>
            Original Price <span className='text-destructive'>*</span>
          </Label>
          <Input {...form.register('originalPrice')} placeholder='Original Price' type='number' />
          {form.formState.errors.originalPrice && <p className='text-xs text-red-700'>{form.formState.errors.originalPrice.message}</p>}
        </div>

        <div className='space-y-3'>
          <Label>Discount Price</Label>
          <Input {...form.register('discountPrice')} placeholder='Discount Price' type='number' />
          {form.formState.errors.discountPrice && <p className='text-xs text-red-700'>{form.formState.errors.discountPrice.message}</p>}
        </div>
      </div>

      {/* Banner */}
      <div className='space-y-3'>
        <Label>Banner Image</Label>
        <div className='grid lg:grid-cols-2 gap-x-4 gap-y-3'>
          <div className='relative flex w-full items-start justify-between gap-2 rounded-lg border border-input p-4 py-3 shadow-sm shadow-black/5'>
            <Switch
              id='isBanner'
              className='order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2'
              aria-describedby={'isBanner'}
              {...form.register('isBanner')}
            />
            <Label htmlFor='isBanner'>Feature as Banner</Label>
          </div>
          <Input
            {...form.register('bannerImage')}
            type='file'
            accept='image/*'
            className='h-full p-0 pe-3 file:px-3 file:h-full file:me-3 file:border-0 file:border-e file:border-muted file:py-2 text-primary text-xs'
          />
        </div>
        {form.formState.errors.bannerImage && <p className='text-xs text-red-700'>{form.formState.errors.bannerImage.message}</p>}
      </div>

      <Button type='submit' className='w-max self-end'>
        {!productId ? 'Add Product' : 'Update Product'}
      </Button>
    </form>
  );
};

export default ProductForm;
