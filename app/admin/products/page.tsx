import Link from 'next/link';

const ProductsPage = () => {
  return (
    <div className='flex flex-1 items-center justify-center flex-col gap-4'>
      <p className='text-2xl font-semibold'>All Products</p>
      <Link href='/admin/products/1'>Product 1</Link>
    </div>
  );
};

export default ProductsPage;
