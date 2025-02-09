interface UserPageProps {
  id: string;
}

const UserPage = async ({ params }: { params: UserPageProps }) => {
  return (
    <div className='flex flex-1 items-center justify-center'>
      <p className='text-base font-semibold'>User {params.id}</p>
    </div>
  );
};

export default UserPage;
