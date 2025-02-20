import Link from 'next/link';

const Categories = () => {
  return (
    <div className='size-full h-dvh flex flex-col items-center justify-center gap-5'>
      <h1>Categories</h1>
      <div className='w-full flex flex-col gap-3 items-center justify-start'>
        {['category1', 'category2', 'category3'].map((category) => (
          <Link href={`/categories/${category}`} key={category}>
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
