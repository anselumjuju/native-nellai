import { cn } from '@/lib/utils';
import { MoveRight } from 'lucide-react';

const PrimaryButton = ({ text, isLogo = true, className }: { text: string; isLogo?: boolean; className: string }) => {
  return (
    <button className={cn('px-6 py-2 flex items-center gap-2 bg-orange-500', className)}>
      <p>{text}</p>
      <MoveRight className={` ${!isLogo && 'hidden'}`} />
    </button>
  );
};

export default PrimaryButton;
