import BestSeller from '@/components/layout/home/BestSeller';
import Categories from '@/components/layout/home/Categories';
import Illustration1 from '@/components/layout/home/Illustration1';
import Illustration2 from '@/components/layout/home/Illustration2';
import Illustration3 from '@/components/layout/home/Illustration3';
import Locations from '@/components/layout/home/Locations';
import TodaysBest from '@/components/layout/home/TodaysBest';

export default async function Home() {
  return (
    <div className='w-full space-y-20 py-10'>
      <div className='bg-gradient-to-b from-[#FFFFFF] to-[#fbffea] space-y-20'>
        <Illustration1 />
        <Categories />
        <BestSeller />
        <Illustration2 />
      </div>
      <TodaysBest />
      <Locations />
      <Illustration3 />
    </div>
  );
}
