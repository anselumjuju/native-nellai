'use client';

import { deleteCategory, deleteLocation } from '@/lib/serverActions';
import { useTransition } from 'react';

const DeleteButton = ({ id, endpoint }: { id: string; endpoint: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      switch (endpoint) {
        case 'category':
          await deleteCategory(id);
          break;
        case 'location':
          await deleteLocation(id);
          break;
      }
    });
  };

  return (
    <button className='text-destructive' onClick={() => handleDelete()} disabled={isPending}>
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteButton;
