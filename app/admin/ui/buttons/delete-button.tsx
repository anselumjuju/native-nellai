'use client';

import { handleRequest, HandleRequestProps, revalidate } from '@/lib/serverActions';
import { useTransition } from 'react';

const DeleteButton = ({ id, endpoint }: { id: string; endpoint: HandleRequestProps['endpoint'] }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      await handleRequest({ endpoint: endpoint, method: 'DELETE', id });
      revalidate(`/admin/${endpoint} + ${id && (endpoint! == 'orders' || endpoint == 'users' || endpoint == 'products') ? `/${id}` : ''}`);
    });
  };

  return (
    <button className='w-full text-left text-destructive' onClick={() => handleDelete()} disabled={isPending}>
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteButton;
