'use client';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { handleRequest } from '@/lib/serverActions';
import { ArrowDown } from 'lucide-react';
import NavLink from 'next-navlink';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const SideBar = () => {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [locations, setLocations] = useState<{ slug: string; name: string }[]>([]);

  useEffect(() => {
    (async () => {
      const { data: locations } = await handleRequest({ endpoint: 'locations' });
      setLocations(locations);
    })();
  }, []);

  return (
    <>
      {/* Nav for Mobiles */}
      <div className='w-full md:hidden'>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant={'outline'} className='w-full text-right flex items-center justify-start relative capitalize' size={'lg'}>
              {path.includes('/locations/') ? path.replace('/locations/', '') : 'All Locations'}
              <ArrowDown className='size-6 text-xs absolute right-2 scale-75 text-muted-foreground' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={`min-w-[calc(100vw-24px-24px)]`}>
            <DropdownMenuItem className='w-full capitalize'>
              <NavLink to={`/locations`} className='w-full capitalize' onClick={() => setOpen(false)}>
                All
              </NavLink>
            </DropdownMenuItem>
            {locations.map((item) => (
              <DropdownMenuItem key={item.slug}>
                <NavLink to={`/locations/${item.slug}`} className='w-full capitalize' onClick={() => setOpen(false)}>
                  {item.slug}
                </NavLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Nav for Tablets */}
      <div className='min-w-40 lg:min-w-52 w-auto hidden md:flex flex-col items-start justify-start after:content-[""] after:absolute after:w-0.5 after:h-[100%] after:bg-muted-foreground/30 after:right-5 after:rounded-full sticky top-10'>
        <NavLink to={`/locations`} matchMode='exact' className='w-full px-3 py-2 text-muted-foreground capitalize text-nowrap' activeClassName='text-primary font-medium'>
          All
        </NavLink>
        {locations.map((item) => (
          <NavLink
            to={`/locations/${item.slug}`}
            matchMode='exact'
            className='w-1/2 px-3 py-2 text-muted-foreground capitalize text-nowrap'
            activeClassName='text-primary font-medium'
            key={item.slug}>
            {item.name}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default SideBar;
