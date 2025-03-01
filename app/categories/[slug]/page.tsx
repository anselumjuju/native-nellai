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

const CategoryPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const { data: products, success: productSuccess }: { data: any; success: boolean } = await (await fetch(`${process.env.BASE_URL}/api/products`, { cache: 'reload' })).json();
  const { data: categories, success: categorySuccess }: { data: any; success: boolean } = await (await fetch(`${process.env.BASE_URL}/api/categories`, { cache: 'reload' })).json();

  if (!productSuccess || !categorySuccess) return null;
  const category = categories.find((category: { slug: string }) => category.slug === slug);
  if (!category) return null;

  const filteredProducts = products.filter((product: IProduct) => product.categoryId === category._id);

  return (
    <div className='w-full flex flex-col items-center justify-center gap-12'>
      <h1 className='text-3xl font-medium capitalize relative after:content-[""] after:h-0.5 after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-4/5 after:bg-orange-400'>
        {slug}
      </h1>

      {filteredProducts.length === 0 ? (
        <div className='w-full h-[50vh] flex items-center justify-center'>
          <p>No products found</p>
        </div>
      ) : (
        <div className='w-full h-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8'>
          {filteredProducts.map((product: IProduct) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
