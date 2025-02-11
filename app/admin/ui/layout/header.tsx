'use client';

import { SidebarIcon } from 'lucide-react';
import { SearchForm } from '@/app/admin/ui/inputs/search-form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import ThemeToggle from '@/components/theme-toggler';

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className='fle sticky top-0 z-50 w-full items-center border-b bg-background'>
      <div className='flex h-[--header-height] w-full items-center gap-2 px-4'>
        <Button className='h-8 w-8' variant='ghost' size='icon' onClick={toggleSidebar}>
          <SidebarIcon />
        </Button>
        <Separator orientation='vertical' className='mr-2 h-4' />
        <h1 className='hidden md:block text-base font-semibold'>Admin Panel</h1>
        <SearchForm className='w-full sm:ml-auto sm:w-auto' />
        <ThemeToggle className='hidden md:flex' />
      </div>
    </header>
  );
}
