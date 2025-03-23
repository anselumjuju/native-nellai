'use client';

import { CartesianGrid, XAxis, AreaChart, Area } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { DollarSign, List, ListPlus, Package, Plus, ShoppingBag, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { handleRequest } from '@/lib/serverActions';

interface IOrder {
  _id: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    _id: string;
  }[];
  totalPrice: number;
  status: string;
  paymentStatus: string;
  orderId: string;
  createdAt: string;
}

interface IUser {
  _id: string;
  uid: string;
  name: string;
  email: string;
  phone: string;
  profilePic: string;
  role: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  wishlist: string[];
  searchHistory: string[];
  orders: string[];
  cart: string[];
  createdAt: string;
  updatedAt: string;
}

interface IProduct {
  _id: string;
  name: string;
  mainImage: string;
  caption: string;
  description: string;
  about: string;
  quantity: string;
  stock: string;
  categoryId: string;
  locationId: string;
  originalPrice: number;
  discountPrice: number;
  isBanner: boolean;
  reviews: string[];
  createdAt: string;
  updatedAt: string;
  slug: string;
}

const statusOrder = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

const Admin = () => {
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [timeStamps, setTimeStamps] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: products, success: productSuccess } = await handleRequest({ endpoint: 'products' });
      const { data: orders, success: orderSuccess } = await handleRequest({ endpoint: 'orders' });
      const { data: users, success: userSuccess } = await handleRequest({ endpoint: 'users' });
      if (!productSuccess || !orderSuccess || !userSuccess) {
        return null;
      }
      setProducts(products);
      setOrders(orders);
      setUsers(users);
      setTimeStamps(() => {
        if (orders.length === 0) return [];

        const latestOrderDate = new Date(Math.max(...orders.map((order: IOrder) => new Date(order.createdAt).getTime())));

        const month = latestOrderDate.getMonth();
        const year = latestOrderDate.getFullYear();

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const dateCounts: Record<string, number> = {};

        for (let day = 1; day <= daysInMonth; day++) {
          const dateStr = new Date(year, month, day).toISOString().split('T')[0];
          dateCounts[dateStr] = 1;
        }

        orders.forEach((order: IOrder) => {
          const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
          if (dateCounts[orderDate]) {
            dateCounts[orderDate] += 1;
          }
        });

        return Object.entries(dateCounts).flatMap(([date, count]) => Array(count).fill(date));
      });
      setIsLoading(false);
    })();
  }, []);

  // Calculate chart data
  const processChartData = (timestamps: string[]) => {
    const counts: Record<string, number> = {};
    timestamps.forEach((timestamp) => {
      const date = new Date(timestamp).toISOString().split('T')[0];
      counts[date] = (counts[date] || 0) + 1;
    });
    return Object.entries(counts).map(([date, count]) => ({
      date,
      desktop: count,
    }));
  };
  const chartData = processChartData(timeStamps);
  const salesChartConfig = {
    desktop: {
      label: 'Sales',
      color: '#4F46E5',
    },
  } satisfies ChartConfig;

  // Calculate sales data from orders
  const productSales: Record<string, { orders: number; revenue: number }> = {};
  orders.forEach((order) => {
    order.items.forEach(({ productId, quantity }) => {
      const product = products.find((p) => p._id === productId);
      if (product) {
        if (!productSales[productId]) {
          productSales[productId] = { orders: 0, revenue: 0 };
        }
        productSales[productId].orders += quantity;
        productSales[productId].revenue += quantity * (product.discountPrice || product.originalPrice);
      }
    });
  });
  const sortedProducts = products
    .map((product) => ({
      ...product,
      orders: productSales[product._id]?.orders || 0,
      revenue: productSales[product._id]?.revenue || 0,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const newUsersThisMonth = users.filter((user) => {
    const createdAt = new Date(user.createdAt);
    return createdAt.getMonth() === currentMonth && createdAt.getFullYear() === currentYear;
  });
  const newOrdersThisMonth = orders.filter((order) => {
    const createdAt = new Date(order.createdAt);
    return createdAt.getMonth() === currentMonth && createdAt.getFullYear() === currentYear;
  });
  const revenueThisMonth = newOrdersThisMonth.reduce((total, order) => total + (order.totalPrice || 0), 0);

  if (isLoading) {
    return (
      <div className='w-full h-[90vh] flex flex-col items-center justify-center gap-4'>
        <p>Loading</p>
      </div>
    );
  }

  return (
    <div className='size-full max-w-screen-2xl mx-auto py-20 px-3 space-y-12'>
      {/* Overview Cards */}
      <div className='space-y-6'>
        <h1 className='text-2xl'>Admin Insights</h1>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2 border rounded-lg'>
          {[
            {
              title: 'Total Users',
              value: `${users.length} Users`,
              icon: <Users className='size-5' />,
              caption: newUsersThisMonth.length > 0 ? `${newUsersThisMonth.length} new users this month` : 'No new users this month',
            },
            {
              title: 'Total Orders',
              value: `${orders.length} Orders`,
              icon: <Package className='size-5' />,
              caption: newOrdersThisMonth.length > 0 ? `${newOrdersThisMonth.length} new orders this month` : 'No new orders this month',
            },
            {
              title: 'Total Revenue',
              value: `₹${orders.reduce((total, order) => total + (order.totalPrice || 0), 0).toLocaleString()}`,
              icon: <DollarSign className='size-5' />,
              caption: revenueThisMonth > 0 ? `₹${revenueThisMonth.toLocaleString()} generated this month` : 'No revenue generated this month',
            },
            {
              title: 'Total Products',
              value: `${products.length} Products`,
              icon: <ShoppingBag className='size-5' />,
              caption: 'Your products are ready for sales!',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className='w-full h-max flex flex-col items-start justify-center gap-4 px-5 py-6 border rounded-lg border-dashed hover:bg-secondary-foreground/10 duration-200 relative'>
              <div className='w-full flex items-end justify-between'>
                <h1 className='flex-1 text-sm font-semibold'>{item.title}</h1>
                {item.icon}
              </div>
              <div className='space-y-1'>
                <p className='text-xl md:text-2xl font-semibold'>{item.value}</p>
                <p className='text-xs text-muted-foreground'>{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sales Chart */}
      <div className='space-y-6'>
        <h1 className='text-2xl'>Sales</h1>
        <ChartContainer config={salesChartConfig} className='w-full h-[250px] lg:h-[450px] p-2 py-3 border rounded-lg'>
          <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey='date' axisLine={false} tickLine={false} tickMargin={8} tickFormatter={(date) => new Date(date).getDate().toString()} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area dataKey={'desktop'} type={'linear'} stroke='#4F46E5' fill='#4F46E5' fillOpacity={0.2} fillRule='nonzero' className='bg-purple-500' />
          </AreaChart>
        </ChartContainer>
      </div>

      {/* Recent Orders and Low Stock */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-12'>
        {/* Recent Orders */}
        <div className='space-y-6'>
          <h1 className='text-2xl'>Recent Orders</h1>
          <div className='w-full h-[308px] border rounded-lg no-scrollbar overflow-y-scroll'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className='text-right'>Date</TableHead>
                  <TableHead className='text-right'>Total</TableHead>
                  <TableHead className='text-right'>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders
                  .sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status))
                  .map((order, index) => (
                    <TableRow key={index} className='*:py-4' onClick={() => router.push('/admin/orders')}>
                      <TableCell className='cursor-pointer font-medium'>{users.find((user) => user._id === order.userId)?.name}</TableCell>
                      <TableCell className='cursor-pointer text-right'>{format(new Date(order.createdAt), 'PP')}</TableCell>
                      <TableCell className='cursor-pointer text-right'>{order.totalPrice}</TableCell>
                      <TableCell className='cursor-pointer text-right capitalize'>{order.status}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Low Stock */}
        <div className='space-y-6'>
          <h1 className='text-2xl'>Unavailable Products</h1>
          <div className='w-full h-[308px] border rounded-lg no-scrollbar overflow-y-scroll'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className='text-right'>Price</TableHead>
                  <TableHead className='text-right'>Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products
                  .sort((a) => (a.stock === 'unavailable' ? -1 : 1))
                  .map((product, index) => (
                    <TableRow key={index} className='*:py-4'>
                      <TableCell className='flex items-center gap-3'>{product.name}</TableCell>
                      <TableCell className='text-right'>{product.discountPrice || product.originalPrice}</TableCell>
                      <TableCell className={`text-sm text-right capitalize ${product.stock === 'unavailable' ? 'text-destructive' : ''}`}>{product.stock}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Quick Actions and Top Products */}
      <div className='w-full h-max grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-12'>
        {/* Quick Actions */}
        <div className='space-y-6 h-full flex flex-col justify-start'>
          <h1 className='text-2xl'>Quick Actions</h1>
          <div className='w-full h-full flex-1 flex flex-col justify-between gap-3'>
            {[
              {
                title: 'Add Product',
                icon: <Plus className='size-full' />,
                description: 'Add new products to your inventory',
                link: '/admin/products/new',
              },
              {
                title: 'View Orders',
                icon: <List className='size-full' />,
                description: 'View your recent orders',
                link: '/admin/orders',
              },
              {
                title: 'Manage Categories',
                icon: <ListPlus className='size-full' />,
                description: 'Manage your products categories',
                link: '/admin/categories',
              },
            ].map((item, index) => (
              <Button key={index} variant={'outline'} className='h-full py-5 flex flex-col items-start justify-center gap-1 relative' onClick={() => router.push(item.link)}>
                <p className='font-bold text-base'>{item.title}</p>
                <p className='text-sm text-muted-foreground'>{item.description}</p>
                <span className='size-5 absolute top-3 right-3'>{item.icon}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className='space-y-6'>
          <h1 className='text-2xl'>Top Products</h1>
          <div className='w-full h-[308px] border rounded-lg no-scrollbar overflow-y-scroll'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className='text-right'>Orders</TableHead>
                  <TableHead className='text-right'>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProducts
                  .filter((product) => product.orders > 0)
                  .map((product) => (
                    <TableRow key={product._id} className='*:py-4'>
                      <TableCell className='flex items-center gap-3'>
                        <Image src={product.mainImage} alt={product.name} className='w-10 h-10 rounded-md' width={40} height={40} />
                        {product.name}
                      </TableCell>
                      <TableCell className='text-right'>{product.orders}</TableCell>
                      <TableCell className='text-right font-medium'>{`₹${product.revenue.toLocaleString()}`}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
