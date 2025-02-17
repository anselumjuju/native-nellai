import Header from '@/components/layout/Header';

export default async function Home() {
  return (
    <div className='w-full px-3'>
      <div className='border-b shadow-sm'>
        <Header />
      </div>
    </div>
  );
}
