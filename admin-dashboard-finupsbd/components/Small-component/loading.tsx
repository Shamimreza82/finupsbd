'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import footerLogo from '@/public/footer-logo.png';
import lightLogo from '@/public/logo-lg.png';

export default function AppLoading() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const logo = theme === 'dark' ? footerLogo : lightLogo;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground transition-all">
      <Image
        src={logo}
        alt="Finups BD Logo"
        width={160}
        height={40}
        priority
        className="animate-pulse"
      />
      <p className="mt-4 text-sm opacity-70">Loading Finups BD...</p>
    </div>
  );
}
