'use client';

import * as React from 'react';
import { ChartBarStacked, Command, LayoutDashboard, MapPin, MessageCircle, Package, PackagePlus, Users } from 'lucide-react';

import { NavSections } from '@/app/admin/components/nav-sections';
import { NavUser } from '@/app/admin/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Link from 'next/link';

const data = {
  user: { name: 'user', email: 'user@gmail.com', avatar: '/avatars/shadcn.jpg' },
  sections: [
    { name: 'Dashboard', url: '/admin', icon: LayoutDashboard },
    { name: 'Products', url: '/admin/products', icon: Package },
    { name: 'Categories', url: '/admin/categories', icon: ChartBarStacked },
    { name: 'Locations', url: '/admin/locations', icon: MapPin },
    { name: 'Users', url: '/admin/users', icon: Users },
    { name: 'Reviews', url: '/admin/reviews', icon: MessageCircle },
    { name: 'Orders', url: '/admin/orders', icon: PackagePlus },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className='top-[--header-height] !h-[calc(100svh-var(--header-height))]' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href='/'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  <Command className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>R10S Pvt Ltd</span>
                  <span className='truncate text-xs'>Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavSections projects={data.sections} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
