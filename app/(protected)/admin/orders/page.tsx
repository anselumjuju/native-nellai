import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { handleRequest } from '@/lib/serverActions';

const OrdersPage = async () => {
  const { data: orders, success: orderSuccess } = await handleRequest({ endpoint: 'reviews' });
  const { data: products, success: productSuccess } = await handleRequest({ endpoint: 'products' });
  const { data: users, success: userSuccess } = await handleRequest({ endpoint: 'users' });

  if (!orderSuccess || !productSuccess || !userSuccess) {
    return (
      <div className='w-full h-full flex items-center justify-center text-center'>
        <p>Something went wrong</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className='w-full h-full flex flex-col items-center justify-center text-center gap-6'>
        <h1 className='text-5xl font-bold'>No Orders Yet!</h1>
        <p className='w-[50ch] text-sm font-normal text-muted-foreground'>
          Looks like no orders have been placed yet. Once customers start ordering, you{`'`}ll see them listed here!
        </p>
      </div>
    );
  }

  return (
    <div className='pt-20 px-2 md:px-7 flex flex-1 flex-col items-center justify-start gap-4'>
      <h1 className='w-full max-w-screen-xl text-lg font-semibold'>Reviews</h1>
      <div className='w-full max-w-screen-xl overflow-hidden rounded-lg border border-border bg-background'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead>User Name</TableHead>
              <TableHead className='hidden lg:table-cell'>Products</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className='hidden md:table-cell'>Payment Status</TableHead>
              <TableHead className='text-right'>Delivery Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: { userId: string; items: { productId: string; quantity: number }[]; totalPrice: number; paymentStatus: string; status: string; _id: string }) => (
              <TableRow key={order._id}>
                <TableCell>{users.find((user: { _id: string; name: string }) => user._id === order.userId)?.name}</TableCell>
                <TableCell className='hidden lg:table-cell'>
                  {order.items.map((item) => (
                    <div key={item.productId}>
                      <p>
                        {products.find((product: { _id: string; name: string }) => product._id === item.productId)?.name} {`->`} {item.quantity}
                      </p>
                    </div>
                  ))}
                </TableCell>
                <TableCell>{order.totalPrice}</TableCell>
                <TableCell className='hidden md:table-cell'>{order.paymentStatus}</TableCell>
                <TableCell className='text-right'>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OrdersPage;
