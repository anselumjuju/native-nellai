interface OrderPageProps {
  id: string;
}

const OrderPage = async ({ params }: { params: OrderPageProps }) => {
  const id = (await params).id;
  return (
    <div className='flex flex-1 items-center justify-center'>
      <p className='text-base font-semibold'>Order id: {id}</p>
    </div>
  );
};

export default OrderPage;
