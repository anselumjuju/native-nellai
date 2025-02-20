'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useEffect, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { handleRequest, revalidate } from '@/lib/serverActions';
import { uploadImage } from '@/lib/uploadImage';

const locationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  image: z.instanceof(File).optional(),
});

interface LocationFormData {
  name: string;
  image?: File;
}

const UpdateLocationModal = ({ id, name, image, closeDialog }: { id: string; name: string; image: string; closeDialog: () => void }) => {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
  });

  useEffect(() => {
    setValue('name', name);
  }, [name, setValue]);

  const handleUpdate = async (data: LocationFormData) => {
    let imageUrl = image;
    if (data.image) {
      imageUrl = await uploadImage(data.image);
    }
    startTransition(async () => {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('image', imageUrl);
      await handleRequest({ endpoint: 'locations', method: 'PATCH', data: formData, id });
      revalidate('/admin/locations');
      closeDialog();
    });
  };

  return (
    <form onSubmit={handleSubmit(handleUpdate)} className='space-y-4'>
      <div>
        <Label htmlFor='name'>Name</Label>
        <Input id='name' type='text' {...register('name')} placeholder='Location Name' />
        {errors.name && <p className='text-red-500 text-sm'>{String(errors.name.message)}</p>}
      </div>
      <div>
        <Label htmlFor='image'>Image</Label>
        <Input id='image' type='file' accept='image/*' onChange={(e) => setValue('image', e.target.files?.[0] as File)} />
        {errors.image && <p className='text-red-500 text-sm'>{String(errors.image.message)}</p>}
      </div>
      <Button type='submit' disabled={isPending}>
        {isPending ? 'Updating...' : 'Update'}
      </Button>
    </form>
  );
};

export default UpdateLocationModal;
