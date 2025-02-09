import Link from 'next/link';

const UsersPage = () => {
  return (
    <div className='flex flex-1 items-center justify-center flex-col gap-4'>
      <p className='text-2xl font-semibold'>All Users</p>
      <Link href='/admin/users/1'>User 1</Link>
    </div>
  );
};

export default UsersPage;
