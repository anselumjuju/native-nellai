const OrderPage = async ({ params }: { params: Promise<{ orderId: string }> }) => {
  const orderId = (await params).orderId;
  return (
    <div className='flex flex-1 items-center justify-center'>
      <p className='text-base font-semibold'>Order ID: {orderId}</p>
    </div>
  );
};

export default OrderPage;
