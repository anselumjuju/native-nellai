'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import toast from 'react-hot-toast';
import useUserStore from '@/store/userStore';
import useAuthStore from '@/store/authStore';

const Header = () => {
  const router = useRouter();
  const { name, profilePic, role } = useUserStore();
  const { isAuthenticated } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully');
    } catch (error) {
      console.log(error);
    }
  };

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
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex items-center gap-2'>
              <h1>{name || 'User'}</h1>
              <Image src={profilePic || 'https://placehold.co/400/png'} alt='Profile' width={256} height={256} className='w-8 aspect-square object-cover rounded-full' />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <button onClick={() => router.push('/setup')} className='w-full text-left text-xs'>
                Edit Profile
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button onClick={() => router.push('/settings')} className='w-full text-left text-xs'>
                Settings
              </button>
            </DropdownMenuItem>
            {role === 'admin' && (
              <DropdownMenuItem>
                <button onClick={() => router.push('/admin')} className='w-full text-left text-xs'>
                  Admin Panel
                </button>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <button onClick={handleSignOut} className='w-full text-left text-xs'>
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => router.push('/login')}>Login</Button>
      )}
    </header>
  );
};

export default Header;
