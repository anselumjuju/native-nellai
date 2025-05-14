'use client';

import { ChartColumnStacked, Heart, House, LayoutDashboard, MapPinHouse, Menu, Package, PackageOpen, PanelRightClose, ShoppingCart, UserPen, X } from 'lucide-react';

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
import { usePathname, useRouter } from 'next/navigation';
import path from 'path';

const Sidebar = () => {
  const { name, profilePic, role } = useUserStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathName = usePathname();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const mainNavLinks = [
    {
      icon: House,
      text: 'Home',
      url: '/',
    },
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
  ];

  const accountNavLink = [
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
  ];

  return (
    <Drawer direction='right' handleOnly={false} setBackgroundColorOnScale>
      <DrawerTrigger asChild className='ml-0 cursor-pointer'>
        <Menu />
      </DrawerTrigger>
      <DrawerContent className='w-2/3 md:w-1/2 max-w-[350px] h-dvh ml-auto rounded-none'>
        <DrawerTitle className='sr-only'>Menu</DrawerTitle>
        <DrawerDescription className='h-full'>
          <div className='w-full py-8 px-4 h-full flex flex-col justify-start'>
            <div className='w-full mb-3 flex items-center justify-between'>
              <Link href={'/'} className='flex items-center gap-2'>
                <img src='/images/logo.webp' alt='NativeNellai' width={100} height={100} className='w-8 h-full object-cover' />
                <p className='text-lg font-medium text-neutral-950'>nativenellai.com</p>
              </Link>
              <DrawerClose className='cursor-pointer'>
                <PanelRightClose />
              </DrawerClose>
            </div>

            <Separator className='my-5 bg-neutral-200 lg:hidden' />

            <div className='flex flex-col items-start justify-start lg:hidden'>
              {mainNavLinks.map((item, index) => {
                const Icon: any = item.icon;
                return (
                  <DrawerClose key={index} asChild className={`w-full pl-4 py-4`}>
                    <Link
                      href={item.url}
                      className={`flex items-center gap-4 cursor-pointer rounded-md hover:bg-[#fdfff1] hover:scale-[101%] transition-all duration-200 ${
                        pathName === item.url ? 'bg-[#f9ffe1] text-neutral-800 font-semibold' : ''
                      }`}>
                      <Icon className='size-7' strokeWidth={1} />
                      <p className={`text-base font-normal`}>{item.text}</p>
                    </Link>
                  </DrawerClose>
                );
              })}
            </div>

            <Separator className='my-5 bg-neutral-200' />

            <div className='flex flex-col items-start justify-start'>
              <p className='text-orange-500 text-sm font-semibold tracking-wider uppercase'>Dashboard</p>
              {accountNavLink.map((item, index) => {
                const Icon: any = item.icon;
                return (
                  <DrawerClose key={index} asChild className={`w-full pl-4 py-4`}>
                    <Link
                      href={item.url}
                      className={`flex items-center gap-4 cursor-pointer rounded-md hover:bg-[#fdfff1] hover:scale-[101%] transition-all duration-200 ${
                        pathName === item.url ? 'bg-[#f9ffe1] text-neutral-800 font-semibold' : ''
                      }`}>
                      <Icon className='size-7' strokeWidth={1} />
                      <p className={`text-base`}>{item.text}</p>
                    </Link>
                  </DrawerClose>
                );
              })}
              {role === 'admin' && (
                <DrawerClose asChild className={`w-full pl-4 py-4`}>
                  <Link
                    href={'/admin'}
                    className={`flex items-center gap-4 cursor-pointer rounded-md hover:bg-[#fdfff1] hover:scale-[101%] transition-all duration-200 ${
                      pathName === '/admin' ? 'bg-[#f9ffe1] text-neutral-800 font-semibold' : ''
                    }`}>
                    <LayoutDashboard className='size-7' strokeWidth={1} />
                    <p className={`text-base ${pathName === '/admin' ? 'bg-[#fbffea] text-[#f0ffb2] font-semibold' : ''}`}>Dashboard</p>
                  </Link>
                </DrawerClose>
              )}

              <Separator className='my-5 bg-neutral-200' />
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
