import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { handleRequest } from '@/lib/serverActions';
import { Ellipsis } from 'lucide-react';
import Image from 'next/image';
import UpdateUserModal from './ui/update';

const UsersPage = async () => {
  const { data, success } = await handleRequest({ endpoint: 'users' });

  if (!success) {
    return (
      <div className='w-full h-full flex items-center justify-center text-center'>
        <p>Something went wrong</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className='w-full h-full flex flex-col items-center justify-center text-center gap-6'>
        <h1 className='text-5xl font-bold'>No Users Found!</h1>
        <p className='w-[50ch] text-sm font-normal text-muted-foreground'>Looks like there are no users yet. Once new users join, you{`'`}ll see them listed here!</p>
      </div>
    );
  }

  return (
    <div className='py-20 px-2 md:px-7 flex flex-1 flex-col items-center justify-start gap-4'>
      <h1 className='w-full max-w-screen-xl text-lg font-semibold'>Users</h1>
      <div className='w-full max-w-screen-xl overflow-hidden rounded-lg border border-border bg-background'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead className='hidden sm:table-cell'>User</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className='hidden lg:table-cell'>Email</TableHead>
              <TableHead className='hidden xl:table-cell'>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user: { _id: string; name: string; email: string; phone: string; role: string; profilePic: string }) => {
              return (
                <TableRow key={user._id} className='hover:bg-primary/10 *:font-medium'>
                  <TableCell className='hidden sm:table-cell'>
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Image
                            src={user.profilePic || 'https://placehold.co/400/png?text=No+Image'}
                            alt={user.name}
                            width={50}
                            height={50}
                            className='h-12 aspect-square rounded-sm object-cover'
                            unoptimized
                          />
                        </TooltipTrigger>
                        <TooltipContent className='p-1 bg-secondary'>
                          <div className='w-52 aspect-square rounded-md'>
                            <Image
                              className='w-full h-full object-cover'
                              src={user.profilePic || 'https://placehold.co/400/png?text=No+Image'}
                              width={120}
                              height={120}
                              alt='Content image'
                              unoptimized
                            />
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell className='hidden lg:table-cell'>{user.email}</TableCell>
                  <TableCell className='hidden xl:table-cell'>{user.phone || 'N/A'}</TableCell>
                  <TableCell className='capitalize'>{user.role}</TableCell>
                  <TableCell className='text-right'>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size='icon' variant='ghost' className='rounded-full shadow-none' aria-label='Open edit menu'>
                          <Ellipsis size={16} strokeWidth={2} aria-hidden='true' />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>Update User</DialogHeader>
                        <DialogTitle className='sr-only'>Update User</DialogTitle>
                        <DialogDescription className='sr-only'>Update User Role and Permissions</DialogDescription>
                        <UpdateUserModal user={user} />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersPage;
