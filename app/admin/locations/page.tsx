import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import AddLocationModal from './modals/add';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ActionsDropDown from './modals/actionsDropdown';

const LocationsPage = async () => {
  const { data: locations } = await (await fetch(`${process.env.BASE_URL}/api/locations`)).json();

  return (
    <div className='pt-10 px-2 md:px-7 flex flex-1 flex-col items-center justify-start gap-4'>
      <div className='w-full max-w-screen-xl flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>Categories</h1>
        <AddLocationModal />
      </div>
      <div className='w-full max-w-screen-xl overflow-hidden rounded-lg border border-border bg-background'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead>Location</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className='hidden lg:table-cell'>Slug</TableHead>
              <TableHead className='hidden md:table-cell'>Created At</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locations.map((location: { _id: string; name: string; image: string; slug: string; createdAt: Date }) => (
              <TableRow key={location._id}>
                <TableCell>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Image
                          src={location.image}
                          alt={location.name}
                          width={50}
                          height={50}
                          className='h-12 aspect-square rounded-sm object-cover'
                          unoptimized
                          placeholder='blur'
                          blurDataURL={location.image}
                        />
                      </TooltipTrigger>
                      <TooltipContent className='p-1 bg-secondary'>
                        <div className='w-52 aspect-square rounded-md'>
                          <Image className='w-full h-full object-cover' src={location.image} width={120} height={120} alt='Content image' unoptimized />
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className='font-medium'>{location.name}</TableCell>
                <TableCell className='hidden lg:table-cell'>{location.slug}</TableCell>
                <TableCell className='hidden md:table-cell'>{format(new Date(location.createdAt), 'PP')}</TableCell>
                <TableCell className='text-right space-x-2 flex items-center justify-end'>
                  <ActionsDropDown {...location} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LocationsPage;
