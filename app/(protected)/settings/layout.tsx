import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className='w-full h-dvh flex items-start'>
        <div className='w-[--sidebar-width] h-full py-5 bg-neutral-400 flex flex-col items-start justify-start'>
          {['profile', 'cart', 'wishlist', 'orders'].map((item) => (
            <Link href={item === 'profile' ? `/settings` : `/settings/${item}`} className='px-5 py-2 hover:bg-neutral-200' key={item}>
              {item}
            </Link>
          ))}
        </div>
        <div className='w-full flex-1'>{children}</div>
      </div>
    </AuthGuard>
  );
}
