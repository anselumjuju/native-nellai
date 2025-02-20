'use client';

import { handleRequest, HandleRequestProps, revalidate } from '@/lib/serverActions';
import { useTransition } from 'react';
import toast from 'react-hot-toast';

const DeleteButton = ({ id, endpoint }: { id: string; endpoint: HandleRequestProps['endpoint'] }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      toast.promise(
        async () => {
          await handleRequest({ endpoint: endpoint, method: 'DELETE', id });
          revalidate(`/admin/${endpoint} + ${id && (endpoint! == 'orders' || endpoint == 'users' || endpoint == 'products') ? `/${id}` : ''}`);
        },
        {
          loading: 'Deleting...',
          success: 'Deleted successfully',
          error: 'Failed to delete',
        }
      );
    });
  };

  return (
    <button className='w-full text-left text-red-500' onClick={() => handleDelete()} disabled={isPending}>
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteButton;
