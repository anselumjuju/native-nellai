import { handleRequest } from '@/lib/serverActions';
import SideBar from './ui/SideBar';

export default async function layout({ children }: { children: React.ReactNode }) {
  const { data: categories } = await handleRequest({ endpoint: 'categories' });
  return (
    <div className='w-full max-w-screen-2xl mx-auto px-3 md:px-5 py-10 flex flex-col md:flex-row items-start justify-start gap-4'>
      <SideBar categories={categories} />
      <div className='w-full flex-1'>{children}</div>
    </div>
  );
}
