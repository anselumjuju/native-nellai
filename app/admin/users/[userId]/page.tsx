const UserPage = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const userId = (await params).userId;
  return (
    <div className='flex flex-1 items-center justify-center'>
      <p className='text-base font-semibold'>User {userId}</p>
    </div>
  );
};

export default UserPage;
