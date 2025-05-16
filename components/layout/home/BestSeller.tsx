import ProductCard1 from '@/components/ProductCard1';
import { handleRequest } from '@/lib/serverActions';

const BestSeller = async () => {
  const { data: products, success: productSuccess } = await handleRequest({ endpoint: 'products' });

  if (!productSuccess) return null;
  return (
    <div className='max-w-screen-2xl px-3 md:px-5 mx-auto space-y-12'>
      {/* Header */}
      <p className='text-xl font-semibold'>Best Seller</p>
      {/* Products */}
      <div className='flex items-stretch justify-start lg:justify-between gap-4 overflow-x-scroll no-scrollbar'>
        {products.map((product: { _id: string; name: string; caption: string; mainImage: string; slug: string; originalPrice: number; discountPrice: number }) => (
          <div key={product.slug}>
            <ProductCard1 product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
