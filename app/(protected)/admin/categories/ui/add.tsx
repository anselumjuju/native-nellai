'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ReactNode, useState, useTransition } from 'react';
import { handleRequest, revalidate } from '@/lib/serverActions';
import toast from 'react-hot-toast';

const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
});

interface CategoryFormData {
  name: string;
  description: string;
}

const AddCategoriesModal = ({ triggerButton }: { triggerButton?: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (data: CategoryFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    startTransition(async () => {
      toast.promise(
        async () => {
          await handleRequest({ endpoint: 'categories', method: 'POST', data: formData });
          reset();
          setOpen(false);
          revalidate('/admin/categories');
        },
        {
          loading: 'Adding category...',
          success: 'Category added successfully',
          error: 'Failed to add category',
        }
      );
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant='outline'>
            <Plus className='mr-1 h-4 w-4' />
            Add Category
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add New Category</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
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
          <DialogFooter>
            <Button type='submit'>{isPending ? 'Submitting...' : 'Submit'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoriesModal;
