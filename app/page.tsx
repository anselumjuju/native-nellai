import Featured from '@/components/layout/Featured';
import HeaderSlider from '@/components/layout/HeaderSlider';
import Hero from '@/components/layout/Hero';
import Locations from '@/components/layout/Locations';

export default async function Home() {
  return (
    <div className='w-full max-w-screen-xl px-3 md:px-5 py-10 mx-auto space-y-20'>
      <HeaderSlider />
      <Hero />
      <Locations />
      <Featured />
    </div>
  );
}
