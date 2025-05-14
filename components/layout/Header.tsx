'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import useUserStore from '@/store/userStore';
import Sidebar from '@/components/layout/Sidebar';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { role, cart } = useUserStore();
  const pathName = usePathname();

  if (pathName.includes('admin')) return null;

  return (
    <div className='w-full px-3 md:px-5 shadow-md shadow-neutral-100'>
      <header className='w-full max-w-screen-2xl mx-auto py-4 flex items-center justify-between gap-4'>
        <Link href={'/'} className='w-max h-12'>
          <Image src={'/images/logo-v.webp'} alt='logo' width={100} height={100} className='w-max h-full object-cover' unoptimized priority />
        </Link>
        <nav className='hidden lg:flex items-center gap-4 *:text-foreground'>
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
        <div className='flex items-center gap-6'>
          <Link href={'/settings/cart'} className='size-6 relative cursor-pointer'>
            {cart.length > 0 && <p className='text-sm rounded-full absolute -top-2 -right-2'>{cart.length > 10 ? '9+' : cart.length}</p>}
            <ShoppingCart className='size-full' />
          </Link>
          <Sidebar />
        </div>
      </header>
    </div>
  );
};

export default Header;
