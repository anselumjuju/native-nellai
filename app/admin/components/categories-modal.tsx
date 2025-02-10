'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useTransition } from 'react';
import { addCategory } from '@/lib/serverActions';

const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
});

const CategoriesModal = () => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    startTransition(async () => {
      await addCategory(formData);
      reset();
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant={'outline'}>
          <Plus /> Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
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

export default CategoriesModal;
