'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { handleRequest, revalidate } from '@/lib/serverActions';
import { format } from 'date-fns';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const UpdateUserModal = ({ user }: { user: any }) => {
  const [selectedRole, setSelectedRole] = useState(user.role);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    const formData = new FormData();
    formData.append('role', selectedRole);
    const { success } = await handleRequest({ endpoint: 'users', method: 'PATCH', id: user._id, data: formData });
    if (success) {
      toast.success('User updated successfully');
      revalidate('/admin/users');
    } else {
      toast.error('Failed to update user');
    }
    setIsUpdating(false);
  };

  return (
    <form className='space-y-4' onSubmit={handleUpdateUser}>
      <div className='space-y-2'>
        <Label htmlFor={user.name} className='text-muted-foreground'>
          Name
        </Label>
        <Input id={user.name} defaultValue={user.name} disabled className='text-primary' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor={user.email} className='text-muted-foreground'>
          Email
        </Label>
        <Input id={user.email} defaultValue={user.email} disabled className='text-primary' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor={user.phone} className='text-muted-foreground'>
          Phone
        </Label>
        <Input id={user.phone} defaultValue={user.phone} disabled className='text-primary' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor={user.role} className='text-muted-foreground'>
          Role
        </Label>
        <Select defaultValue={user.role} onValueChange={setSelectedRole}>
          <SelectTrigger id={user.role}>
            <SelectValue placeholder='Select framework' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='user'>User</SelectItem>
            <SelectItem value='admin'>Admin</SelectItem>
          </SelectContent>
        </Select>
        <p className='text-xs text-muted-foreground pb-2'>Select a role to define the user&apos;s access and permissions.</p>
      </div>
      <div className='space-y-2'>
        <Label htmlFor={user.createdAt} className='text-muted-foreground'>
          Created At
        </Label>
        <Input id={user.createdAt} defaultValue={format(new Date(user.createdAt), 'PP')} disabled className='text-primary' />
      </div>
      <div className='pt-4 flex items-center justify-end'>
        <Button type='submit' disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update'}
        </Button>
      </div>
    </form>
  );
};

export default UpdateUserModal;
