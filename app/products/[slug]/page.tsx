import ProductCard from '@/components/features/ProductCard';
import { handleRequest } from '@/lib/serverActions';
import Image from 'next/image';
import CartButton from './ui/CartButton';
import BuyNowButton from './ui/BuyNowButton';

const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const { data: products, success: productSuccess } = await handleRequest({ endpoint: 'products' });
  const { data: categories, success: categorySuccess } = await handleRequest({ endpoint: 'categories' });
  const { data: locations, success: locationSuccess } = await handleRequest({ endpoint: 'locations' });
  const product = products.find((product: { slug: string }) => product.slug === slug);
  const category = categories.find((category: { _id: string }) => category._id === product?.categoryId);
  const location = locations.find((location: { _id: string }) => location._id === product?.locationId);

  if (!productSuccess || !product) {
    return (
      <div className='w-full px-3 h-dvh flex flex-col items-center justify-center gap-2 lg:gap-4 text-center'>
        <h1 className='text-3xl lg:text-5xl font-bold'>Error Fetching Product</h1>
        <p className='max-w-[40ch] text-sm text-muted-foreground'>Something went wrong while fetching the product. Try again later.</p>
      </div>
    );
  }

  return (
    <div className='w-full max-w-screen-xl px-3 md:px-5 py-10 mx-auto space-y-8'>
      <div className='flex flex-col md:flex-row items-start justify-center gap-5 gap-x-16'>
        <div className='w-full md:w-[90%] lg:w-[70%] bg-neutral-200 rounded-xl'>
          <Image src={product.mainImage} alt={product.name} width={100} height={100} className='size-full' priority unoptimized />
        </div>
        <div className='w-full space-y-6'>
          <h2 className='text-4xl font-medium text-primary'>{product.name}</h2>
          <div className='w-full flex items-center justify-start gap-2'>
            {categorySuccess && <div className='w-max px-2 py-0.5 bg-[#E6E9F2] rounded-sm text-xs cursor-pointer'>{category?.name}</div>}
            {locationSuccess && <div className='w-max px-2 py-0.5 bg-[#E6E9F2] rounded-sm text-xs cursor-pointer'>{location?.name}</div>}
          </div>
          <p className='text-base text-muted-foreground line-clamp-5 md:line-clamp-none'>{product.about}</p>
          <div className='max-w-64 grid grid-cols-2 gap-4'>
            <p>Quantity</p>
            <p className='text-sm text-muted-foreground capitalize'>{product.quantity}</p>
            <p>Stock</p>
            <p className='text-sm text-muted-foreground capitalize'>{product.stock}</p>
          </div>
          <p className='text-2xl'>
            <span className={`text-2xl ${product.discountPrice > 0 ? 'line-through text-neutral-500 italic text-xl' : ''}`}>&#8377; {product.originalPrice}</span>
            {product.discountPrice > 0 && <span className='text-2xl ml-2'>(&#8377; {product.discountPrice})</span>}
          </p>
          <div className='w-full flex items-center justify-start gap-4'>
            <CartButton productId={product._id} />
            <BuyNowButton productId={product._id} />
          </div>
        </div>
      </div>
      <div className='space-y-12'>
        {/* Similar products */}
        <div className='w-full flex flex-col items-start justify-center gap-12'>
          <h1 className='text-3xl font-medium  relative after:content-[""] after:h-0.5 after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-4/5 after:bg-orange-500'>
            Similar Products
          </h1>
          <div className='w-full h-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8'>
            {products
              .filter((prdt: { categoryId: string }) => prdt.categoryId === product.categoryId)
              .slice(0, 8)
              .map((product: { _id: string; name: string; caption: string; mainImage: string; slug: string; originalPrice: number; discountPrice: number }) => (
                <div key={product.slug}>
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
        </div>
        {/* More from this location */}
        <div className='w-full flex flex-col items-start justify-center gap-12'>
          <h1 className='text-3xl font-medium  relative after:content-[""] after:h-0.5 after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-4/5 after:bg-orange-500'>
            Local Product Picks
          </h1>
          <div className='w-full h-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8'>
            {products
              .filter((prdt: { locationId: string }) => prdt.locationId === product.locationId)
              .map((product: { _id: string; name: string; caption: string; mainImage: string; slug: string; originalPrice: number; discountPrice: number }) => (
                <div key={product.slug}>
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
