'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useEffect, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateCategory } from '@/lib/serverActions';

const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
});

interface CategoryFormData {
  name: string;
  description: string;
}

const UpdateCategoriesModal = ({ id, name, description }: { id: string; name: string; description: string }) => {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  useEffect(() => {
    setValue('name', name);
    setValue('description', description);
  }, [description, name, setValue]);

  const handleUpdate = async (data: CategoryFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    startTransition(async () => {
      await updateCategory(id, formData);
    });
  };

  return (
    <form onSubmit={handleSubmit(handleUpdate)} className='space-y-4'>
      <div>
        <Label htmlFor='name'>Name</Label>
        <Input id='name' type='text' {...register('name')} placeholder='Category Name' />
        {errors.name && <p className='text-red-500 text-sm'>{String(errors.name.message)}</p>}
      </div>
      <div>
        <Label htmlFor='description'>Description</Label>
        <Input id='description' type='text' {...register('description')} placeholder='Description' />
        {errors.description && <p className='text-red-500 text-sm'>{String(errors.description.message)}</p>}
      </div>
      <Button type='submit' disabled={isPending}>
        {isPending ? 'Updaing...' : 'Update'}
      </Button>
    </form>
  );
};

export default UpdateCategoriesModal;
