'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { handleRequest } from '@/lib/serverActions';
import useUserStore from '@/store/userStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import toast from 'react-hot-toast';

const BuyNowModal = ({
  products,
  total: amount,
}: {
  products: { _id: string; mainImage: string; name: string; originalPrice: number; discountPrice: number }[];
  total: number;
}) => {
  const { _id, cart, clearCart, addToOrders } = useUserStore();
  const router = useRouter();

  const handleBuyNow = async () => {
    const res = await fetch('/api/createOrder', {
      method: 'POST',
      body: JSON.stringify({ amount: amount * 100 }),
    });
    const data = await res.json();
    const paymentData = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: data.id,

      handler: async function (response: any) {
        // verify payment
        const res: Response = await fetch('/api/verifyOrder', {
          method: 'POST',
          body: JSON.stringify({
            orderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            orderDetails: {
              userId: _id,
              items: cart.map((item) => ({ productId: item.productId, quantity: item.quantity })),
              totalPrice: amount,
              status: 'pending',
              paymentStatus: 'paid',
              orderId: data.id,
            },
          }),
        });
        const verifyResponse: { isOk: boolean; data: { _id: string } } = await res.json();
        if (verifyResponse.isOk) {
          addToOrders(verifyResponse.data._id);
          clearCart();
          await handleRequest({ endpoint: 'users', method: 'PATCH', id: _id, data: { cart: [], orders: useUserStore.getState().orders } });
          toast.success('Payment successful');
          router.push('/settings/orders');
        } else {
          toast.error('Payment failed, Your order has not been placed', { id: 'payment-failed', duration: 5000 });
        }
      },
    };

    const payment = new (window as any).Razorpay(paymentData);
    payment.open();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='px-4 py-2 bg-orange-500 text-white'>Checkout</button>
      </DialogTrigger>
      <DialogContent className='flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5'>
        <DialogHeader className='contents space-y-0 text-left'>
          <DialogTitle className='border-b px-6 py-4 text-base'>Checkout</DialogTitle>
          <DialogDescription asChild>
            <div className='w-full p-6 flex flex-col justify-stretch gap-4 text-neutral-600'>
              <Script type='text/javascript' src='https://checkout.razorpay.com/v1/checkout.js' />
              {cart.map((item) => {
                const currentPrdt = products.find((product: { _id: string }) => product._id === item.productId) as
                  | { _id: string; mainImage: string; name: string; originalPrice: number; discountPrice: number }
                  | undefined;
                if (currentPrdt == undefined) return null;

                return (
                  <div className='w-full flex items-center gap-4' key={item.productId}>
                    <div className='size-14 aspect-square flex items-center justify-center rounded-full bg-neutral-200'>
                      <Image src={currentPrdt.mainImage || 'https://placehold.co/400/png'} alt={'name'} width={128} height={128} className='size-[80%] object-cover' />
                    </div>
                    <p className='w-full text-base line-clamp-2 text-neutral-800'>{currentPrdt.name}</p>
                    <div className='justify-self-end'>
                      <p className='text-sm text-right'>&#8377;&nbsp;{(currentPrdt.discountPrice || currentPrdt.originalPrice) * item.quantity}</p>
                      {currentPrdt.discountPrice ? (
                        <p className='w-full text-xs text-right text-nowrap text-green-500'>
                          You save: &#8377;&nbsp;{(currentPrdt.originalPrice - currentPrdt.discountPrice) * item.quantity}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
              <div className='flex flex-row items-center justify-end gap-4'>
                <h1 className='text-base'>
                  Total: <span className='font-semibold text-neutral-800'>{amount}</span>
                </h1>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='border-t px-6 py-4 sm:items-center'>
          <DialogClose asChild>
            <Button type='button' variant='outline'>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type='button' className='px-6 rounded-none bg-orange-500 text-white' onClick={handleBuyNow}>
              Proceed to Pay
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuyNowModal;
