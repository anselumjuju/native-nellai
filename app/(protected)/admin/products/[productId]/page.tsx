import { handleRequest } from '@/lib/serverActions';
import ProductForm from './productForm';

const ProductPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const productId = (await params).productId;

  if (productId === 'new')
    return (
      <div className='w-full max-w-3xl pt-20 px-4 py-8 mx-auto space-y-8'>
        <h1 className='text-2xl font-semibold'>Add Product</h1>
        <ProductForm />
      </div>
    );

  const { data, success } = await handleRequest({ endpoint: 'products', id: productId });
  console.log(data);

  return (
    <div className='w-full max-w-3xl h-full pt-20 px-4 py-8 mx-auto space-y-8'>
      {success ? (
        <>
          <h1 className='text-2xl font-semibold'>Edit Product</h1>
          <ProductForm product={data} productId={productId} />
        </>
      ) : (
        <div className='w-full h-full flex flex-1 items-center justify-center'>
          <p>Error! Could not fetch product</p>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
