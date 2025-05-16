import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Categories = () => {
  return (
    <div className='max-w-screen-2xl px-3 md:px-5 mx-auto space-y-12'>
      {/* Header */}
      <div className='w-full flex items-center justify-between'>
        <p className='text-xl font-semibold'>Shop by categories</p>
        <Link href={'/categories'} className='text-sm text-orange-500 '>
          <p>
            View all <MoveRight className='ml-1 inline-block' />
          </p>
        </Link>
      </div>
      {/* Categories */}
      <div className='h-[270px] flex items-stretch justify-start lg:justify-between gap-4 overflow-x-scroll no-scrollbar'>
        {[
          { name: 'Fruits', image: '/images/fruits.webp', bg: '#032b66', fg: '#163762' },
          { name: 'Lifestyle', image: '/images/lifestyle.webp', bg: '#670303', fg: '#711105' },
          { name: 'Food', image: '/images/food.webp', bg: '#04655a', fg: '#156c56' },
          { name: 'Household', image: '/images/household.webp', bg: '#660356', fg: '#721253' },
          { name: 'Herbal', image: '/images/herbal.webp', bg: '#5f6704', fg: '#6a6d06' },
          { name: 'Cloths', image: '/images/cloths.webp', bg: '#663303', fg: '#723d05' },
        ].map((item, index) => (
          <div key={index} className={`basis-[200px] flex-none rounded-xl h-full relative overflow-hidden`} style={{ backgroundColor: item.bg }}>
            <svg
              width='410'
              height='508'
              viewBox='0 0 410 508'
              fill={item.fg}
              xmlns='http://www.w3.org/2000/svg'
              className='w-[300px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
              style={{ transform: `translate(-50%, -50%) rotate(${(index / 6) * 360}deg)` }}>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M121.167 329.335C119.549 309.826 113.312 290.045 100.702 275.066C78.6973 248.926 38.3204 241.467 21.9506 211.477C3.45166 177.586 -4.83478 135.977 4.31543 98.4801C13.8963 59.2186 32.9845 -0.578526 73.3829 0.710429C129.702 2.50734 151.682 83.632 203.893 104.848C226.75 114.136 248.602 81.652 273.267 81.9324C300.55 82.2425 332.108 86.1501 350.282 106.512C368.579 127.012 357.046 160.455 366.408 186.287C376.061 212.92 423.002 237.626 406.012 260.278C382.439 291.71 309.548 249.819 292.286 285.115C271.711 327.186 349.282 377.267 328.316 419.145C313.76 448.221 263.548 390.764 233.354 402.832C185.921 421.791 162.321 530.583 119.573 502.578C70.6413 470.521 126.002 387.621 121.167 329.335Z'
              />
            </svg>
            <div className='w-full h-full pt-10 flex flex-col items-center justify-between gap-2 text-white relative z-10'>
              <p className='text-lg font-semibold'>{item.name}</p>
              <Image src={item.image} width={200} height={200} alt={item.name} className='w-full object-cover' />
            </div>
          </div>
        ))}
        <Link href={'/categories'} className='basis-[130px] flex-none flex items-center justify-center bg-neutral-400 rounded-xl group'>
          <div className='bg-[#5f6704] size-max p-2 rounded-full flex items-center justify-center group-hover:scale-110 duration-300 ease-in-out'>
            <MoveRight className='text-xl text-white' />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
