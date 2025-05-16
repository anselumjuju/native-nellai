import ProductCard from '@/components/features/ProductCard';

interface IProduct {
  _id: string;
  name: string;
  caption: string;
  categoryId: string;
  mainImage: string;
  slug: string;
  originalPrice: number;
  discountPrice: number;
}

const Products = async () => {
  const { data: products, success: productSuccess }: { data: any; success: boolean } = await (await fetch(`${process.env.BASE_URL}/api/products`, { cache: 'reload' })).json();

  if (!productSuccess) return null;

  return (
    <div className='w-full max-w-screen-xl px-3 md:px-5 py-10 mx-auto flex flex-col items-center justify-center gap-12'>
      <h1 className='text-3xl font-medium capitalize relative after:content-[""] after:h-0.5 after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-4/5 after:bg-orange-500'>
        Discover Our Exclusive Collection
      </h1>

      {products.length === 0 ? (
        <div className='w-full h-[50vh] flex items-center justify-center'>
          <p>No products found</p>
        </div>
      ) : (
        <div className='w-full h-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8'>
          {products.map((product: IProduct) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
