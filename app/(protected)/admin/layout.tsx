import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './ui/layout/sidebar';
import { SiteHeader } from './ui/layout/header';
import AdminGuard from '@/components/AdminGuard';
import AuthGuard from '@/components/AuthGuard';

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthGuard>
      <AdminGuard>
        <div className='[--header-height:calc(theme(spacing.14))]'>
          <SidebarProvider className='flex flex-col'>
            <SiteHeader />
            <div className='flex flex-1'>
              <AppSidebar />
              <SidebarInset className='!min-h-[calc(100svh-var(--header-height))]'>{children}</SidebarInset>
            </div>
          </SidebarProvider>
        </div>
      </AdminGuard>
    </AuthGuard>
  );
}
