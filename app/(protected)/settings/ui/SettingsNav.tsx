'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import NavLink from 'next-navlink';
import { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

const SettingsNav = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <>
      {/* Nav for Mobiles */}
      <div className='w-full sm:hidden'>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant={'outline'} className='w-full text-right flex items-center justify-start relative capitalize' size={'lg'}>
              {path.includes('/settings/') ? path.replace('/settings/', '') : 'profile'}
              <ArrowDown className='size-6 text-xs absolute right-2 scale-75 text-muted-foreground' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={`min-w-[calc(100vw-24px-24px)]`}>
            {['profile', 'cart', 'wishlist', 'orders'].map((item) => (
              <DropdownMenuItem key={item}>
                <NavLink to={item === 'profile' ? `/settings` : `/settings/${item}`} className='w-full capitalize' onClick={() => setOpen(false)}>
                  {item}
                </NavLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Nav for Tablets */}
      <div className='min-w-60 w-auto hidden sm:flex flex-col items-start justify-start relative after:content-[""] after:absolute after:w-0.5 after:h-[200%] after:bg-muted-foreground/30 after:right-5 after:rounded-full'>
        {['profile', 'cart', 'wishlist', 'orders'].map((item) => (
          <NavLink
            to={item === 'profile' ? `/settings` : `/settings/${item}`}
            matchMode='exact'
            className='w-1/2 px-3 py-2 text-muted-foreground capitalize'
            activeClassName='text-primary font-medium'
            key={item}>
            {item}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default SettingsNav;
