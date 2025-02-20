const CategoryPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <div className='size-full h-dvh flex items-center justify-center gap-5'>
      <h1>
        Category {'->'} {slug}
      </h1>
    </div>
  );
};

export default CategoryPage;
