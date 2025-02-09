interface ProductPageProps {
  id: string;
}

const ProductPage = async ({ params }: { params: ProductPageProps }) => {
  const id = (await params).id;
  return (
    <div className='flex flex-1 items-center justify-center'>
      <p className='text-base font-semibold'>Product {id}</p>
    </div>
  );
};

export default ProductPage;
