'use client';

import { usePathname } from 'next/navigation';

export default function PathDisplay() {
  const pathname = usePathname();

  return <div className="text-sm text-gray-500">Current Path: {pathname}</div>;
}
