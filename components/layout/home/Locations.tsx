import { handleRequest } from '@/lib/serverActions';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Locations = async () => {
  const { data: locations, success: locatiosnSuccess } = await handleRequest({ endpoint: 'locations' });

  if (!locatiosnSuccess) return null;
  return (
    <div className='max-w-screen-2xl px-3 md:px-5 mx-auto space-y-6'>
      {/* Header */}
      <div className='w-full flex items-center justify-between'>
        <p className='text-xl font-semibold'>Shop by Locations</p>
        <Link href={'/locations'} className='text-sm text-orange-500 '>
          <p>
            View all <MoveRight className='ml-1 inline-block' />
          </p>
        </Link>
      </div>
      {/* Locations */}
      <div className='w-full py-6 flex items-center justify-start gap-4 overflow-x-auto no-scrollbar'>
        {locations.map((location: { _id: string; name: string; image: string; slug: string }) => (
          <Link
            href={`/locations/${location.slug}`}
            key={location.slug}
            className='w-full p-1.5 space-y-1.5 flex flex-col items-center justify-center shadow-md shadow-neutral-100 border border-neutral-100 rounded-lg group'>
            <div className='w-32 aspect-square overflow-hidden rounded-md'>
              <Image src={location.image} alt='product' width={400} height={400} className='size-full object-cover group-hover:scale-110 duration-300 ease-in-out' />
            </div>
            <p className='w-full text-base text-muted-foreground text-center'>{location.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Locations;
