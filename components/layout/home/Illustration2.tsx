import Image from 'next/image';

const Illustration2 = () => {
  return (
    <div className='max-w-dvw w-full min-h-[350px] md:min-h-[470px] relative flex items-end justify-start 2xl:justify-center overflow-hidden'>
      <Image
        src={'/svg/abstract-curve.svg'}
        alt='abstract curve '
        width={400}
        height={400}
        className='w-full h-[450px] md:h-[300px] xl:h-[450px] object-cover object-top-right md:object-top absolute bottom-0 left-1/2 -translate-x-1/2'
      />
      <Image
        src={'/svg/pongal.svg'}
        alt='product'
        width={400}
        height={400}
        className='w-[250px] lg:w-[350px] xl:w-[400px] h-max object-cover absolute bottom-1/2 md:bottom-[20%] lg:bottom-[64] translate-y-[30%] md:translate-y-0 -right-10 xl:right-32 z-0'
      />
      <Image src={'/svg/sweets.svg'} alt='product' width={400} height={400} className='w-[250px] h-max hidden md:block object-cover absolute bottom-24 -left-10 2xl:left-48 z-0' />
      <div className='px-3 md:px-5 py-5 md:py-10 md:pl-[10%] lg:pl-0 relative z-10 space-y-2'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl tracking-normal font-normal text-black'>
          Experience the Essence of <span className='text-orange-500'>Nellai</span>
        </h2>
        <p className='max-w-[45ch] md:max-w-[50ch] text-xs'>
          We bring you groceries that reflect Nellai&apos;s native spirit-pure, unprocessed, and sourced with integrity from trusted local makers.
        </p>
      </div>
    </div>
  );
};

export default Illustration2;
