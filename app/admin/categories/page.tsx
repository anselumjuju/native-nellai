import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Ellipsis } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import CategoriesModal from '../components/categories-modal';
import { format } from 'date-fns';
import DeleteButton from '../components/delete-button';

const CategoriesPage = async () => {
  const { categories } = await (await fetch(`${process.env.BASE_URL}/api/categories`)).json();

  return (
    <div className='pt-10 px-2 md:px-7 flex flex-1 flex-col items-center justify-start gap-4'>
      <div className='w-full max-w-screen-xl flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>Categories</h1>
        <CategoriesModal />
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size='icon' variant='ghost' className='rounded-full shadow-none' aria-label='Open edit menu'>
                        <Ellipsis size={16} strokeWidth={2} aria-hidden='true' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <DeleteButton id={category._id} endpoint='category' />
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
