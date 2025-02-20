import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AddCategoriesModal from './ui/add';
import { handleRequest } from '@/lib/serverActions';
import ActionsDropDown from './ui/actionsDropdown';
import { Button } from '@/components/ui/button';

const CategoriesPage = async () => {
  const { data, success } = await handleRequest({ endpoint: 'categories' });

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
        <h1 className='text-5xl font-bold'>No Categories found!</h1>
        <p className='w-[50ch] text-sm font-normal text-muted-foreground'>Looks like there are no categories yet. But don&apos;t worry, you can create one in just a click!</p>
        <AddCategoriesModal
          triggerButton={
            <Button variant='default' className='mt-0'>
              New Category
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className='py-20 px-2 md:px-7 flex flex-1 flex-col items-center justify-start gap-4'>
      <div className='w-full max-w-screen-xl flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>Categories</h1>
        <AddCategoriesModal />
      </div>
      <div className='w-full max-w-screen-xl overflow-hidden rounded-lg border border-border bg-background'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead>Name</TableHead>
              <TableHead className='hidden xl:table-cell'>Description</TableHead>
              <TableHead className='hidden sm:table-cell'>Slug</TableHead>
              <TableHead className='hidden lg:table-cell'>Created At</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((category: { _id: string; name: string; description: string; slug: string; createdAt: Date }) => (
                <TableRow key={category._id}>
                  <TableCell className='font-medium'>{category.name}</TableCell>
                  <TableCell className='hidden xl:table-cell max-w-[30ch] pe-10'>{category.description}</TableCell>
                  <TableCell className='hidden sm:table-cell'>{category.slug}</TableCell>
                  <TableCell className='hidden lg:table-cell'>{format(new Date(category.createdAt), 'PP')}</TableCell>
                  <TableCell className='text-right space-x-2 flex items-center justify-end'>
                    <ActionsDropDown {...category} />
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
