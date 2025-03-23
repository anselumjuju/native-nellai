'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { handleRequest, revalidate } from '@/lib/serverActions';
import { format } from 'date-fns';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

interface Order {
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

interface User {
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

interface Product {
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

const UpdateOrderModal = ({ order, users, products }: { order: Order; users: User[]; products: Product[] }) => {
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateOrder = async (e: FormEvent<HTMLFormElement>) => {
    toast.promise(
      async () => {
        e.preventDefault();
        setIsUpdating(true);
        const formData = new FormData();
        formData.append('status', selectedStatus);
        await handleRequest({ endpoint: 'orders', method: 'PATCH', id: order._id, data: formData });
      },
      {
        loading: 'Updating order details...',
        success: () => {
          revalidate('/admin/orders');
          setIsUpdating(false);
          return 'Order updated successfully';
        },
        error: () => {
          setIsUpdating(false);
          return 'Failed to update order';
        },
      },
      {
        id: 'update-order',
        position: 'top-center',
        duration: 5000,
      }
    );
  };

  const formatAddress = (address: { street: string; city: string; state: string; zipCode: string; country: string } | undefined): string => {
    if (!address) return '';
    return `${address.street}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`;
  };

  return (
    <form className='space-y-4' onSubmit={handleUpdateOrder}>
      <div className='space-y-2'>
        <Label htmlFor={'name'} className='text-muted-foreground'>
          Name
        </Label>
        <Input id={'name'} defaultValue={users.find((user) => user._id === order.userId)?.name} disabled className='text-primary' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor={'email'} className='text-muted-foreground'>
          Email
        </Label>
        <Input id={'email'} defaultValue={users.find((user) => user._id === order.userId)?.email} disabled className='text-primary' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor={'phone'} className='text-muted-foreground'>
          Phone
        </Label>
        <Input id={'phone'} defaultValue={users.find((user) => user._id === order.userId)?.phone} disabled className='text-primary' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='address' className='text-muted-foreground'>
          Address
        </Label>
        <Input
          id='address'
          defaultValue={users.find((user) => user._id === order.userId)?.address ? formatAddress(users.find((user) => user._id === order.userId)?.address) : ''}
          disabled
          className='text-primary'
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='products' className='text-muted-foreground'>
          Products
        </Label>
        <Textarea
          id='products'
          defaultValue={order.items.map((item) => `${products.find((product) => product._id === item.productId)?.name || 'Unknown Product'} -> ${item.quantity}`).join('\n')}
          disabled
          className='overflow-hidden text-primary resize-none'
          rows={order.items.length}
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor={'deliveryStatus'} className='text-muted-foreground'>
          Delivery Status
        </Label>
        <Select defaultValue={order.status} onValueChange={setSelectedStatus}>
          <SelectTrigger id={'deliveryStatus'} className='capitalize'>
            <SelectValue placeholder='Select Delivery Status' />
          </SelectTrigger>
          <SelectContent>
            {['pending', 'shipped', 'delivered', 'cancelled'].map((status) => (
              <SelectItem key={status} value={status} className='capitalize'>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className='text-xs text-muted-foreground pb-2'>Select the delivery status.</p>
      </div>
      <div className='space-y-2'>
        <Label htmlFor='paymentStatus' className='text-muted-foreground'>
          Payment Status
        </Label>
        <Input id='paymentStatus' defaultValue={order.paymentStatus} disabled className='text-primary capitalize' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor={'orderedOn'} className='text-muted-foreground'>
          Order Placed on
        </Label>
        <Input id={'orderedOn'} defaultValue={format(new Date(order.createdAt), 'PP')} disabled className='text-primary' />
      </div>

      <div className='pt-4 flex items-center justify-end'>
        <Button type='submit' disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update'}
        </Button>
      </div>
    </form>
  );
};

export default UpdateOrderModal;
