import AuthGuard from '@/components/AuthGuard';
import UserProfile from './ui/UserProfile';
import SettingsNav from './ui/SettingsNav';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className='w-full max-w-screen-lg mx-auto px-3 md:px-5 py-10 flex flex-col justify-start items-start gap-4'>
        <UserProfile />
        <div className='w-full py-5 flex flex-col sm:flex-row items-start justify-start gap-4'>
          <SettingsNav />
          <div className='w-full flex-1'>{children}</div>
        </div>
      </div>
    </AuthGuard>
  );
}
