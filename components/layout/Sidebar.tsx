'use client';

import { ChartColumnStacked, Heart, LayoutDashboard, MapPinHouse, Menu, Package, PackageOpen, ShoppingCart, UserPen, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import Image from 'next/image';
import useUserStore from '@/store/userStore';
import { Separator } from '@/components/ui/separator';
import useAuthStore from '@/store/authStore';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const { name, profilePic, role } = useUserStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer direction='right' handleOnly={false} setBackgroundColorOnScale>
      <DrawerTrigger asChild>
        <Button variant='ghost'>
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className='w-2/3 md:w-1/2 max-w-[300px] h-dvh ml-auto rounded-none'>
        <DrawerTitle className='sr-only'>Menu</DrawerTitle>
        <DrawerDescription className='h-full'>
          <div className='w-full py-6 px-2 h-full flex flex-col justify-start gap-4'>
            <DrawerClose className='mb-3 px-5 flex items-end justify-end cursor-pointer'>
              <X />
            </DrawerClose>

            <div className='flex flex-col items-start justify-start gap-4 lg:hidden'>
              {[
                {
                  icon: Package,
                  text: 'Products',
                  url: '/products',
                },
                {
                  icon: ChartColumnStacked,
                  text: 'Categories',
                  url: '/categories',
                },
                {
                  icon: MapPinHouse,
                  text: 'Locations',
                  url: '/locations',
                },
              ].map((item, index) => {
                const Icon: any = item.icon;
                return (
                  <DrawerClose key={index} asChild>
                    <Link href={item.url} className='flex items-center gap-3 cursor-pointer'>
                      <Icon className='size-4' />
                      <p className='text-base text-neutral-950'>{item.text}</p>
                    </Link>
                  </DrawerClose>
                );
              })}
              <Separator />
            </div>

            <div className='flex flex-col items-start justify-start gap-4'>
              {[
                {
                  icon: UserPen,
                  text: 'My Profile',
                  url: '/settings',
                },
                {
                  icon: ShoppingCart,
                  text: 'Cart',
                  url: '/settings/cart',
                },
                {
                  icon: Heart,
                  text: 'Wishlist',
                  url: '/settings/wishlist',
                },
                {
                  icon: PackageOpen,
                  text: 'Orders',
                  url: '/settings/orders',
                },
              ].map((item, index) => {
                const Icon: any = item.icon;
                return (
                  <DrawerClose key={index} asChild>
                    <Link href={isAuthenticated ? item.url : '/login'} className='flex items-center gap-3 cursor-pointer'>
                      <Icon className='size-4' />
                      <p className='text-base text-neutral-950'>{item.text}</p>
                    </Link>
                  </DrawerClose>
                );
              })}
              {role === 'admin' && (
                <DrawerClose asChild>
                  <Link href='/admin' className='flex items-center gap-3 cursor-pointer'>
                    <LayoutDashboard className='size-4' />
                    <p className='text-base text-neutral-950'>Dashboard</p>
                  </Link>
                </DrawerClose>
              )}
              <Separator />
            </div>

            <DrawerFooter className='p-0'>
              {isAuthenticated ? (
                <div className='mt-auto space-y-4'>
                  <Separator />
                  <div className='flex items-center gap-2'>
                    <Image src={profilePic || 'https://placehold.co/400/png'} alt='Profile' width={256} height={256} className='w-12 aspect-square object-cover rounded-full' />
                    <h1 className='text-lg text-neutral-950'>{name || 'User'}</h1>
                  </div>

                  <DrawerClose asChild>
                    <Button variant={'default'} onClick={() => handleSignOut()} className={'w-full'} size={'lg'}>
                      Logout
                    </Button>
                  </DrawerClose>
                </div>
              ) : (
                <DrawerClose asChild>
                  <Button variant={'default'} onClick={() => router.push('/login')} className={'w-full'} size={'lg'}>
                    Login
                  </Button>
                </DrawerClose>
              )}
            </DrawerFooter>
          </div>
        </DrawerDescription>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
