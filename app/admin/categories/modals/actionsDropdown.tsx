'use client';

import { Ellipsis } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { Dialog, DialogContent, DialogTrigger, DialogHeader } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import DeleteButton from '../../ui/buttons/delete-button';
import UpdateCategoriesModal from './update';
import { useState } from 'react';

const ActionsDropDown = (category: { _id: string; name: string; description: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size='icon' variant='ghost' className='rounded-full shadow-none' aria-label='Open edit menu'>
            <Ellipsis size={16} strokeWidth={2} aria-hidden='true' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <DialogTrigger className='w-full'>
                <button className='w-full text-left text-xs'>Update</button>
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteButton id={category._id} endpoint='categories' />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>Update Category</DialogHeader>
        <UpdateCategoriesModal id={category._id} name={category.name} description={category.description} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default ActionsDropDown;
