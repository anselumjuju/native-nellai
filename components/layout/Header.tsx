'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import useUserStore from '@/store/userStore';
import Sidebar from '@/components/layout/Sidebar';
import { ShoppingCart } from 'lucide-react';

const Header = () => {
  const { role, cart } = useUserStore();

  return (
    <header className='w-full max-w-screen-2xl mx-auto py-4 flex items-center justify-between'>
      <div className='flex items-end justify-start cursor-pointer'>
        <p className='text-4xl font-bold text-[#ea580c] leading-[0.8]'>N</p>
        <div className='flex flex-col gap-0 *:leading-none text-sm'>
          <p>ative</p>
          <p>ellai</p>
        </div>
      </div>
      <nav className='hidden lg:flex items-center gap-8 *:text-foreground'>
        {[
          { link: '/', name: 'Home' },
          { link: '/products', name: 'Products' },
          { link: '/categories', name: 'Categories' },
        ].map((item, index) => (
          <Button variant={'link'} key={index}>
            <Link href={item.link}>{item.name}</Link>
          </Button>
        ))}
        {role === 'admin' && (
          <Button variant={'link'}>
            <Link href='/admin'>Dashboard</Link>
          </Button>
        )}
      </nav>
      <div className='flex items-center gap-2'>
        <Link href={'/settings/cart'} className='size-6 relative cursor-pointer'>
          {cart.length > 0 && <p className='text-sm rounded-full absolute -top-2 -right-2'>{cart.length > 10 ? '9+' : cart.length}</p>}
          <ShoppingCart className='size-full' />
        </Link>
        <Sidebar />
      </div>
    </header>
  );
};

export default Header;
