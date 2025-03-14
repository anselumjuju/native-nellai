'use client';

const BuyNowButton = () => {
  const handleBuyNow = () => {
    console.log('Buy now');
  };

  return (
    <button className='px-12 py-3 bg-orange-400 text-white text-sm' onClick={handleBuyNow}>
      Buy Now
    </button>
  );
};

export default BuyNowButton;
