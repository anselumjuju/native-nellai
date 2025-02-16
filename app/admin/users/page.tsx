import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { handleRequest } from '@/lib/serverActions';
import Link from 'next/link';

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
    <div className='pt-20 px-2 md:px-7 flex flex-1 flex-col items-center justify-start gap-4'>
      <h1 className='text-lg font-semibold'>Users</h1>
      <div className='w-full max-w-screen-xl overflow-hidden rounded-lg border border-border bg-background'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead>pic</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className='hidden md:table-cell'>Email</TableHead>
              <TableHead className='hidden lg:table-cell'>Phone</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user: { _id: string; name: string; email: string; phone: string; role: string }) => {
              return (
                <TableRow key={user._id} className='hover:bg-transparent *:font-medium'>
                  <TableCell>{user.name}</TableCell>
                  <TableCell className='hidden md:table-cell'>{user.email}</TableCell>
                  <TableCell className='hidden lg:table-cell'>{user.phone}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Link href={`/admin/users/${user._id}`}>View</Link>
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
