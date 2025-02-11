import { format } from 'date-fns';
import { Ellipsis } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DeleteButton from '../components/delete-button';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { Dialog, DialogContent, DialogTrigger, DialogHeader } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import UpdateCategoriesModal from './updateCategoriesModal';
import AddCategoriesModal from './addCategoriesModal';

const CategoriesPage = async () => {
  const { categories } = await (await fetch(`${process.env.BASE_URL}/api/categories`)).json();

  return (
    <div className='pt-10 px-2 md:px-7 flex flex-1 flex-col items-center justify-start gap-4'>
      <div className='w-full max-w-screen-xl flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>Categories</h1>
        <AddCategoriesModal />
      </div>
      <div className='w-full max-w-screen-xl overflow-hidden rounded-lg border border-border bg-background'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className='hidden lg:table-cell'>Slug</TableHead>
              <TableHead className='hidden md:table-cell'>Created At</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category: any) => (
              <TableRow key={category.id}>
                <TableCell className='font-medium'>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell className='hidden lg:table-cell'>{category.slug}</TableCell>
                <TableCell className='hidden md:table-cell'>{format(new Date(category.createdAt), 'PP')}</TableCell>
                <TableCell className='text-right space-x-2 flex items-center justify-end'>
                  <Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size='icon' variant='ghost' className='rounded-full shadow-none' aria-label='Open edit menu'>
                          <Ellipsis size={16} strokeWidth={2} aria-hidden='true' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <DialogTrigger>
                              <button className='w-full text-left text-xs'>Update</button>
                            </DialogTrigger>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <DeleteButton id={category._id} endpoint='category' />
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                      <DialogHeader>Update Category</DialogHeader>
                      <UpdateCategoriesModal id={category._id} name={category.name} description={category.description} />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoriesPage;
