'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const ThemeToggle = ({ className }: { className?: string }) => {
  const { setTheme, resolvedTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };
  return (
    <Button variant='outline' size='icon' onClick={toggleTheme} className={cn('size-8', className)}>
      {resolvedTheme === 'dark' ? <Sun className='size-5 text-muted-foreground' /> : <Moon className='size-5 text-muted-foreground' />}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
