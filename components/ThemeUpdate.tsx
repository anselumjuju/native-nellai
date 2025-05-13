'use client';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const ThemeUpdate = () => {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (!pathname.includes('admin')) setTheme('light');
  }, [pathname]);

  return null;
};

export default ThemeUpdate;
