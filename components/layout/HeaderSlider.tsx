'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { handleRequest } from '@/lib/serverActions';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

const HeaderSliderComp = ({ data, index }: { data: { _id: string; caption: string; mainImage: string; slug: string }; index: number }) => {
  return (
    <>
      <div className='w-full md:w-auto md:pl-8 mt-10 md:mt-0'>
        <p className='md:text-base text-orange-600 pb-1'>{index % 2 == 0 ? 'Exclusive Offer' : 'Limited Time Offer'}</p>
        <h1 className='max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold capitalize line-clamp-2'>{data.caption}</h1>
        <div className='flex items-center mt-4 md:mt-6 '>
          <button className='md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-full text-white font-medium'>
            <Link href={`/products/${data.slug}`}>Shop Now</Link>
          </button>
          <button className='group px-6 py-2.5 font-medium'>
            <Link href={`/products/${data.slug}`} className='flex items-center gap-2'>
              {index % 2 == 0 ? 'Learn More' : 'Find More'}
              <ArrowRight className='size-5 group-hover:translate-x-1 transition' />
            </Link>
          </button>
        </div>
      </div>
      <div className='w-full flex items-center flex-1 justify-center'>
        <Image className='w-[60%] aspect-square md:w-72 md:min-w-72 min-w-52' src={data?.mainImage || ''} alt={`Data ${index + 1}`} width={400} height={400} priority />
      </div>
    </>
  );
};

const HeaderSlider = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: products, success: productSuccess } = await handleRequest({ endpoint: 'products' });
      if (!productSuccess) return null;
      const indices = Array.from({ length: 4 }, () => Math.floor(Math.random() * products.length) % products.length);
      setData(products.filter((_: any, i: number) => indices.includes(i)));
      setIsLoading(false);
    })();
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  if (isLoading) {
    return <Skeleton className=' w-full h-96 flex items-center justify-center'>Loading...</Skeleton>;
  }

  return (
    <div className='overflow-hidden relative w-full'>
      <div
        className='flex transition-transform duration-700 ease-in-out'
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}>
        {data.map((data: { _id: string; caption: string; mainImage: string; slug: string }, index) => (
          <div key={data._id} className='flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 px-5 mt-6 rounded-xl min-w-full'>
            <HeaderSliderComp data={data} index={index} />
          </div>
        ))}
      </div>

      <div className='flex items-center justify-center gap-2 mt-8'>
        {data.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${currentSlide === index ? 'bg-orange-600' : 'bg-gray-500/30'}`}></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
