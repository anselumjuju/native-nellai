import Link from 'next/link';

const Locations = () => {
  return (
    <div className='size-full h-dvh flex flex-col items-center justify-center gap-5'>
      <h1>Locations</h1>
      <div className='w-full flex flex-col gap-3 items-center justify-start'>
        {['location1', 'location2', 'location3'].map((location) => (
          <Link href={`/locations/${location}`} key={location}>
            {location}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Locations;
