'use client';

import { handleRequest } from '@/lib/serverActions';
import { useTransition } from 'react';

const DeleteButton = ({ id, endpoint }: { id: string; endpoint: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      await handleRequest({ endpoint, method: 'DELETE', id });
    });
  };

  return (
    <button className='w-full text-left text-destructive' onClick={() => handleDelete()} disabled={isPending}>
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteButton;
