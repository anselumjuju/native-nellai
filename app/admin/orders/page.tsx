import Link from 'next/link';

const OrdersPage = () => {
  return (
    <div className='flex flex-1 items-center justify-center flex-col gap-4'>
      <p className='text-2xl font-semibold'>All Orders</p>
      <Link href='/admin/orders/1'>Order 1</Link>
    </div>
  );
};

export default OrdersPage;
