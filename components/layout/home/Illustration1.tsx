import PrimaryButton from '@/components/PrimaryButton';
import { Boxes } from 'lucide-react';
import Image from 'next/image';

const Illustration1 = () => {
  return (
    <div className='max-w-screen-2xl px-3 md:px-5 mx-auto'>
      <div className='h-[600px] md:h-[500px] bg-[#5f6704] rounded-lg relative overflow-hidden'>
        {/* Content */}
        <div className='pt-10 px-3 md:px-5 md:pt-0 w-full h-full relative z-10 flex flex-col items-start justify-start md:justify-center gap-2 text-white'>
          <div className='w-max bg-[#4e5500] p-2 pr-3 rounded-full flex items-center gap-3'>
            <Boxes className='size-6 p-0.5 md:p-1 bg-white text-[#5f6704] rounded-full' strokeWidth={1} />
            <p className='text-xs font-light tracking-wide'>A Taste of Our Soil. A Touch of Our Soul.</p>
          </div>
          <h1 className='text-3xl md:text-4xl lg:text-5xl tracking-normal font-bold text-white'>
            Authentic Products from <span className='text-orange-500'>Nellai</span>, <br className='hidden md:block' /> Delivered with Integrity
          </h1>
          <p className='max-w-[50ch] md:max-w-[45ch] text-sm'>
            We bring you groceries that reflect Nellai&apos;s native <span className='text-nowrap'>spirit-pure</span>, unprocessed, and sourced with integrity from trusted local
            makers.
          </p>
          <PrimaryButton text={'Explore Now'} className='w-max mt-5 md:mt-3' link={'/products'} />
        </div>

        {/* Bg */}
        <>
          <Image
            src={'/svg/abstract.svg'}
            alt='product'
            width={400}
            height={400}
            className='w-[500px] md:w-[600px] h-max object-cover absolute -top-[40%] -left-[40%] md:-left-[25%] xl:-left-[15%] z-0'
          />
          <Image
            src={'/svg/abstract.svg'}
            alt='product'
            width={400}
            height={400}
            className='w-[500px] md:w-[600px] h-max object-cover absolute -bottom-[30%] md:-bottom-[40%] -right-[40%] md:-right-[25%] xl:-right-[10%] rotate-[75deg] z-0'
          />
          <Image src={'/images/mint.webp'} alt='product' width={400} height={400} className='w-[400px] md:w-[500px] h-max object-cover absolute bottom-0 right-0 z-0' />
        </>
      </div>
    </div>
  );
};

export default Illustration1;
