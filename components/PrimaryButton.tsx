'use client';

import { cn } from '@/lib/utils';
import { MoveRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PrimaryButton = ({ text, isLogo = true, className, link }: { text: string; isLogo?: boolean; className: string; link?: string }) => {
  const router = useRouter();

  const onClick = () => {
    if (!link) {
      return;
    } else {
      router.push(link);
    }
  };

  return (
    <button className={cn('px-6 py-2 flex items-center gap-2 bg-orange-500', className)} onClick={onClick}>
      <p>{text}</p>
      <MoveRight className={` ${!isLogo && 'hidden'}`} />
    </button>
  );
};

export default PrimaryButton;
