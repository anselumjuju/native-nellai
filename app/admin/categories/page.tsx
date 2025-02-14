import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AddCategoriesModal from './modals/add';
import { handleRequest } from '@/lib/serverActions';
import ActionsDropDown from './modals/actionsDropdown';

const CategoriesPage = async () => {
  const { data } = await handleRequest({ endpoint: 'categories' });

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
            {data &&
              data.map((category: { _id: string; name: string; description: string; slug: string; createdAt: Date }) => (
                <TableRow key={category._id}>
                  <TableCell className='font-medium'>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell className='hidden lg:table-cell'>{category.slug}</TableCell>
                  <TableCell className='hidden md:table-cell'>{format(new Date(category.createdAt), 'PP')}</TableCell>
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
