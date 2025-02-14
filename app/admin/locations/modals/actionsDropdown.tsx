'use client';

import { Ellipsis } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { Dialog, DialogContent, DialogTrigger, DialogHeader } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import DeleteButton from '../../ui/buttons/delete-button';
import { useState } from 'react';
import UpdateLocationModal from './update';

const ActionsDropDown = (location: { _id: string; name: string; image: string }) => {
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
                <button className='w-full text-left text-xs'>Edit</button>
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteButton id={location._id} endpoint='locations' />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>Update Category</DialogHeader>
        <UpdateLocationModal id={location._id} name={location.name} image={location.image} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default ActionsDropDown;
