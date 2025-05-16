import ProductCard2 from '@/components/ProductCard2';
import { handleRequest } from '@/lib/serverActions';

const TodaysBest = async () => {
  const { data: products, success: productSuccess } = await handleRequest({ endpoint: 'products' });

  if (!productSuccess) return null;

  const today = new Date().toISOString().split('T')[0];
  const hash = (str: string) => str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const todaysBest = products
    .map((product: { _id: string }) => ({
      ...product,
      sortValue: hash(product._id + today),
    }))
    .sort((a: { sortValue: number }, b: { sortValue: number }) => a.sortValue - b.sortValue)
    .slice(0, 5);

  return (
    <div className='max-w-screen-2xl px-3 md:px-5 mx-auto space-y-12'>
      {/* Header */}
      <p className='text-xl font-semibold'>Today best deals for you</p>
      {/* Products */}
      <div className='flex items-stretch justify-start lg:justify-between gap-4 overflow-x-scroll no-scrollbar'>
        {todaysBest.map(
          (product: { _id: string; name: string; caption: string; categoryId: string; mainImage: string; slug: string; originalPrice: number; discountPrice: number }) => (
            <div key={product.slug}>
              <ProductCard2 product={product} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TodaysBest;
