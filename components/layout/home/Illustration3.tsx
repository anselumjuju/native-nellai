import PrimaryButton from '@/components/PrimaryButton';
import Image from 'next/image';

const Illustration3 = () => {
  return (
    <div className='max-w-screen-2xl px-3 lg:px-5 mx-auto'>
      <div className='h-[600px] lg:h-[400px] bg-[#deeac2] rounded-lg relative overflow-hidden'>
        {/* Content */}
        <div className='pt-10 px-3 lg:px-5 lg:pt-0 h-full flex flex-col lg:flex-row items-start lg:items-center justify-end lg:justify-center gap-4 text-white relative z-10'>
          <div className='max-w-[600px] mx-auto flex flex-col items-center lg:items-start justify-center gap-1 lg:gap-3 text-center lg:text-left text-[#565656]'>
            <p className='text-3xl md:text-5xl tracking-normal font-bold'>
              Step into a Marketplace of <span className='text-orange-500'>Authenticity</span>
            </p>
            <p className='text-sm'>
              Discover native groceries, crafted with care and offered at honest <span className='text-nowrap'>prices-your</span> ultimate destination for quality.
            </p>
            <PrimaryButton text={'Explore Now'} className='w-max text-white' link='/products' />
          </div>

          <Image src={'/svg/earth.svg'} alt='product' width={400} height={400} className='w-[400px] lg:w-[500px] mx-auto object-cover self-end' />
        </div>

        {/* Clouds */}
        <div className='h-[200px] w-full absolute top-0'>
          <Image src={'/svg/clouds.svg'} alt='product' width={400} height={400} className='w-[200px] object-cover absolute top-10 -left-10 lg:left-10' />
          <Image src={'/svg/clouds.svg'} alt='product' width={400} height={400} className='w-[150px] object-cover absolute top-5 left-1/2 -translate-x-1/2 lg:left-[25%]' />
          <Image
            src={'/svg/clouds.svg'}
            alt='product'
            width={400}
            height={400}
            className='w-[280px] object-cover absolute top-8 left-1/2 -translate-x-1/2 lg:right-[25%] hidden lg:block'
          />
          <Image src={'/svg/clouds.svg'} alt='product' width={400} height={400} className='w-[240px] object-cover absolute top-2 lg:right-[30%] scale-x-[-1] hidden lg:block' />
          <Image src={'/svg/clouds.svg'} alt='product' width={400} height={400} className='w-[400px] md:w-[500px] object-cover absolute top-10 -right-[200px]' />
        </div>
      </div>
    </div>
  );
};

export default Illustration3;
