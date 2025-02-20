import Link from 'next/link';

const Products = () => {
  return (
    <div className='size-full h-dvh flex flex-col items-center justify-center gap-5'>
      <h1>Products</h1>
      <div className='w-full flex flex-col gap-3 items-center justify-start'>
        {['product1', 'product2', 'product3'].map((product) => (
          <Link href={`/products/${product}`} key={product}>
            {product}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
