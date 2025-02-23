'use client';

import { CartesianGrid, XAxis, AreaChart, Area } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { DollarSign, List, ListPlus, Package, Plus, ShoppingBag, Users } from 'lucide-react';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const timestamps = [
  '2025-02-19T08:42:13.822+00:00',
  '2025-02-19T12:15:45.200+00:00',
  '2025-02-19T18:30:22.100+00:00',
  '2025-02-18T09:10:05.500+00:00',
  '2025-02-18T15:45:30.822+00:00',
  '2025-02-17T07:20:11.822+00:00',
  '2025-02-17T19:42:59.100+00:00',
  '2025-02-16T10:32:48.000+00:00',
  '2025-02-16T14:22:13.822+00:00',
  '2025-02-15T05:50:30.100+00:00',
  '2025-02-15T22:15:18.822+00:00',
  '2025-02-14T13:05:45.500+00:00',
  '2025-02-14T23:58:22.822+00:00',
  '2025-02-13T16:20:59.822+00:00',
  '2025-02-13T22:10:33.100+00:00',
  '2025-02-12T08:30:22.822+00:00',
  '2025-02-12T11:45:50.500+00:00',
  '2025-02-11T09:15:11.822+00:00',
  '2025-02-11T17:42:45.100+00:00',
  '2025-02-10T14:32:30.822+00:00',
  '2025-02-10T18:22:55.100+00:00',
  '2025-02-09T10:10:05.822+00:00',
  '2025-02-09T22:45:30.100+00:00',
  '2025-02-08T06:50:45.822+00:00',
  '2025-02-08T20:58:22.100+00:00',
  '2025-02-07T12:15:10.822+00:00',
  '2025-02-07T19:30:50.100+00:00',
  '2025-02-06T15:42:22.822+00:00',
  '2025-02-06T23:10:33.100+00:00',
  '2025-02-05T11:05:45.822+00:00',
];

const orders = [
  {
    profilePic: 'https://placehold.co/400/png',
    name: 'Michael Smith',
    date: '2024-02-10',
    total: '₹5,200.00',
    status: 'Pending',
  },
  {
    profilePic: 'https://placehold.co/400/png',
    name: 'Alice Johnson',
    date: '2024-02-15',
    total: '₹8,750.00',
    status: 'Shipped',
  },
  {
    profilePic: 'https://placehold.co/400/png',
    name: 'James Williams',
    date: '2024-02-08',
    total: '₹7,999.00',
    status: 'Cancelled',
  },
  {
    profilePic: 'https://placehold.co/400/png',
    name: 'Emma Davis',
    date: '2024-02-12',
    total: '₹12,150.00',
    status: 'Delivered',
  },
  {
    profilePic: 'https://placehold.co/400/png',
    name: 'Sophia Martinez',
    date: '2024-02-18',
    total: '₹6,450.00',
    status: 'Shipped',
  },
];

const statusOrder = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

