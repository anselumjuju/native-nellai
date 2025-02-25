import { handleRequest } from '@/lib/serverActions';
import Image from 'next/image';
import Link from 'next/link';

const Locations = async () => {
  const { data: locations, success: locatiosnSuccess } = await handleRequest({ endpoint: 'locations' });

  if (!locatiosnSuccess) return null;

  return (
    <div className='w-full flex flex-col items-start justify-center gap-12'>
      <h1 className='text-3xl font-medium'>View Our Locations</h1>
      <div className='w-full flex items-center justify-start gap-12 overflow-x-auto no-scrollbar'>
        {locations.map((location: { _id: string; name: string; image: string; slug: string }) => (
          <Link href={`/locations/${location.slug}`} key={location.slug} className='min-w-20'>
            <div className='space-y-2'>
              <Image src={location.image} alt='product' width={400} height={400} className='size-full h-20 object-cover rounded-full' />
              <p className='text-base text-muted-foreground text-center'>{location.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Locations;
