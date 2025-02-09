import ThemeToggle from '@/components/theme-toggler';

const Admin = () => {
  return (
    <div className='w-full flex items-center justify-between py-5 px-10'>
      <h1>Admin Page</h1>
      <ThemeToggle />
    </div>
  );
};

export default Admin;
