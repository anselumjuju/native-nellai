import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Ellipsis, Plus } from 'lucide-react';
import Link from 'next/link';
import DeleteButton from '../ui/buttons/delete-button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';
import { handleRequest } from '@/lib/serverActions';
import { format } from 'date-fns';

const ProductsPage = async () => {
  const { data, success } = await handleRequest({ endpoint: 'products' });

  if (!success) {
    return (
      <div className='w-full h-full flex items-center justify-center text-center'>
        <p>Something went wrong</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className='w-full h-full flex flex-col items-center justify-center text-center gap-4 md:gap-6'>
        <h1 className='text-3xl md:text-5xl font-bold'>There is nothing here!</h1>
        <p className='w-[50ch] text-xs md:text-sm font-normal text-muted-foreground'>Nothing to see here—yet! Start adding products to get things rolling.</p>
        <Link href='/admin/products/new'>
          <Button variant='default'>New Product</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='px-2 md:px-7 flex flex-1 flex-col items-center justify-start gap-4'>
      <div className='w-full max-w-screen-xl flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>Categories</h1>
        <Link href='/admin/products/new'>
          <Button variant={'outline'}>
            <Plus className='mr-1 h-4 w-4' />
            Add Product
          </Button>
        </Link>
      </div>
      <div className='w-full max-w-screen-xl overflow-hidden rounded-lg border border-border bg-background'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-transparent *:text-nowrap'>
              <TableHead>Product</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className='hidden lg:table-cell'>Categories</TableHead>
              <TableHead className='hidden md:table-cell'>Location</TableHead>
              <TableHead className='hidden md:table-cell'>Original Price</TableHead>
              <TableHead className='hidden lg:table-cell'>Discount Price</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((product: { _id: string; name: string; image: string; slug: string; createdAt: Date }) => (
              <TableRow key={product._id}>
                <TableCell>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={50}
                          height={50}
                          className='h-12 aspect-square rounded-sm object-cover'
                          unoptimized
                          placeholder='blur'
                          blurDataURL={product.image}
                        />
                      </TooltipTrigger>
                      <TooltipContent className='p-1 bg-secondary'>
                        <div className='w-52 aspect-square rounded-md'>
                          <Image className='w-full h-full object-cover' src={product.image} width={120} height={120} alt='Content image' unoptimized />
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className='font-medium'>{product.name}</TableCell>
                <TableCell className='hidden lg:table-cell'>{product.slug}</TableCell>
                <TableCell className='hidden md:table-cell'>{format(new Date(product.createdAt), 'PP')}</TableCell>
                <TableCell className='text-right space-x-2 flex items-center justify-end'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size='icon' variant='ghost' className='rounded-full shadow-none' aria-label='Open edit menu'>
                        <Ellipsis size={16} strokeWidth={2} aria-hidden='true' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Link href={`/admin/products/${product._id}`}>
                            <Button className='w-full text-left text-xs'>Edit</Button>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <DeleteButton id={product._id} endpoint='products' />
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsPage;
