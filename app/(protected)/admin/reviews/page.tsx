import { handleRequest } from '@/lib/serverActions';
import { Star } from 'lucide-react';
import Image from 'next/image';
import DeleteButton from '../ui/buttons/delete-button';

const ReviewsPage = async () => {
  const { data: reviews, success: reviewSuccess } = await handleRequest({ endpoint: 'reviews' });
  const { data: products, success: productSuccess } = await handleRequest({ endpoint: 'products' });
  const { data: users, success: userSuccess } = await handleRequest({ endpoint: 'users' });

  if (!reviewSuccess || !productSuccess || !userSuccess) {
    return (
      <div className='w-full h-full flex items-center justify-center text-center'>
        <p>Something went wrong</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className='w-full h-full flex flex-col items-center justify-center text-center gap-6'>
        <h1 className='text-5xl font-bold'>No Reviews Yet!</h1>
        <p className='w-[50ch] text-sm font-normal text-muted-foreground'>
          Looks like there are no reviews yet. Once customers start sharing their feedback, you{`'`}ll see them here!
        </p>
      </div>
    );
  }

  return (
    <div className='py-20 px-2 md:px-7 flex flex-1 flex-col items-center justify-start gap-4'>
      <h1 className='w-full max-w-screen-xl text-lg font-semibold'>Reviews</h1>
      <div className='w-full max-w-screen-lg overflow-hidden space-y-4'>
        {reviews.map((review: { _id: string; rating: number; comment: string; productId: string; userId: string }) => (
          <div className='space-y-4' key={review._id}>
            <div className='w-full px-2 py-4 flex items-end justify-between gap-4'>
              <div className='w-full space-y-3'>
                <h2 className='text-lg font-semibold'>{products.find((product: { _id: string }) => product._id === review.productId)?.name || 'N/A'}</h2>
                <div className='w-full pt-3 flex items-end justify-start gap-3'>
                  <Image
                    src={users.find((user: { _id: string }) => user._id === review.userId)?.image || 'https://placehold.co/200/png'}
                    alt='Product Image'
                    width={200}
                    height={100}
                    className='w-12 aspect-square rounded-full'
                  />
                  <div>
                    <p className='text-lg'>{users.find((user: { _id: string }) => user._id === review.userId)?.name || 'N/A'}</p>
                    <div className='flex items-center gap-1'>
                      {new Array(5)
                        .fill(0)
                        .fill(1, 0, review.rating)
                        .map((i, index) => (
                          <Star key={index} stroke='#FFD700' strokeWidth={1} className='w-4' fill={i === 1 ? '#FFD700' : 'none'} />
                        ))}
                    </div>
                  </div>
                </div>
                <p className='text-sm max-w-[100ch]'>{review.comment}</p>
              </div>
              <Image
                src={products.find((product: { _id: string }) => product._id === review.productId)?.image || 'https://placehold.co/200/png'}
                alt='Product Image'
                width={200}
                height={100}
                className='h-full max-h-64 aspect-[9/12] rounded-sm hidden lg:block'
              />
            </div>
            <DeleteButton id={review._id} endpoint='reviews' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
