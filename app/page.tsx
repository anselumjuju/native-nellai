import Featured from '@/components/layout/Featured';
import Header from '@/components/layout/Header';
import HeaderSlider from '@/components/layout/HeaderSlider';
import Hero from '@/components/layout/Hero';
import Locations from '@/components/layout/Locations';

export default async function Home() {
  return (
    <div className='w-full px-3 md:px-5 pb-10'>
      <div className='border-b shadow-sm'>
        <Header />
      </div>
      <div className='max-w-screen-xl mx-auto space-y-20 pt-10'>
        <HeaderSlider />
        <Hero />
        <Locations />
        <Featured />
      </div>
    </div>
  );
}
