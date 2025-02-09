const ProductPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const productId = (await params).productId;
  return (
    <div className='flex flex-1 items-center justify-center'>
      <p className='text-base font-semibold'>Product {productId}</p>
    </div>
  );
};

export default ProductPage;
