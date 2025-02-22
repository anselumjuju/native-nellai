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
import { uploadImage } from '@/lib/uploadImage';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const formSchema = z
  .object({
    name: z.string().min(1, 'Product Name is required'),
    caption: z.string().min(1, 'Short Caption is required'),
    mainImage: z.any().refine((file) => file?.length > 0, 'Main Image is required'),
    description: z.string().min(1, 'Product Description is required'),
    about: z.string().min(1, 'About section is required'),
    quantity: z.enum(['1/2kg', '1kg', '2kg', '1ltr', '2ltr', '1pc', '2pc'], {
      errorMap: () => ({ message: 'Invalid quantity selected' }),
    }),
    stock: z.enum(['available', 'unavailable'], {
      errorMap: () => ({ message: 'Invalid stock status' }),
    }),
    categoryId: z.string().min(1, 'Category is required'),
    locationId: z.string().min(1, 'Location is required'),
    originalPrice: z.preprocess((val) => Number(val), z.number().positive('Original Price must be greater than zero')),
    discountPrice: z.preprocess((val) => Number(val), z.number().nonnegative('Discount Price cannot be negative')).optional(),
    isBanner: z.boolean().optional(),
    bannerImage: z.any().optional(),
  })
  .refine(
    (data) => {
      return !data.isBanner || (data.isBanner && data.bannerImage);
    },
    {
      message: 'Banner image is required.',
      path: ['bannerImage'],
    }
  );

interface ProductFormProps {
  product?: z.infer<typeof formSchema>;
  productId?: string;
}

const ProductForm = ({ product, productId }: ProductFormProps) => {
  const router = useRouter();
  const [locations, setLocations] = useState<{ _id: string; name: string }[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      name: product?.name || '',
      caption: product?.caption || '',
      mainImage: null,
      description: product?.description || '',
      about: product?.about || '',
      quantity: product?.quantity || '',
      stock: product?.stock || '',
      categoryId: product?.categoryId || '',
      locationId: product?.locationId || '',
      originalPrice: product?.originalPrice || '',
      discountPrice: product?.discountPrice || '',
      isBanner: product?.isBanner || false,
      bannerImage: null,
    },
  });

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    toast
      .promise(
        async () => {
          const formData = new FormData();
          formData.append('name', data.name);
          formData.append('mainImage', await uploadImage(data.mainImage[0]));
          formData.append('caption', data.caption);
          formData.append('description', data.description);
          formData.append('about', data.about);
          formData.append('quantity', data.quantity);
          formData.append('stock', data.stock);
          formData.append('categoryId', data.categoryId);
          formData.append('locationId', data.locationId);
          formData.append('originalPrice', data.originalPrice.toString());
          formData.append('discountPrice', data.discountPrice.toString());
          formData.append('isBanner', data.isBanner.toString());
          if (data.bannerImage) formData.append('bannerImage', await uploadImage(data.bannerImage[0]));
          if (!productId) {
            await handleRequest({ endpoint: 'products', method: 'POST', data: formData });
          } else {
            await handleRequest({ endpoint: 'products', method: 'PATCH', data: formData, id: productId });
          }
        },
        {
          loading: !productId ? 'Adding product...' : 'Updating product...',
          success: () => {
            toast.success(!productId ? 'Product added successfully' : 'Product updated successfully');
            router.push('/admin/products');
          },
          error: !productId ? 'Failed to add product' : 'Failed to update product',
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full flex flex-col gap-8'>
      {/* Product Name */}
      <div className='grid lg:grid-cols-2 gap-x-4 gap-y-8'>
        <div className='space-y-3'>
          <Label className='text-sm font-semibold'>
            Product Name <span className='text-destructive'>*</span>
          </Label>
          <Input {...form.register('name')} placeholder='Product Name' type='text' />
          {form.formState.errors.name && <p className='text-xs text-red-700'>{form.formState.errors.name.message}</p>}
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
        <Textarea {...form.register('description')} id='description' placeholder='Product Description' className='h-14 max-h-32 resize-y' />
        {form.formState.errors.description && <p className='text-xs text-red-700'>{form.formState.errors.description.message}</p>}
      </div>

      {/* About */}
      <div className='space-y-3'>
        <Label className='text-sm font-semibold'>
          About <span className='text-destructive text-base'>*</span>
        </Label>
        <Textarea {...form.register('about')} id='about' placeholder='Explain about the product' className='h-24 max-h-52 resize-y' />
        {form.formState.errors.about && <p className='text-xs text-red-700'>{form.formState.errors.about.message}</p>}
      </div>

      {/* Quantity & Stock Selection */}
      <div className='grid lg:grid-cols-2 gap-x-4 gap-y-8'>
        <div className='space-y-3'>
          <Label>
            Quantity <span className='text-destructive'>*</span>
          </Label>
          <Controller
            control={form.control}
            name='quantity'
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
          {form.formState.errors.quantity && <p className='text-xs text-red-700'>{form.formState.errors.quantity.message}</p>}
        </div>
        <div className='space-y-3'>
          <Label>
            Stock <span className='text-destructive'>*</span>
          </Label>
          <Controller
            control={form.control}
            name='stock'
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
          {form.formState.errors.stock && <p className='text-xs text-red-700'>{form.formState.errors.stock.message}</p>}
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
            name='categoryId'
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder='Select Category' />
                </SelectTrigger>
                <SelectContent>
                  {categories.length < 1 ? (
                    <SelectItem value='0' disabled>
                      No categories found
                    </SelectItem>
                  ) : (
                    categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.categoryId && <p className='text-xs text-red-700'>{form.formState.errors.categoryId.message}</p>}
        </div>
        <div className='space-y-3'>
          <Label>
            Location <span className='text-destructive'>*</span>
          </Label>
          <Controller
            control={form.control}
            name='locationId'
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder='Select Location' />
                </SelectTrigger>
                <SelectContent>
                  {locations.length < 1 ? (
                    <SelectItem value='0' disabled>
                      No Locations found
                    </SelectItem>
                  ) : (
                    locations.map((location) => (
                      <SelectItem key={location._id} value={location._id}>
                        {location.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.locationId && <p className='text-xs text-red-700'>{form.formState.errors.locationId.message}</p>}
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
              checked={form.watch('isBanner')}
              onCheckedChange={(checked) => form.setValue('isBanner', checked)}
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
        {!productId ? (isLoading ? 'Adding Product...' : 'Add Product') : isLoading ? 'Updating Product...' : 'Update Product'}
      </Button>
    </form>
  );
};

export default ProductForm;