const products = [
  {
    image: 'https://placehold.co/400/png',
    name: 'Wireless Bluetooth Headphones',
    price: '₹2,499.00',
    stock: 'Available',
    orders: 320,
    revenue: 799680,
  },
  {
    image: 'https://placehold.co/400/png',
    name: 'Smartwatch Series 6',
    price: '₹14,999.00',
    stock: 'Unavailable',
    orders: 150,
    revenue: 2249850,
  },
  {
    image: 'https://placehold.co/400/png',
    name: 'Gaming Mechanical Keyboard',
    price: '₹3,750.00',
    stock: 'Available',
    orders: 180,
    revenue: 675000,
  },
  {
    image: 'https://placehold.co/400/png',
    name: '4K Ultra HD Smart TV',
    price: '₹39,999.00',
    stock: 'Unavailable',
    orders: 85,
    revenue: 3399915,
  },
  {
    image: 'https://placehold.co/400/png',
    name: 'Portable Bluetooth Speaker',
    price: '₹1,899.00',
    stock: 'Available',
    orders: 275,
    revenue: 522225,
  },
  {
    image: 'https://placehold.co/400/png',
    name: 'Wireless Earbuds Pro',
    price: '₹4,499.00',
    stock: 'Available',
    orders: 200,
    revenue: 899800,
  },
  {
    image: 'https://placehold.co/400/png',
    name: 'Laptop Backpack 15.6"',
    price: '₹1,250.00',
    stock: 'Unavailable',
    orders: 95,
    revenue: 118750,
  },
  {
    image: 'https://placehold.co/400/png',
    name: 'Adjustable Office Chair',
    price: '₹7,499.00',
    stock: 'Available',
    orders: 140,
    revenue: 1049860,
  },
  {
    image: 'https://placehold.co/400/png',
    name: 'External 1TB SSD',
    price: '₹9,999.00',
    stock: 'Available',
    orders: 175,
    revenue: 1749825,
  },
  {
    image: 'https://placehold.co/400/png',
    name: 'Smartphone Tripod Stand',
    price: '₹999.00',
    stock: 'Unavailable',
    orders: 110,
    revenue: 109890,
  },
];

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

const chartData = processChartData(timestamps);

const salesChartConfig = {
  desktop: {
    label: 'Sales',
    color: '#4F46E5',
  },
} satisfies ChartConfig;

const Admin = () => {
  const router = useRouter();

  return (
    <div className='size-full max-w-screen-2xl mx-auto py-20 px-3 space-y-12'>
      {/* Overview Cards */}
      <div className='space-y-6'>
        <h1 className='text-2xl'>Admin Insights</h1>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2 border rounded-lg'>
          {[
            {
              title: 'Total Users',
              value: '0 Users',
              icon: <Users className='size-5' />,
              caption: 'No new users this month',
            },
            {
              title: 'Total Orders',
              value: '0 Orders',
              icon: <Package className='size-5' />,
              caption: 'No new orders this month',
            },
            {
              title: 'Total Revenue',
              value: '₹0.00',
              icon: <DollarSign className='size-5' />,
              caption: 'No revenue generated yet',
            },
            {
              title: 'Total Earnings',
              value: '₹0.00',
              icon: <ShoppingBag className='size-5' />,
              caption: 'No earnings generated yet',
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
        <ChartContainer config={salesChartConfig} className='w-full h-[250px] lg:h-[400px] p-2 py-3 border rounded-lg'>
          <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey='date' axisLine={false} tickLine={false} tickMargin={8} tickFormatter={(date) => new Date(date).getDate().toString()} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area dataKey={'desktop'} type={'natural'} stroke='#4F46E5' fill='#4F46E5' fillOpacity={0.2} fillRule='nonzero' />
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
                    <>
                      <TableRow key={index} className='*:py-4'>
                        <TableCell className='font-medium'>{order.name}</TableCell>
                        <TableCell className='text-right'>{format(new Date(order.date), 'MMM dd, yyyy')}</TableCell>
                        <TableCell className='text-right'>{order.total}</TableCell>
                        <TableCell className='text-right'>{order.status}</TableCell>
                      </TableRow>
                    </>
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
                  .sort((a) => (a.stock === 'Unavailable' ? -1 : 1))
                  .map((product, index) => (
                    <TableRow key={index} className='*:py-4'>
                      <TableCell className='flex items-center gap-3'>{product.name}</TableCell>
                      <TableCell className='text-right'>{product.price}</TableCell>
                      <TableCell className={`text-sm text-right ${product.stock === 'Unavailable' ? 'text-destructive' : ''}`}>{product.stock}</TableCell>
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
                {products
                  .sort((a, b) => b.revenue - a.revenue)
                  .map((product, index) => (
                    <TableRow key={index} className='*:py-4'>
                      <TableCell className='flex items-center gap-3'>
                        <Image src={product.image} alt={product.name} className='w-10 h-10 rounded-md' width={40} height={40} />
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
      {/* Recent Product Reviews */}
    </div>
  );
};

export default Admin;
