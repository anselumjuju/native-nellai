'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
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
          { link: '/', name: 'Shop' },
          { link: '/', name: 'About Us' },
          { link: '/', name: 'Contact' },
        ].map((item, index) => (
          <Button variant={'link'} key={index}>
            <Link href={item.link}>{item.name}</Link>
          </Button>
        ))}
      </nav>
      <Button onClick={() => router.push('/login')}>Login In</Button>
    </header>
  );
};

export default Header;
